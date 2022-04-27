import React from "react";

const Header = ({ userData }) => {
  if (!userData) return;
  const { data } = userData;
  return (
    <div className="flex justify-between items-center bg-black text-white py-4 px-14">
      <span className="text-4xl font-bold cursor-pointer">Edvora</span>
      <div className="flex items-center ">
        <span className="text-xl font-medium  cursor-pointer">{data.name}</span>
        <img
          className="rounded-full w-[60px] ml-8  cursor-pointer"
          src={data.url}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
