/// JS for saves.html
import { CommonLayout } from "./common/commonLayout.js";
import { handlingScroll } from "../animations/headerAndFooterOnScroll.js";
import { addEventSuggestionList } from "../animations/suggestionList.js";
import { countDate, getWeatherIconCdnLink } from "../func/helpers.js";
import { loadElement } from "../components/loadingElement.js";

import "../../styles/style.scss";

loadElement(true);

window.onload = async function () {
  let savedTripContent = ``;
  let title = "";
  if (localStorage.getItem("store")) {
    var store = JSON.parse(localStorage.getItem("store"));
    if (store.length > 0) {
      title = `Your trips (${store.length})`;
      for (let item of store) {
        let moreInfo = ``;
        if (
          new Date(item.startDate) < new Date(new Date().toLocaleDateString())
        ) {
          moreInfo = `<span class="error">Expired.</span>`;
        } else {
          moreInfo = `<button type="button" onclick="javascript:location.href='/pages/details.html?savedId=${item.id}'" class="btn interact btn-third">More info</button>`;
        }
        savedTripContent += `
        <div class="card">
            <div class="card-image">
                <img src="${item.image.hits[0].webformatURL}" alt="${
          item.image.hits[0].tags
        }">
                ${moreInfo}
            </div>
            <article class="card-content">
                <h3 class="card-title">
                    ${
                      item.geonames.toponymName +
                      ", " +
                      item.geonames.countryName
                    }
                </h3>
                <h3 class="card-title">
                    Departing: ${new Date(item.startDate).toLocaleDateString()}
                </h3>
                <p class="card-shorts">
                    <br/>
                    <div class="card-buttons">
                        <button type="button" class="btn btn-third interact"
                        onclick="Client.removeTrip('${
                          item.geonames.toponymName +
                          ", " +
                          item.geonames.countryName
                        }','${item.startDate}')">
                        Remove trip
                        </button>
                    </div>
                    <div class="card-des">
                        ${
                          item.geonames.toponymName +
                          ", " +
                          item.geonames.countryName
                        } is ${countDate(item.startDate)} away
                    </div>
                    <div class="card-moreinfo">
                        <div class="card-moreinfo">
                            <strong>Weather:</strong>
                            Avg ${item.currentWeather.data[0].temp} °C 
                        </div>
                        <div class="card-moreinfo">
                            <strong>Description:</strong>
                            ${item.currentWeather.data[0].weather.description}.
                            <img src="${getWeatherIconCdnLink(
                              item.currentWeather.data[0].weather.icon
                            )}" alt="weather-icon" width="30"/>
                        </div>
                    </div>
                </p>
            </article>
        </div>
        `;
      }
    } else {
      title = `No trips`;
      savedTripContent = `
            <a href="/pages/feeds.html">Find some intersting locations</a>
        `;
    }
  } else {
    title = `No trips`;
    savedTripContent = `
        <a href="/pages/feeds.html">Find some intersting locations</a>
    `;
  }

  loadElement(false);

  const content = `
    <main class="travel-page container">
        <h1 class="banner">Saves</h1>
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
                <h2>${title}</h2>
                <div class="card-list">
                    ${savedTripContent}
                </div>
            </div>
        </section>
    </main>
  `;

  document.body.appendChild(CommonLayout(content));

  // add events
  handlingScroll();
  addEventSuggestionList();
};
