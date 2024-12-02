import React, { useEffect, useState } from "react";
import TrackListingComponent from "./Components/TrackListingComponent";
import CustomPlaylistComponent from "./Components/CustomPlaylistComponent";
import axios from "axios";

function ListsContainer() {
  // Dummy data stored, is passed as prop to TrackListingComponent which passes to SongInfoComponent.
  const [dummyData, setDummyData] = useState([]);
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
    <div className="flex h-dvh w-full flex-nowrap gap-5">
      <TrackListingComponent dummyData={dummyData} />
      {/* Passes dummyData to TrackListingComponent */}
      <CustomPlaylistComponent />
    </div>
  );
}

export default ListsContainer;

// songname, API placeholder: firstName
//artist API placeholder: lastName
//alsum API placeholder: maidenName
