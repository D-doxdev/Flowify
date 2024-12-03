import React from "react";
import SongInfoComponent from "../../SongInfoComponent";

function CustomPlaylistComponent({
  selectedSong,
  playlistInput,
  setPlaylistInput,
}) {
  // Stores the rendered li items from SongInfoComponent in songList
  const songList = selectedSong.map((song) => (
    // Passes the relevant data to SongInfoComponent from the Array of objects.
    <SongInfoComponent
      key={crypto.randomUUID()} // Unique ID generation, built in JS method.
      songId={song.id}
      firstName={song.firstName}
      lastName={song.lastName}
      gender={song.gender}
    />
  ));
  return (
    <div className="relative flex h-auto grow">
      <input
        onChange={({ target }) => setPlaylistInput(target.value)}
        className="absolute -top-20 mx-0 my-0 mb-0 w-[500px] bg-transparent px-0 py-0 text-6xl text-slate-100"
        name="searchbar"
        type="text"
        placeholder="Playlist name"
        value={playlistInput}
      />
      <div className="scrollbar-hide h-4/5 flex-grow overflow-y-scroll">
        <ul>
          {/* uses a plugin https://www.npmjs.com/package/tailwind-scrollbar-hide */}
          {songList}
        </ul>
      </div>
    </div>
  );
}

export default CustomPlaylistComponent;
