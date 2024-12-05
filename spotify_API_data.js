var redirect_uri = "http://localhost:5173/";

//var state = generateRandomString(16);

//localStorage.setItem(stateKey, state);
var scope = "user-read-private playlist-modify-private playlist-modify-public user-library-modify";

var url = "https://accounts.spotify.com/authorize";
url += "?response_type=token";
url += "&client_id=" + encodeURIComponent(import.meta.env.VITE_CLIENT_ID);
url += "&scope=" + encodeURIComponent(scope);
url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
//url += "&state=" + encodeURIComponent(state);

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};

export {url, getReturnedParamsFromSpotifyAuth}
