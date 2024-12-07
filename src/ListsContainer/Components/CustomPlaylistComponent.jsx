import React, { useEffect, useState } from "react";
import SongInfoComponent from "../../SongInfoComponent";
import SpotifyIcon from "../../assets/SpotifyIcon";
import SwitchAccessShortcutIcon from "@mui/icons-material/SwitchAccessShortcut";

function CustomPlaylistComponent({
  selectedSong,
  playlistInput,
  setPlaylistInput,
  isCurrentlySelected,
  handleRemoveSong,
  createNewUserPlaylist,
}) {
  // State for tracking if the added song is in the custom playlist.
  const [isInCustomPlaylist] = useState(true);
  // Stores the rendered li items from SongInfoComponent in songList
  const songList = selectedSong.map((track) => (
    // Passes the relevant data to SongInfoComponent from the Array of objects.
    <SongInfoComponent
      key={crypto.randomUUID()} // Unique ID generation, built in JS method.
      songId={track.songId}
      trackName={track.trackName}
      artistName={track.artistName}
      albumName={track.albumName}
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
    <div className="relative flex h-auto w-1/2">
      <div className="h-4/5 flex-grow overflow-y-scroll scrollbar-hide">
        <ul>
          {/* uses a plugin https://www.npmjs.com/package/tailwind-scrollbar-hide */}
          {songList}
        </ul>
      </div>

      {selectedSong.length !== 0 && (
        <>
          <input
            onChange={({ target }) => setPlaylistInput(target.value)}
            className="absolute -top-16 mx-0 my-0 mb-0 w-[500px] bg-transparent px-0 py-0 text-4xl text-slate-100 outline-none focus:outline-none focus:ring-0 md:-top-[5.5rem] md:text-6xl"
            name="searchbar"
            type="text"
            placeholder="Playlist name:"
            value={playlistInput}
          />
          <div className="mb-auto ml-10 mt-8">
            <button
              className="flex items-center space-x-2 text-white transition duration-300 ease-in-out hover:text-opacity-50"
              onClick={createNewUserPlaylist}
            >
              <h4 className="text-center">Export list to Spotify</h4>
              <span className="absolute right-5 top-2 rotate-90">
                <SwitchAccessShortcutIcon />
              </span>
              <span className="relative w-6">
                <SpotifyIcon />
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CustomPlaylistComponent;
