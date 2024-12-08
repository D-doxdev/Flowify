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
  uri,
}) {
  /* State with a callback function that returns true if the songId is equal to song.songId in
 the selectedSong state, it's used since it doesn't re-run each time on component re-render the
 way that useEffect is. */
  const [isAddedToList, setIsAddedToList] = useState(() =>
    selectedSong.some((song) => song.songId == songId),
  );

  // Desired length of the artist and album text
  const [maxLengthOfChars] = useState(70);

  // helperfunc for truncating a string to a specific length and adding "..." after!

  function gfgFun(str, maxLengthOfChars) {
    if (str.length > maxLengthOfChars) {
      return `${str.substring(0, maxLengthOfChars)}...`;
    } else {
      return str;
    }
  }

  // Desired length of a string
  const maxLength = 5;
  // END

  function handleGatherSongData() {
    const songData = { songId, trackName, artistName, albumName, uri };
    handleAddSong(songData);
  }

  function handleClickToRemoveSong(songId) {
    handleRemoveSong(songId);
  }

  const isSelectedButton = (
    <button className="ml-auto px-2 py-2 text-slate-100 hover:cursor-default">
      <CheckIcon />
    </button>
  );

  const addToListButton = (
    <button
      className="ml-auto px-2 py-2 text-slate-100 transition duration-300 ease-in-out hover:text-opacity-50"
      onClick={handleGatherSongData}
    >
      <AddIcon />
    </button>
  );

  const removeFromListButton = (
    <button
      className="ml-auto px-2 py-2 text-slate-100 transition duration-300 ease-in-out hover:text-opacity-50"
      onClick={() => handleClickToRemoveSong(songId)}
    >
      <RemoveCircleOutlineIcon />
    </button>
  );

  if (isInCustomPlaylist) {
    return (
      <li className="mb-3 flex flex-row items-center rounded-md border border-gray-100 border-opacity-5 bg-slate-300 bg-opacity-0 bg-clip-padding px-5 py-3 backdrop-blur-lg backdrop-filter">
        <div>
          <h3 className="mb-3 text-xl text-slate-100">
            {gfgFun(trackName, maxLengthOfChars)}
          </h3>
          <div className="">
            <div className="mb-2 flex flex-row items-center">
              <span className="mr-2 text-sm text-slate-300">
                <SpatialAudioIcon fontSize="small" />
              </span>
              <h4 className="mr-2 text-slate-300">
                {gfgFun(artistName, maxLengthOfChars)}
              </h4>
            </div>
            <div className="flex flex-row items-center">
              <span className="mr-2 text-slate-300">
                <LibraryMusicIcon fontSize="small" />
              </span>
              <h4 className="text-slate-300">
                {gfgFun(albumName, maxLengthOfChars)}
              </h4>
            </div>
          </div>
        </div>
        {removeFromListButton}
      </li>
    );
  } else {
    return (
      <li className="mb-3 flex flex-row items-center rounded-md border border-gray-100 border-opacity-5 bg-slate-300 bg-opacity-0 bg-clip-padding px-5 py-3 backdrop-blur-lg backdrop-filter">
        <div>
          <h3 className="mb-3 text-xl text-slate-100">
            {gfgFun(trackName, maxLengthOfChars)}
          </h3>
          <div className="">
            <div className="mb-2 flex flex-row items-center">
              <span className="mr-2 text-sm text-slate-300">
                <SpatialAudioIcon fontSize="small" />
              </span>
              <h4 className="mr-2 text-slate-300">
                {gfgFun(artistName, maxLengthOfChars)}
              </h4>
            </div>
            <div className="flex flex-row items-center">
              <span className="mr-2 text-slate-300">
                <LibraryMusicIcon fontSize="small" />
              </span>
              <h4 className="text-slate-300">
                {gfgFun(albumName, maxLengthOfChars)}
              </h4>
            </div>
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
