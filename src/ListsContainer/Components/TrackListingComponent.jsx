import React from "react";
import SongInfoComponent from "../../SongInfoComponent";

function TrackListingComponent({ dummyData, handleAddSong, selectedSong }) {
  // Stores the rendered li items from SongInfoComponent in songList
  const songList = dummyData.map((song) => (
    // Passes the relevant data to SongInfoComponent from the Array of objects.
    <SongInfoComponent
      key={crypto.randomUUID()} // Unique ID generation, built in JS method.
      songId={song.id}
      firstName={song.firstName}
      lastName={song.lastName}
      gender={song.gender}
      handleAddSong={handleAddSong}
      selectedSong={selectedSong}
    />
  ));
  return (
    <div className="relative flex h-auto grow">
      <h1 className="absolute -top-16 mb-3 text-4xl text-slate-100 md:-top-20 md:text-6xl">
        Songs
      </h1>
      <div className="h-4/5 flex-grow overflow-y-scroll scrollbar-hide">
        <ul className="">
          {/* uses a plugin https://www.npmjs.com/package/tailwind-scrollbar-hide */}
          {songList}
        </ul>
      </div>
    </div>
  );
}

export default TrackListingComponent;
