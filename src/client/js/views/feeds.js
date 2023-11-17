/// JS for feeds.html
import { CommonLayout } from "./common/commonLayout.js";
import { handlingScroll } from "../animations/headerAndFooterOnScroll.js";
import { addEventSuggestionList } from "../animations/suggestionList.js";
import { generateTripItem } from "../components/tripItem.js";

import "../../styles/style.scss";

let searchResult = ``;
let lastView = ``;

window.onload = async function () {
  let trip = JSON.parse(sessionStorage.getItem("trip"));
  let placeName = "";
  let startDate = "";
  if (trip) {
    placeName = trip.placeName;
    startDate = trip.startDate;
    searchResult = `
      <div class="travel">
          <h2>Result: ${trip.placeName}</h2>
          <div class="card-list">
              ${generateTripItem(trip, "searchResult", "?search=true")}
          </div>
      </div>
    `;
  }

  let lastTrip = JSON.parse(sessionStorage.getItem("lastTrip"));
  if (lastTrip) {
    lastView = `
      <div class="travel">
        <h2>Last view</h2>
        <div class="card-list">
            ${generateTripItem(lastTrip, "lastView", "?lastView=true")}
        </div>
      </div>
    `;
  }

  const searchSection = `
    <div class="travel">
        <h2>Search</h2>
        <form id="searchForm" onsubmit="return Client.getSearchResult(event)">
            <div class="form-control">
                <label for="placeName">Location</label>
                <input id="placeName" name="placeName" type="text" value="${placeName}" required/>
            </div>
            <div class="form-control">    
                <label for="startDate">Start time</label>
                <input id="startDate" name="startDate" type="date" value="${
                  startDate === "" ? getCurrentDate() : startDate
                }" min="${getCurrentDate()}" required/>
            </div>

            <div class="btn-groups">
                <button id="btnSearch" class="btn btn-secondary interact" type="submit">Check</button>
                <button id="btnClear" class="btn btn-third interact" type="reset" onclick="return Client.clearSearchResult()">Clear</button>
            </div>
        </form>
        </div>
    `;
  const content = `
        <main class="travel-page container">
            <h1 class="banner">Feeds</h1>
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
                ${searchSection}
                <div id="searchResult">
                    ${searchResult}
                </div>
                <div id="lastView">
                    ${lastView}
                </div>
                
                </section>
        </main>
    `;

  document.body.appendChild(CommonLayout(content));

  // add events
  handlingScroll();
  addEventSuggestionList();
};

function getCurrentDate() {
  let date = new Date();
  let d = date.getDate();
  let m = date.getMonth() + 1; //Month from 0 to 11
  let y = date.getFullYear();
  return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
}
