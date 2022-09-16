const API_KEY = "";
// I have removed the API-Key, as i could understand that i should not share my API Key with others. Hope this is Okay for you!

async function getData(apiUrl) {
  try {
    console.log("request for API received");
    const res = await fetch(apiUrl).then((response) => response.json());
    console.log("API request send");
    return res;
  } catch (err) {
    console.log(err);
    console.log("API Get Data Error!");
  }
}
