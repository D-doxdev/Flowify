//var redirect_uri = "http://localhost:5173/";
var redirect_uri = "https://flowifydoxjockey.netlify.app/";

// Encouraged to use by spotify to increase the safety of implicit grant
function generateRandomString(length) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

  // Loop to generate characters for the specified length
  for (let i = 0; i < length; i++) {
    const randomInd = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomInd);
  }
  return result;
}

var state = generateRandomString(16);

//localStorage.setItem(stateKey, state);
var scope =
  "user-read-private playlist-modify-private playlist-modify-public user-library-modify";

var url = "https://accounts.spotify.com/authorize";
url += "?response_type=token";
url += "&client_id=" + encodeURIComponent(import.meta.env.VITE_CLIENT_ID);
url += "&scope=" + encodeURIComponent(scope);
url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
url += "&state=" + encodeURIComponent(state);

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  //console.log(paramsSplitUp);
  return paramsSplitUp;
};

export { url, getReturnedParamsFromSpotifyAuth };
