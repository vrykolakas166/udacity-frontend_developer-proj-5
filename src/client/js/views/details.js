/// JS for details.html
import { CommonLayout } from "./common/commonLayout.js";
import { handlingScroll } from "../animations/headerAndFooterOnScroll.js";
import { addEventSuggestionList } from "../animations/suggestionList.js";
import { getParam, disableButton } from "../func/helpers.js";
import {
  getGeonames,
  getCurrentWeather,
  getForecastWeather,
  getPixabay,
} from "../api/fetchData.js";
import { formatPlaceName } from "../func/search.js";
import { loadElement } from "../components/loadingElement.js";
import { getTripById } from "../func/save.js";

import "../../styles/style.scss";

loadElement(true);

window.onload = async function () {
  let trip = null;

  // load searched trip detail
  let condition = getParam("search");
  if (condition != null) {
    if (condition === "true") {
      trip = JSON.parse(sessionStorage.getItem("trip"));
      // if user see searched trip in detail, remove it because it will be added to lastTrip
      sessionStorage.removeItem("trip");
    }
  } else {
    // then, load last view trip detail
    condition = getParam("lastView");
    if (condition != null) {
      if (condition === "true") {
        trip = JSON.parse(sessionStorage.getItem("lastTrip"));
      }
    } else {
      // then, load suggest trip detail
      condition = getParam("placeName");
      if (condition != null) {
        try {
          let placeName = decodeURI(condition);
          if (placeName != "") {
            trip = await getTrip(
              formatPlaceName(placeName),
              new Date().toLocaleDateString()
            );
          }
        } catch (error) {
          loadElement(false);
          alert(error + ". Please try another location !");
          window.history.back();
        }
      } else {
        // then, load saved trip detail
        condition = getParam("savedId");
        if (condition != null) {
          try {
            let id = condition;
            if (id != "") {
              trip = getTripById(id);
            }
          } catch (error) {
            loadElement(false);
            alert(error + ". Please try another location !");
            window.history.back();
          }
        }
      }
    }
  }

  // dynamic add content to body
  let content = ``;
  if (trip) {
    SaveLastViewTripSession(trip);
    // forecast 7 days
    let forecastContent = ``;
    for (let i = 0; i < trip.forecastWeather.data.length; i++) {
      forecastContent += `
      <div class="weather-forecast-item">
          <div class="forecast-time">
              <h4>${new Intl.DateTimeFormat("en-US", {
                weekday: "short",
              }).format(
                new Date(
                  new Date().setDate(new Date(trip.startDate).getDate() + i)
                )
              )}</h4>
              <h5>${new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(
                new Date(
                  new Date().setDate(new Date(trip.startDate).getDate() + i)
                )
              )}</h5>
          </div>
          <img src="https://cdn.weatherbit.io/static/img/icons/${
            trip.forecastWeather.data[i].weather.icon
          }.png" alt="t01d" width="80"/>
          <div class="forecast-condition">
              <div class="temperatures">
                <span>High ${trip.forecastWeather.data[i].high_temp} °C</span>
                <span class="temp_separator">|</span>
                <span>Low ${trip.forecastWeather.data[i].low_temp} °C</span>
              </div>
              <em>${trip.forecastWeather.data[i].weather.description}.</em>
          </div>
      </div>`;
    }

    // main content of page
    content = `
  <main class="travel-page container">
      <h1 class="banner">${
        trip.geonames.toponymName + ", " + trip.geonames.countryName
      }</h1>
      <section class="sidebar">
          <div class="sidebar-head">
              <h3>Suggestions</h3>
              <div class="toggle-show-icon close">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                      <path fill="currentColor"
                          d="M236.78 211.81A24.34 24.34 0 0 1 215.45 224H40.55a24.34 24.34 0 0 1-21.33-12.19a23.51 23.51 0 0 1 0-23.72l87.43-151.87a24.76 24.76 0 0 1 42.7 0l87.45 151.87a23.51 23.51 0 0 1-.02 23.72Z" />
                  </svg>
              </div>
          </div>
          <div class="link-list">
              <ol>
                <li>
                    <a href="/pages/details.html?placeName=Paris&startTime=${new Date().toLocaleDateString()}">
                        Paris, France
                    </a>
                </li>
                <li>
                    <a href="/pages/details.html?placeName=Tokyo&startTime=${new Date().toLocaleDateString()}">Tokyo, Japan</a>
                </li>
                <li>
                    <a href="/pages/details.html?placeName=Berlin&startTime=${new Date().toLocaleDateString()}">Berlin, Germany</a>
                </li>
                <li>
                    <a href="/pages/details.html?placeName=Hanoi&startTime=${new Date().toLocaleDateString()}">Hanoi, Vietnam</a>
                </li>
              </ol>
          </div>
  
      </section>
      <section class="travel-section">
          <div class="travel">
              <h2>
                  Departing: ${new Date(trip.startDate).toLocaleDateString()}
              </h2>
              <h3>Weather forecast in 7 days</h3>
              <article class="weather-forecast-container">
                <div class="weather-forecast">
                  ${forecastContent}
                </div>
              </article>
              <figure>
                <img src="${trip.image.hits[0].webformatURL}" alt="${
      trip.image.hits[0].tags
    }">  
                <figcaption>Image 1. ${trip.image.hits[0].tags.toUpperCase()}</figcaption>
              </figure>
              <blockquote cite="https://www.goodreads.com/quotes/943857-for-my-part-i-travel-not-to-go-anywhere-but#:~:text=%E2%80%9CFor%20my%20part%2C%20I%20travel%20not%20to%20go,strewn%20with%20cutting%20flints.%E2%80%9D%20%E2%80%95%20Robert%20Louis%20Stevenson">
                  “For my part, I travel not to go anywhere, but to go. I travel for travel’s sake. The great affair is to move; to feel the needs and hitches of our life more nearly; to come down off this feather-bed of civilization, and find the globe granite underfoot and strewn with cutting flints.”
                  <br/>
                  ― Robert Louis Stevenson
              </blockquote>
              <article>
                  <h3>Where to stay</h3>
                  <p>
                      It is a long established fact that a reader will be distracted by the readable content of a page
                      when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                      distribution of letters, as opposed to using 'Content here, content here', making it look like
                      readable English.
                  </p>
              </article>
              <figure>
                  <img src="${trip.image.hits[1].webformatURL}" alt="${
      trip.image.hits[1].tags
    }">
                  <figcaption>Image 2. ${trip.image.hits[1].tags.toUpperCase()}</figcaption>
              </figure>
              <article>
                  <h3>Where to eat</h3>
                  <p>
                      There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                      alteration in some form, by injected humour, or randomised words which don't look even slightly
                      believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't
                      anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the
                      Internet
                  </p>
              </article>
              <figure>
                <img src="${trip.image.hits[2].webformatURL}" alt="${
      trip.image.hits[2].tags
    }">  
                <figcaption>Image 3. ${trip.image.hits[2].tags.toUpperCase()}</figcaption>
              </figure>
              <article>
                  <h3>Where to play</h3>
                  <p>
                      There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                      alteration in some form, by injected humour, or randomised words which don't look even slightly
                      believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't
                      anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the
                      Internet
                  </p>
              </article>
              <figure>
                <img src="${trip.image.hits[3].webformatURL}" alt="${
      trip.image.hits[3].tags
    }">  
                <figcaption>Image 4. ${trip.image.hits[3].tags.toUpperCase()}</figcaption>
              </figure>
              <br />
          </div>
      </section>
      <div class="group-float">
        <button type="button" class="btn btn-secondary interact ${disableButton(
          trip
        )}" 
        onclick="Client.addTrip('lastView', null, false)">
        Save trip
        </button>
        <button type="button" class="btn btn-third interact ${disableButton(
          trip,
          true
        )}"
        onclick="Client.removeTrip('${
          trip.geonames.toponymName + ", " + trip.geonames.countryName
        }','${trip.startDate}', false)">
        Remove trip
        </button>
      </div>
      </main>
  `;
  } else {
    window.history.back();
  }
  loadElement(false);

  // add content to body of page
  document.body.appendChild(CommonLayout(content));

  // add events
  handlingScroll();
  addEventSuggestionList();
};

// Trip object: PlaceName, StartDate, Image, CurrentWeather, ForecastWeather
async function getTrip(placeName, startDate) {
  const resFromServer = await fetch("http://localhost:8081/getApiKeys");
  const apiKeys = await resFromServer.json();

  // get images from Pixabay
  const image = await getPixabay(placeName, apiKeys.PIXABAY_API_KEY).then(
    async (res) => {
      if (!res.ok) {
        throw new Error("Something's wrong. Please try again later !");
      }
      return await res.json();
    }
  );

  // get data from Geonames by placeName
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

  // get current weather from WEATHERBIT
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

  // get forecast weather from WEATHERBIT
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

// every time a trip viewd on details.html page, add to last view session storage.
function SaveLastViewTripSession(trip) {
  sessionStorage.removeItem("lastTrip");
  sessionStorage.setItem("lastTrip", JSON.stringify(trip));
}
