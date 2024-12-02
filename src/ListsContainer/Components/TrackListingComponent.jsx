import React from "react";
import SongInfoComponent from "../../SongInfoComponent";

function TrackListingComponent({ dummyData }) {
  // Stores the rendered li items from SongInfoComponent in songList
  const songList = dummyData.map((song) => (
    // Passes the relevant data to SongInfoComponent from the Array of objects.
    <SongInfoComponent
      key={song.id}
      firstName={song.firstName}
      lastName={song.lastName}
      gender={song.gender}
    />
  ));
  return <ul className="flex-grow px-5">{songList}</ul>;
}

export default TrackListingComponent;
