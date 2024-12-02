import React from "react";
import SpatialAudioIcon from "@mui/icons-material/SpatialAudio";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
// Uses the Material UI icon library, installed in project.
// https://mui.com/material-ui/material-icons/?query=music&selected=MusicNote

function SongInfoComponent({ firstName, lastName, gender }) {
  return (
    <li className="mt-3 flex flex-row items-center bg-slate-300 px-5 py-3">
      <div>
        <h3 className="mb-3 text-xl">{firstName}</h3>
        <div className="flex flex-row items-center">
          <span className="mr-1 text-sm text-gray-600">
            <SpatialAudioIcon fontSize="small" />
          </span>
          <h4 className="mr-2 text-gray-600">{lastName}</h4>
          <span className="mr-1 text-gray-600">
            <LibraryMusicIcon fontSize="small" />
          </span>
          <h4 className="text-gray-600">{gender}</h4>
        </div>
      </div>
      <button className="ml-auto">
        <AddIcon />
      </button>
    </li>
  );
}

export default SongInfoComponent;

// songname, API placeholder: firstName
//artist API placeholder: lastName
//alsum API placeholder: maidenName
