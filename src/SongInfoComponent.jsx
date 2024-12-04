import React, { useEffect, useState } from "react";
import SpatialAudioIcon from "@mui/icons-material/SpatialAudio";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
// Uses the Material UI icon library, installed in project. https://mui.com/material-ui/material-icons/?query=music&selected=MusicNote

function SongInfoComponent({
  songId,
  firstName,
  lastName,
  gender,
  handleAddSong,
  isCurrentlySelected,
  selectedSong, // passed in order to track which list the song is in.
  isInCustomPlaylist,
  handleRemoveSong,
}) {
  /*
  useEffect(() => {
    const checkedSongId = selectedSong.some((song) => song.songId === songId);
    console.log("Passing selectedSong to SongInfoComponent:", checkedSongId);
  }, []);
  */
  const [isAddedToList, setIsAddedToList] = useState(false);

  function checkIfAddedToList() {
    const checkedSongId = selectedSong.some((song) => song.songId === songId);
    if (checkedSongId) {
      setIsAddedToList(checkedSongId);
    } else {
      return;
    }
  }

  useEffect(() => {
    checkIfAddedToList();
  }, [songId, selectedSong]);

  function handleGatherSongData() {
    const songData = { songId, firstName, lastName, gender };
    handleAddSong(songData);
  }

  function handleClickToRemoveSong(songId) {
    handleRemoveSong(songId);
  }

  const isSelectedButton = (
    <button className="ml-auto text-slate-300 hover:cursor-default">
      <CheckIcon />
    </button>
  );

  const addToListButton = (
    <button className="ml-auto text-slate-300" onClick={handleGatherSongData}>
      <AddIcon />
    </button>
  );

  const removeFromListButton = (
    <button
      className="ml-auto text-slate-300"
      onClick={() => handleClickToRemoveSong(songId)}
    >
      <RemoveCircleOutlineIcon />
    </button>
  );

  if (isInCustomPlaylist) {
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
        {removeFromListButton}
      </li>
    );
  } else {
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
        {isAddedToList ? isSelectedButton : addToListButton}
      </li>
    );
  }
}

export default SongInfoComponent;

// songname, API placeholder: firstName
//artist API placeholder: lastName
//alsum API placeholder: maidenName
