import React, { useEffect, useState } from "react";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";

function SearchBarComponent({ searchData, setSearchData, search }) {
  return (
    <div className="mb-36 mt-32 flex w-full items-center align-middle">
      <div className="m-auto flex flex-nowrap space-x-5 rounded-md border border-gray-100 border-opacity-5 bg-slate-300 bg-opacity-0 bg-clip-padding px-5 py-3 backdrop-blur-lg backdrop-filter">
        <input
          onChange={({ target }) => setSearchData(target.value)}
          className="bg-transparent px-2 py-2 text-slate-300 focus:border-none focus:bg-transparent"
          name="searchbar"
          type="text"
          placeholder="Type your genre here"
          value={searchData}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              search();
            }
          }}
        />
        <button className="mx-auto text-slate-300" onClick={search}>
          <TroubleshootIcon />
        </button>
      </div>
    </div>
  );
}
export default SearchBarComponent;
