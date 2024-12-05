import React, { useEffect, useState } from "react";
import SongInfoComponent from "../../SongInfoComponent";

function CustomPlaylistComponent({
  selectedSong,
  playlistInput,
  setPlaylistInput,
  isCurrentlySelected,
  handleRemoveSong,
  musicSearchResult={musicSearchResult},
}) {
  // State for tracking if the added song is in the custom playlist.
  const [isInCustomPlaylist] = useState(true);
  // Stores the rendered li items from SongInfoComponent in songList
  const songList = selectedSong.map((song) => (
    // Passes the relevant data to SongInfoComponent from the Array of objects.
    <SongInfoComponent
      key={crypto.randomUUID()} // Unique ID generation, built in JS method.
      songId={song.songId}
      firstName={song.firstName}
      lastName={song.lastName}
      gender={song.gender}
      isCurrentlySelected={isCurrentlySelected}
      selectedSong={selectedSong}
      isInCustomPlaylist={isInCustomPlaylist}
      handleRemoveSong={handleRemoveSong}
    />
  ));
  /*
  useEffect(() => {
    console.log("Song list in parent component:", songList);
  }, []);
*/
  return (
    <div className="relative flex h-auto grow">
      <input
        onChange={({ target }) => setPlaylistInput(target.value)}
        className="absolute -top-16 mx-0 my-0 mb-0 w-[500px] bg-transparent px-0 py-0 text-4xl text-slate-100 md:-top-20 md:text-6xl"
        name="searchbar"
        type="text"
        placeholder="Playlist name"
        value={playlistInput}
      />
      <div className="h-4/5 flex-grow overflow-y-scroll scrollbar-hide">
        <ul>
          {/* uses a plugin https://www.npmjs.com/package/tailwind-scrollbar-hide */}
          {songList}
        </ul>
      </div>
    </div>
  );
}

export default CustomPlaylistComponent;
