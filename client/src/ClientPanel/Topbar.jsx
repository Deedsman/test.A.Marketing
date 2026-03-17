import React, { useEffect, useMemo, useState } from "react";
import { FormControl, Input, InputAdornment, Tooltip } from "@mui/material";
import { PiMagnifyingGlass } from "react-icons/pi";

const Topbar = () => {
  ////////////////////////////////////////// VARIABLES //////////////////////////////////////
  const timeZone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    [],
  );

  ////////////////////////////////////////// STATES //////////////////////////////////////
  const [localTime, setLocalTime] = useState(() => new Date());

  ////////////////////////////////////////// USE EFFECTS //////////////////////////////////
  useEffect(() => {
    const timer = setInterval(() => {
      setLocalTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  ////////////////////////////////////////// FUNCTIONS //////////////////////////////////////
  const formattedTime = useMemo(() => {
    return localTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }, [localTime]);

  return (
    <div className="flex flex-col tracking-wide pb-8 font-primary">
      <div className="flex items-center justify-between gap-2 md:mt-0 mt-4 w-full ">
        <div className="flex flex-col">
          <h1 className="text-3xl text-primary-blue font-semibold">My Leads</h1>
          <div className="text-xs text-gray-500">
            <span className="font-medium">Time zone:</span> {timeZone} •{" "}
            {formattedTime}
          </div>
        </div>

        <div className="bg-[#ebf2f5] hover:bg-[#dfe6e8] p-1 pl-2 pr-2 rounded-md w-48">
          <FormControl>
            <Input
              name="search"
              placeholder="Search Leads"
              startAdornment={
                <InputAdornment position="start">
                  <PiMagnifyingGlass className="text-[25px]" />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
