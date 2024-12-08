import React, { useEffect, useState } from "react";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";

function SearchBarComponent({
  searchData,
  setSearchData,
  search,
  handleSearchInputFromUser,
}) {
  // Passes the target.value on to parent and calls search after a delay to make the application feel less jittery
  function handleSearchInputFromUser(eventInputFieldData) {
    setSearchData(eventInputFieldData);
    if (searchData !== "") {
      search();
    }
  }

  return (
    <div className="mb-32 mt-10 flex w-full items-center align-middle md:mb-36 md:mt-32">
      <div className="m-auto flex flex-nowrap space-x-5 rounded-md border border-gray-100 border-opacity-5 bg-slate-300 bg-opacity-0 bg-clip-padding px-5 py-3 backdrop-blur-lg backdrop-filter">
        <input
          className="bg-transparent px-2 py-2 text-slate-300 outline-none focus:border-none focus:bg-transparent focus:outline-none focus:ring-0"
          name="searchbar"
          type="text"
          placeholder="Search artist here..."
          value={searchData}
          onChange={({ target }) => handleSearchInputFromUser(target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter" && e.target.value !== "") {
              search();
            }
          }}
        />
        {!searchData.length > 0 ? (
          <button className="mx-auto px-2 py-2 text-slate-100 text-opacity-50 transition hover:cursor-default">
            <TroubleshootIcon />
          </button>
        ) : (
          <button
            className="mx-auto px-2 py-2 text-slate-100 transition duration-300 ease-in-out hover:text-opacity-50"
            onClick={search}
          >
            <TroubleshootIcon />
          </button>
        )}
      </div>
    </div>
  );
}
export default SearchBarComponent;
