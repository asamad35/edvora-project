import React, { useState } from "react";
import Ride from "./Ride";

const Body = ({
  rideData,
  userData,
  allRideData,
  futureRidesNum,
  pastRidesNum,
  changeRideData,
  filterCity,
  filterState,
  citiesData,
}) => {
  const [tabNum, setTabNum] = useState("0");
  const [filter, setFilter] = useState(false);
  const [modal, setModel] = useState(false);
  if (!rideData || !userData || !citiesData) return;
  console.log(citiesData);
  return (
    <div className="relative">
      <div className="bg-[#292929] pb-10 ">
        {/* navbar */}
        <div className="flex justify-between text-white p-8 px-14 ">
          <div>
            <span
              onClick={() => {
                changeRideData("nearest");
                setTabNum("0");
              }}
              className={`text-xl cursor-pointer  ${
                tabNum === "0" ? "text-white border-b-[3px]" : "text-[#878484]"
              }`}
            >
              Nearest rides
            </span>
            <span
              onClick={() => {
                changeRideData("future");
                setTabNum("1");
              }}
              className={`text-xl cursor-pointer mx-12  ${
                tabNum === "1" ? "text-white border-b-[3px]" : "text-[#878484]"
              }`}
            >
              Upcoming rides ({futureRidesNum})
            </span>
            <span
              onClick={() => {
                changeRideData("past");
                setTabNum("2");
              }}
              className={`text-xl cursor-pointer  ${
                tabNum === "2" ? "text-white border-b-[3px]" : "text-[#878484]"
              }`}
            >
              Past rides ({pastRidesNum})
            </span>
          </div>
          <div
            onClick={() => {
              setFilter(!filter);
              setModel(true);
            }}
            className="text-xl cursor-pointer relative"
          >
            <i className="fa-solid fa-bars-filter pr-4 "></i>
            Filters
          </div>
        </div>
        {/* rides card */}
        {rideData?.map((ride, idx) => {
          return <Ride key={idx} rideData={ride} />;
        })}
      </div>
      <div
        onClick={() => {
          setModel(!modal);
          setFilter(false);
        }}
        className={`w-full h-full bg-transparent ${
          modal ? "block" : "hidden"
        } absolute top-0 left-0  `}
      ></div>
      <div
        className={`flex-col ${
          filter ? "block" : "hidden"
        } absolute right-[2rem] top-20 bg-black p-8 rounded-xl w-[300px]`}
      >
        <span className="border-b-2 text-2xl mb-4 pb-2 w-full block text-[#a5a5a5]">
          Filters
        </span>
        {/* state */}
        <select
          onChange={(e) => {
            filterState(e.target.value, tabNum);
          }}
          className={"w-full text-white p-2 rounded-xl bg-[#171717] mb-4"}
          name="state"
          id="state"
        >
          {allRideData.map((ride, idx) => (
            <option key={idx} value={ride.state}>
              {ride.state}
            </option>
          ))}
        </select>

        {/* City */}
        <select
          onChange={(e) => {
            filterCity(e.target.value, tabNum);
          }}
          className="w-full text-white p-2 rounded-xl bg-[#171717]"
          name="state"
          id="state"
        >
          {citiesData.map((ride, idx) => (
            <option key={idx} value={ride.city}>
              {ride.city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Body;
