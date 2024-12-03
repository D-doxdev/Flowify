import React from "react";
import SpatialAudioIcon from "@mui/icons-material/SpatialAudio";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
// Uses the Material UI icon library, installed in project.
// https://mui.com/material-ui/material-icons/?query=music&selected=MusicNote

function SongInfoComponent({
  songId,
  firstName,
  lastName,
  gender,
  handleAddSong,
}) {
  function handleGatherSongData() {
    const songData = { songId, firstName, lastName, gender };
    handleAddSong(songData);
  }
  return (
    <li className="mb-3 flex flex-row items-center rounded-md border border-gray-100 border-opacity-5 bg-slate-300 bg-opacity-0 bg-clip-padding px-5 py-3 backdrop-blur-lg backdrop-filter">
      <div>
        <h3 className="mb-3 text-xl text-slate-100">{firstName}</h3>
        <div className="flex flex-row items-center">
          <span className="mr-1 text-sm text-slate-300">
            <SpatialAudioIcon fontSize="small" />
          </span>
          <h4 className="mr-2 text-slate-300">{lastName}</h4>
          <span className="mr-1 text-slate-300">
            <LibraryMusicIcon fontSize="small" />
          </span>
          <h4 className="text-slate-300">{gender}</h4>
        </div>
      </div>
      <button className="ml-auto text-slate-300" onClick={handleGatherSongData}>
        <AddIcon />
      </button>
    </li>
  );
}

export default SongInfoComponent;

// songname, API placeholder: firstName
//artist API placeholder: lastName
//alsum API placeholder: maidenName
