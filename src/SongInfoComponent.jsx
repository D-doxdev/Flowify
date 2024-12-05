import React, { useEffect, useState } from "react";
import SpatialAudioIcon from "@mui/icons-material/SpatialAudio";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
// Uses the Material UI icon library, installed in project. https://mui.com/material-ui/material-icons/?query=music&selected=MusicNote

function SongInfoComponent({
  songId,
  trackName,
  artistName,
  albumName,
  handleAddSong,
  selectedSong, // passed in order to track which list the song is in.
  isInCustomPlaylist,
  handleRemoveSong,
}) {
  /* State with a callback function that returns true if the songId is equal to song.songId in
 the selectedSong state, it's used since it doesn't re-run each time on component re-render the
 way that useEffect is. */
  const [isAddedToList, setIsAddedToList] = useState(() =>
    selectedSong.some((song) => song.songId == songId),
  );

  // used to determine if the li is added to the list or not, the buttons are dependent, was buggy and replaced with the state and callback function above
  /*
  useEffect(() => {
    console.log("the component " + songId + " is re-rendered!");
    if (!isInCustomPlaylist) {
      function checkIfAddedToList() {
        const checkedSongId = selectedSong.some(
          (song) => song.songId === songId,
        );
        if (checkedSongId) {
          setIsAddedToList(checkedSongId);
        } else {
          return;
        }
      }
      checkIfAddedToList();
    }
  }, []);
  */

  function handleGatherSongData() {
    const songData = { songId, trackName, artistName, albumName };
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
          <h3 className="mb-3 text-xl text-slate-100">{trackName}</h3>
          <div className="flex flex-row items-center">
            <span className="mr-1 text-sm text-slate-300">
              <SpatialAudioIcon fontSize="small" />
            </span>
            <h4 className="mr-2 text-slate-300">{artistName}</h4>
            <span className="mr-1 text-slate-300">
              <LibraryMusicIcon fontSize="small" />
            </span>
            <h4 className="text-slate-300">{albumName}</h4>
          </div>
        </div>
        {removeFromListButton}
      </li>
    );
  } else {
    return (
      <li className="mb-3 flex flex-row items-center rounded-md border border-gray-100 border-opacity-5 bg-slate-300 bg-opacity-0 bg-clip-padding px-5 py-3 backdrop-blur-lg backdrop-filter">
        <div>
          <h3 className="mb-3 text-xl text-slate-100">{trackName}</h3>
          <div className="flex flex-row items-center">
            <span className="mr-1 text-sm text-slate-300">
              <SpatialAudioIcon fontSize="small" />
            </span>
            <h4 className="mr-2 text-slate-300">{artistName}</h4>
            <span className="mr-1 text-slate-300">
              <LibraryMusicIcon fontSize="small" />
            </span>
            <h4 className="text-slate-300">{albumName}</h4>
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
