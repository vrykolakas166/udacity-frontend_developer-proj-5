/// Search function in feeds.html
import {
  getGeonames,
  getCurrentWeather,
  getForecastWeather,
  getPixabay,
} from "../api/fetchData.js";
import { generateTripItem } from "../components/tripItem.js";

// get result when submit form
async function getSearchResult(e) {
  e.preventDefault();
  let searchResult = "";
  // get form input
  const placeName = document.querySelector("#placeName").value;
  const startDate = document.querySelector("#startDate").value;
  if (placeName === "" || startDate === "") {
    searchResult = `<span class="error">No founds.</span>`;
    addHtml(searchResult);
    return;
  }

  try {
    loading(true);
    const trip = await getTrip(formatPlaceName(placeName), startDate);

    if (!trip) {
      searchResult = `<span class="error">No matches.</span>`;
    } else {
      // add to session storage
      SaveSearchedTripSession(placeName, startDate, trip);

      // search html dynamic content
      searchResult = `
        <div class="travel">
            <h2>Result: ${placeName}</h2>
            <div class="card-list">
                ${generateTripItem(trip, "searchResult", "?search=true")}
            </div>
        </div>
        `;
    }
  } catch (err) {
    searchResult = `<span class="error">${err}</span>`;
  } finally {
    loading(false);
    addHtml(searchResult);
  }
}

function formatPlaceName(placeName) {
  let result = placeName.trim().split(",");
  if (result.length > 1) {
    for (let i = 0; i < result.length; i++) {
      result[i] = result[i].trim().replace(" ", "");
    }
    return result.join("+");
  }
  return placeName;
}

// add html content to element #searchResult
function addHtml(html) {
  const div = document.querySelector("#searchResult");
  div.innerHTML = html;
}

// Image, CurrentWeather, ForecastWeather
async function getTrip(placeName, startDate) {
  const resFromServer = await fetch("http://localhost:8081/getApiKeys");
  const apiKeys = await resFromServer.json();

  const image = await getPixabay(placeName, apiKeys.PIXABAY_API_KEY).then(
    async (res) => {
      if (!res.ok) {
        throw new Error("Something's wrong. Please try again later !");
      }
      return await res.json();
    }
  );

  const geonamesData = await getGeonames(placeName, "vrykolakas16").then(
    async (res) => {
      if (!res.ok) {
        throw new Error("Something's wrong. Please try again later !");
      }
      return await res.json();
    }
  );
  if (geonamesData.totalResultsCount === 0) {
    throw new Error("No places found.");
  }

  const currentWeatherData = await getCurrentWeather(
    geonamesData.geonames[0].lat,
    geonamesData.geonames[0].lng,
    apiKeys.WEATHERBIT_API_KEY
  ).then(async (res) => {
    if (!res.ok) {
      throw new Error("Something's wrong. Please try again later !");
    }
    return await res.json();
  });

  const forecastWeatherData = await getForecastWeather(
    geonamesData.geonames[0].lat,
    geonamesData.geonames[0].lng,
    apiKeys.WEATHERBIT_API_KEY
  ).then(async (res) => {
    if (!res.ok) {
      throw new Error("Something's wrong. Please try again later !");
    }
    return await res.json();
  });

  return {
    placeName: placeName,
    startDate: startDate,
    image: image,
    geonames: geonamesData.geonames[0],
    currentWeather: currentWeatherData,
    forecastWeather: forecastWeatherData,
  };
}

// loading when button is executing
function loading(con) {
  const placeName = document.querySelector("#placeName");
  const startDate = document.querySelector("#startDate");
  const btnSearch = document.querySelector("#btnSearch");
  const btnClear = document.querySelector("#btnClear");
  const loadingSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>`;
  if (con) {
    placeName.disabled = true;
    startDate.disabled = true;
    btnSearch.disabled = true;
    btnSearch.innerHTML = loadingSvg;
    btnClear.disabled = true;
    btnSearch.classList.toggle("btn-disable");
    btnClear.classList.toggle("btn-disable");
  } else {
    placeName.disabled = false;
    startDate.disabled = false;
    btnSearch.disabled = false;
    btnSearch.innerHTML = "Check";
    btnClear.disabled = false;
    btnSearch.classList.toggle("btn-disable");
    btnClear.classList.toggle("btn-disable");
  }
}

// save trip when search, handling trip and last trip
function SaveSearchedTripSession(placeName, startDate, trip) {
  // add place name and start date fields
  trip = {
    placeName: placeName,
    startDate: startDate,
    ...trip,
  };

  // move trip to lastTrip in session when new trip searched
  if (sessionStorage.getItem("trip")) {
    sessionStorage.removeItem("lastTrip");
    let lastTrip = sessionStorage.getItem("trip");
    sessionStorage.setItem("lastTrip", lastTrip);
    // load last trip on view
    loadLastView(JSON.parse(lastTrip));

    sessionStorage.removeItem("trip");
  } else {
    if (!sessionStorage.getItem("lastTrip")) {
      sessionStorage.removeItem("lastTrip");
      sessionStorage.setItem("lastTrip", JSON.stringify(trip));
    }
  }

  // save searched trip to session
  sessionStorage.setItem("trip", JSON.stringify(trip));
}

// load last trip on view
function loadLastView(trip) {
  const lastView = document.querySelector("#lastView");
  if (!lastView) return;
  let content = `
    <div class="travel">
        <h2>Last view</h2>
        <div class="card-list">
          ${generateTripItem(trip, "lastView", "?lastView=true")}
        </div>
      </div>
  `;

  lastView.innerHTML = content;
}

// button Clear (because searched trip is saved in session, so user need to clear and re-enter location and time for next check)
function clearSearchResult() {
  if (sessionStorage.getItem("trip")) {
    if (confirm("Clear search result ?")) {
      sessionStorage.removeItem("lastTrip");
      let lastTrip = sessionStorage.getItem("trip");
      sessionStorage.setItem("lastTrip", lastTrip);
      // load last trip on view
      loadLastView(JSON.parse(lastTrip));

      sessionStorage.removeItem("trip");
      location.reload();
    }
  }
}

export { getSearchResult, clearSearchResult, formatPlaceName, getTrip };
