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
      uri={track.uri}
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
    <div className="relative flex h-auto w-full flex-col md:w-3/5 md:flex-row">
      <div className="h-4/5 flex-grow overflow-y-scroll scrollbar-hide">
        <ul className="text-sm">{songList}</ul>
      </div>

      {selectedSong.length !== 0 && (
        <div className="">
          <input
            onChange={({ target }) => setPlaylistInput(target.value)}
            className="absolute -top-16 left-0 mx-0 my-0 mb-0 w-[500px] bg-transparent px-0 py-0 text-4xl text-slate-100 outline-none focus:outline-none focus:ring-0 md:-top-[5.5rem] md:text-6xl"
            name="searchbar"
            type="text"
            placeholder="Playlist name:"
            value={playlistInput}
          />
          {playlistInput.length > 0 ? (
            <div className="my-16 flex items-center justify-center md:mb-0 md:ml-5 md:mt-12">
              <button
                className="flex items-center space-x-2 text-white transition duration-300 ease-in-out hover:text-opacity-50"
                onClick={createNewUserPlaylist}
              >
                <h4 className="text-center">Export list to Spotify</h4>
                <span className="relative w-6">
                  <span className="absolute -top-6 right-5 rotate-90">
                    <SwitchAccessShortcutIcon />
                  </span>
                  <SpotifyIcon />
                </span>
              </button>
            </div>
          ) : (
            <div className="my-16 flex items-center justify-center md:mb-0 md:ml-5 md:mt-12">
              <button className="flex items-center space-x-2 text-white text-opacity-50 transition duration-300 ease-in-out hover:cursor-default">
                <h4 className="text-center">Export list to Spotify</h4>
                <span className="relative w-6">
                  <span className="absolute -top-6 right-5 rotate-90">
                    <SwitchAccessShortcutIcon />
                  </span>
                  <SpotifyIcon />
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CustomPlaylistComponent;
