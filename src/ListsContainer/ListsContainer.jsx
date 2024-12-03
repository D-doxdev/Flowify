import React, { useEffect, useState } from "react";
import TrackListingComponent from "./Components/TrackListingComponent";
import CustomPlaylistComponent from "./Components/CustomPlaylistComponent";
import axios from "axios";

function ListsContainer() {
  // Dummy data stored, is passed as prop to TrackListingComponent which passes to SongInfoComponent.
  const [dummyData, setDummyData] = useState([]);
  // Selected song state, passed to CustomPlaylistComponent when a li item is clicked.
  const [selectedSong, setSelectedSong] = useState([]);
  // input state for customPlaylist
  const [playlistInput, setPlaylistInput] = useState("");
  // updates the selectedSong when the add song button is pressed in li items, also checks for doubles.
  function handleAddSong(gatheredSongData) {
    // takes the previous object with some, returns true if it contains the ID of the gatheredSongData object
    setSelectedSong((prev) => {
      const isDuplicate = prev.some(
        (song) => song.songId === gatheredSongData.songId,
      );
      // if true, only return the previous object, if false, return the updated array.
      return isDuplicate ? prev : [...prev, gatheredSongData];
    });
  }
  // Checks for changes to selectedSong first, then logs.
  useEffect(() => {
    console.log(selectedSong);
  }, [selectedSong]);

  function fetchDummyData() {
    axios
      .get("https://dummyjson.com/users") // uses a dummy data API until the Spotify data is set up. https://dummyjson.com/docs/users
      .then((response) => {
        setDummyData(response.data.users);
        console.log(response.data.users); // See so that the data is detched in the concole.
      });
  }
  // Calls when component is rendered, Change the dependency array later to update via Search etc.
  useEffect(() => {
    fetchDummyData();
  }, []);
  // This is a container component, only call instances and pass props, doesn't render own JSX.
  return (
    <div className="flex h-3/4 w-full flex-nowrap gap-5">
      {/* Passes dummyData to component */}
      <TrackListingComponent
        dummyData={dummyData}
        handleAddSong={handleAddSong}
      />
      {/* Passes the selected song to component */}
      <CustomPlaylistComponent
        selectedSong={selectedSong}
        playlistInput={playlistInput}
        setPlaylistInput={setPlaylistInput}
      />
    </div>
  );
}

export default ListsContainer;

// songname, API placeholder: firstName
//artist API placeholder: lastName
//alsum API placeholder: maidenName
