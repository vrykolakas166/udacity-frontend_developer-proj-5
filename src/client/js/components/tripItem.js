/// Generate trip item html dynamic content

import {
  countDate,
  getWeatherIconCdnLink,
  disableButton,
} from "../func/helpers.js";

function generateTripItem(item, saveFunc, infoFunc) {
  let template = `
    <div class="card">
        <div class="card-image">
            <img src="${item.image.hits[0].webformatURL}" alt="${
    item.image.hits[0].tags
  }">
            <button type="button" onclick="javascript:location.href='/pages/details.html${infoFunc}'" class="btn interact btn-third">More info</button>
        </div>
        <article class="card-content">
            <h3 class="card-title">
                ${item.geonames.toponymName + ", " + item.geonames.countryName}
            </h3>
            <h3 class="card-title">
                Departing: ${new Date(item.startDate).toLocaleDateString()}
            </h3>
            <p class="card-shorts">
                <br/>
                <div class="card-buttons">
                    <button type="button" class="btn btn-secondary interact ${disableButton(
                      item
                    )}" 
                    onclick="Client.addTrip('${saveFunc}')">
                    Save trip
                    </button>
                    <button type="button" class="btn btn-third interact ${disableButton(
                      item,
                      true
                    )}"
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

  return template;
}

export { generateTripItem };
