import React from "react";
import SongInfoComponent from "../../SongInfoComponent";

function TrackListingComponent({
  musicSearchResult,
  handleAddSong,
  selectedSong,
}) {
  // Stores the rendered li items from SongInfoComponent in songList
  const songList = musicSearchResult.map((track) => (
    // Passes the relevant data to SongInfoComponent from the Array of objects.
    <SongInfoComponent
      key={crypto.randomUUID()} // Unique ID generation, built in JS method.
      songId={track.id}
      trackName={track.name}
      artistName={track.artists[0]?.name}
      albumName={track.album?.name}
      uri={track.uri}
      handleAddSong={handleAddSong}
      selectedSong={selectedSong}
    />
  ));
  return (
    <div className="relative flex h-auto w-2/5">
      <h1 className="absolute -top-16 mb-3 text-4xl text-slate-100 md:-top-20 md:text-6xl">
        Top songs
      </h1>
      <div className="h-4/5 flex-grow overflow-y-scroll scrollbar-hide">
        {musicSearchResult.length == 0 ? (
          <p className="ml-2 text-slate-100 text-opacity-50">
            no songs loaded..
          </p>
        ) : (
          <ul className="">
            {/* uses a plugin https://www.npmjs.com/package/tailwind-scrollbar-hide */}
            {songList}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TrackListingComponent;
