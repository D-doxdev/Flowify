import "./App.css";
import ListsContainer from "./ListsContainer/ListsContainer";
import React, { useEffect, useState, useRef } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import SearchBarComponent from "./SearchBarComponent";
import { url, getReturnedParamsFromSpotifyAuth } from "../spotify_API_data";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
//import axios from "axios";

function App() {
  // State for search results, passed to SearchBarComponent
  const [searchData, setSearchData] = useState("");
  const [accessToken, setAccessToken] = useState("");
  // The artist top songs result from the API request
  const [musicSearchResult, setMusicSearchResult] = useState([]);
  // Selected song state with object data, passed to CustomPlaylistComponent when a li item is clicked.
  const [selectedSong, setSelectedSong] = useState([]);
  // input state for customPlaylist
  const [playlistInput, setPlaylistInput] = useState("");

  // State for checking if logged in, should also check against the expires token which will be added. Need to improve security, also fix a state random number generator for spotify API.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAccessToken, setUserAccessToken] = useState("");
  const [userTokenType, setUserTokenType] = useState("");
  const [userTokenExpireTime, setUserTokenExpireTime] = useState("");
  const [isTokenValid, setIsTokenValid] = useState();

  // useRef for controller of API calls
  const controllerRef = useRef(null);

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);
      //console.log(`This is the ${access_token} in the useEffect`);

      // keeps sensitive data in state
      setUserAccessToken(access_token);
      setUserTokenType(token_type);
      setUserTokenExpireTime(expires_in);
      // clears localstorage so the data is not kept accessible
      localStorage.clear();
    }
  }, []);

  // Keeps track of the userExpirationToken

  useEffect(() => {
    if (userTokenExpireTime) {
      const currentTimeInSeconds = Math.round(Date.now() / 1000);
      const expirationTime =
        currentTimeInSeconds + parseInt(userTokenExpireTime, 10);

      //console.log("Current time:", currentTimeInSeconds);
      //console.log("Expiration time:", expirationTime);

      // Update the login state
      setIsLoggedIn(currentTimeInSeconds < expirationTime);
      window.location.reload;
    }
  }, [userTokenExpireTime, isLoggedIn]);

  // Checks for token, if true the user is logged in.
  useEffect(() => {
    if (userAccessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userAccessToken]);

  // Feeds the url from spotify_API_data to user browser when login button is clicked
  const handleLogin = () => {
    window.location = url;
  };

  // Spotify API call on render, imports the necessary data from spotify_API_data.js
  useEffect(() => {
    // get the API Access Token
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${import.meta.env.VITE_CLIENT_ID}&client_secret=${import.meta.env.VITE_CLIENT_SECRET}`,
    };

    try {
      fetch("https://accounts.spotify.com/api/token", authParameters)
        .then((result) => result.json())
        .then((data) => setAccessToken(data.access_token));
    } catch (error) {
      console.error(error);
    }
  }, []);

  // clears the array when the field is empty, couldn't succeed in clearing all the calls when the search field is empty so it's a temporary solution that works as long as the get requests doesn't take longer than 1 sec to fulfill
  useEffect(() => {
    setTimeout(() => {
      searchData == "" && setMusicSearchResult([]);
    }, "1000");
  }, [searchData]);

  // search function for finding songs! I left off here 4 Dec 2024. https://www.youtube.com/watch?v=1PWDxgqLmDA
  async function search() {
    // Controller for aborting existing fetch requests
    const controller = new AbortController();
    const signal = controller.signal;
    // checks if there's an existing request and aborts
    if (controllerRef.current || searchData == "") {
      controllerRef.current.abort(); // Cancel the previous request
      // to test the abort: console.log("A API fetch call was aborted");
    }
    controllerRef.current = controller; // Store the new controller
    // test if the input value works console.log("search for " + searchData);
    // Get request using search to get the artist ID
    try {
      var searchParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        signal,
      };
      var artistID = await fetch(
        "https://api.spotify.com/v1/search?q=" + searchData + "&type=artist",
        searchParameters,
      )
        .then((response) => response.json())
        .then((data) => {
          return data.artists.items[0].id;
          //console.log(data.artists.items[0].id);
        });
      // Get request with artist ID grab all the top tracks from that artist
      var artistTopTracks = await fetch(
        `https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=SE`,
        searchParameters,
      )
        .then((response) => response.json())
        .then((data) => {
          // Delay setting the state with a 1-second timeout
          if (searchData !== "") {
            return new Promise((resolve) => {
              setTimeout(() => {
                setMusicSearchResult(data.tracks);
                resolve();
              }, 300); // 1-second delay
            });
          }
        });
    } catch (error) {
      console.log(
        "Song request failed! Please enter an artist name into the search field or reload the webpage.",
      );
    }
  }

  // 1. Create a playlist for the user with the name from the Playlist input when the Export button is pressed. (POST)
  // 2. Get the playlist ID of the playlist from the user, it's returned as a response from the server.
  // 3. Take the array of URI's that the user has added to the list and add them to the playlist ID (POST)
  async function createNewUserPlaylist() {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${userAccessToken}`);

    // Fetch current user profile to get the user ID
    fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: headers,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User ID:", data.id);

        // Create playlist
        const playlistHeaders = new Headers();
        playlistHeaders.append("Authorization", `Bearer ${userAccessToken}`);
        playlistHeaders.append("Content-Type", "application/json");

        const playlistBody = JSON.stringify({
          collaborative: false,
          description: "A playlist created via Flowify",
          name: playlistInput,
          public: true,
        });

        return fetch(`https://api.spotify.com/v1/users/${data.id}/playlists`, {
          method: "POST",
          headers: playlistHeaders,
          body: playlistBody,
          redirect: "follow",
        });
      })
      .then((response) => response.json())
      .then((playlistData) => {
        console.log("Playlist created:", playlistData);

        // Formats the array of URI's to an array of strings.
        const arrOfUriFormattedSongs = selectedSong.map((song) =>
          song.uri.toString(),
        );

        const tracksHeaders = new Headers();
        tracksHeaders.append("Authorization", `Bearer ${userAccessToken}`);
        tracksHeaders.append("Content-Type", "application/json");

        const tracksBody = JSON.stringify({
          position: 0,
          uris: arrOfUriFormattedSongs, // The formatted array of strings goes here
        });

        return fetch(
          `https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`,
          {
            method: "POST",
            headers: tracksHeaders,
            body: tracksBody,
            redirect: "follow",
          },
        );
      })
      .then((response) => response.json())
      .then(setSelectedSong([]))
      .then(setPlaylistInput(""))
      .catch((error) => console.log("Error:", error));
  }

  return (
    <div className="h-dvh w-full px-3 sm:px-10 md:overflow-hidden">
      <ShaderGradientCanvas
        style={{
          position: "fixed",
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
      {!isLoggedIn ? (
        <div className="flex h-dvh w-full items-center justify-center align-middle">
          <button
            className="rounded-md border border-gray-100 border-opacity-5 bg-slate-300 bg-opacity-0 bg-clip-padding px-10 py-5 text-white backdrop-blur-lg backdrop-filter transition duration-300 ease-in-out hover:text-opacity-70 sm:px-20 sm:py-10"
            onClick={handleLogin}
          >
            login via Spotify to search your favorite songs
            <AudiotrackIcon className="ml-3" />
          </button>
        </div>
      ) : (
        <>
          <SearchBarComponent
            searchData={searchData}
            setSearchData={setSearchData}
            search={search}
          />
          <ListsContainer
            musicSearchResult={musicSearchResult}
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
            createNewUserPlaylist={createNewUserPlaylist}
            playlistInput={playlistInput}
            setPlaylistInput={setPlaylistInput}
          />
        </>
      )}
    </div>
  );
}

export default App;

/* 




*/
