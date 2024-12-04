import "./App.css";
import ListsContainer from "./ListsContainer/ListsContainer";
import React, { useEffect, useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import SearchBarComponent from "./SearchBarComponent";
import { client_id, client_secret } from "../spotify_API_data";
//import axios from "axios";

function App() {
  // State for search results, passed to SearchBarComponent
  const [searchData, setSearchData] = useState("");
  const [accessToken, setAccessToken] = useState("");

  // Spotify API call on render, imports the necessary data from spotify_API_data.js
  useEffect(() => {
    // API Access Token
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        client_id +
        "&client_secret=" +
        client_secret,
    };

    try {
      fetch("https://accounts.spotify.com/api/token", authParameters)
        .then((result) => result.json())
        .then((data) => setAccessToken(data.access_token));
    } catch (error) {
      console.error(error);
    }
  }, []);

  // search function for finding songs! I left off here 4 Dec 2024. https://www.youtube.com/watch?v=1PWDxgqLmDA
  async function search() {
    console.log("search for " + searchData); // example, King Krule
  }

  return (
    <div className="h-dvh w-full overflow-hidden px-10">
      <ShaderGradientCanvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <ShaderGradient
          control="query"
          urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=1.1&cAzimuthAngle=180&cDistance=3.9&cPolarAngle=115&cameraZoom=1&color1=%238e5024&color2=%234d5962&color3=%230c0000&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&grain=off&lightType=3d&pixelDensity=1&positionX=-0.5&positionY=0.1&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=235&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.1&uFrequency=5.5&uSpeed=0.1&uStrength=2.4&uTime=0.2&wireframe=false"
        />
      </ShaderGradientCanvas>
      <SearchBarComponent
        searchData={searchData}
        setSearchData={setSearchData}
        search={search}
      />
      <ListsContainer />
    </div>
  );
}

export default App;
