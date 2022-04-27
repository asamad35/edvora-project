import React from "react";

const Ride = ({ rideData }) => {
  const {
    city,
    date,
    id,
    map_url,
    origin_status_code,
    station_path,
    state,
    distance,
  } = rideData;
  console.log(rideData);
  return (
    <div className="bg-[#171717] mx-14 flex items-center rounded-xl m-auto p-6 py-10 mb-4">
      <img
        className="rounded-xl w-[400px] h-[200px] object-cover "
        srcSet={map_url}
        alt="mapPhoto"
      />

      <div className="pl-16">
        <p className="text-[#cfcfcf] text-lg pb-3">
          Ride Id : <span className="text-white">{id}</span>
        </p>
        <p className="text-[#cfcfcf] text-lg pb-3">
          Origin Station :{" "}
          <span className="text-white">{origin_status_code}</span>
        </p>
        <p className="text-[#cfcfcf] text-lg pb-3">
          station_path :{" "}
          <span className="text-white">{JSON.stringify(station_path)}</span>
        </p>
        <p className="text-[#cfcfcf] text-lg pb-3">
          Date : <span className="text-white">{date}</span>
        </p>
        <p className="text-[#cfcfcf] text-lg pb-3">
          Distance : <span className="text-white">{distance}</span>
        </p>
      </div>

      <div className="flex ml-auto mb-auto">
        <p className="text-white cursor-pointer mr-6 bg-black px-4 py-2 rounded-full ">
          {city}
        </p>
        <p className="text-white cursor-pointer bg-black px-4 py-2 rounded-full ">
          {state}
        </p>
      </div>
    </div>
  );
};

export default Ride;
