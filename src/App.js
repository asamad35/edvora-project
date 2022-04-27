import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import Body from "./components/Body";

function App() {
  const [userData, setUserData] = useState(null);
  const [rideData, setRideData] = useState(null);
  const [allRideData, setAllRideData] = useState(null);
  const [futureRideData, setFutureRideData] = useState(null);
  const [pastRideData, setPastRideData] = useState(null);
  const [futureRidesNum, setfutureRidesNum] = useState(0);
  const [pastRidesNum, setPastRidesNum] = useState(0);
  const [citiesData, setCitiesData] = useState([]);

  useEffect(() => {
    getDataFromAPI();
    document.body.style.zoom = "80%";
  }, []);

  useEffect(() => {
    if (rideData && userData) {
      futureRides();
      pastRides();
    }
  }, [rideData, userData]);

  const getDataFromAPI = async () => {
    try {
      //  getting userData
      const apiUserData = await await axios.get(
        "https://assessment.api.vweb.app/user"
      );
      setUserData(apiUserData);

      // getting rides data
      const apiRideData = await axios.get(
        "https://assessment.api.vweb.app/rides"
      );
      calcMinimumDistance(apiUserData, apiRideData);
    } catch (e) {
      console.log(e);
    }
  };

  //   calc minimum distance and sort and initialise ride states
  function calcMinimumDistance(apiUserData, apiRideData) {
    const sortedData = apiRideData.data
      .map((ride) => {
        const userStation = apiUserData.data.station_code;
        const rideStations = ride.station_path;
        let min = Infinity;
        rideStations.forEach(
          (station) => (min = Math.min(min, Math.abs(userStation - station)))
        );
        return { ...ride, distance: min };
      })
      .sort((a, b) => a.distance - b.distance);

    // adding future date as api is'nt providing
    sortedData.push({
      city: "Nahan",
      date: "08/10/2022 07:11 PM",
      destination_station_code: 95,
      distance: 3,
      id: 354,
      map_url: "https://picsum.photos/200",
      origin_status_code: "6",
      state: "Himachal Pradesh",
      station_path: [20, 33, 47, 51, 61, 75, 89],
    });
    setRideData(sortedData);
    setAllRideData(sortedData);
    setCitiesData(sortedData);
  }

  //   calc ride date to milliseconds date
  function calculateDateToMilliseconds(date) {
    const myDate = date.split(" ");
    const convertTime12to24 = (time12h) => {
      const [time, modifier] = time12h.slice(1);

      let [hours, minutes] = time.split(":");

      if (hours === "12") {
        hours = "00";
      }

      if (modifier === "PM") {
        hours = parseInt(hours, 10) + 12;
      }

      return `${hours}:${minutes}`;
    };
    const finalDate = myDate[0] + " " + convertTime12to24(myDate);
    const milliSeconds = new Date(finalDate).getTime();
    return milliSeconds;
  }

  //    futureRides
  function futureRides() {
    const currentDateInMillisecond = new Date().getTime();
    const futureRides = allRideData.filter((ride, idx) => {
      const rideDateInMilliseconds = calculateDateToMilliseconds(ride.date);
      return rideDateInMilliseconds - currentDateInMillisecond >= 0
        ? ride
        : null;
    });
    setFutureRideData(futureRides);
    setfutureRidesNum(futureRides.length);
  }

  //  pastRides
  const pastRides = () => {
    const currentDateInMillisecond = new Date().getTime();
    const pastRides = allRideData.filter((ride, idx) => {
      const rideDateInMilliseconds = calculateDateToMilliseconds(ride.date);
      return rideDateInMilliseconds - currentDateInMillisecond < 0
        ? ride
        : null;
    });

    setPastRideData(pastRides);
    setPastRidesNum(pastRides.length);
  };

  // change rides data
  function changeRideData(type) {
    if (type === "nearest") setRideData(allRideData);
    else if (type === "past") setRideData(pastRideData);
    else if (type === "future") setRideData(futureRideData);
  }

  function filterState(state) {
    const filteredData = allRideData.filter((ride) => ride.state === state);
    setRideData(filteredData);
    setCitiesData(filteredData);
  }
  function filterCity(city) {
    const filteredData = allRideData.filter((ride) => ride.city === city);
    setRideData(filteredData);
  }

  return (
    <div>
      <Header userData={userData} />
      <Body
        allRideData={allRideData}
        rideData={rideData}
        userData={userData}
        changeRideData={changeRideData}
        futureRidesNum={futureRidesNum}
        pastRidesNum={pastRidesNum}
        filterState={filterState}
        filterCity={filterCity}
        citiesData={citiesData}
      />
    </div>
  );
}
export default App;
