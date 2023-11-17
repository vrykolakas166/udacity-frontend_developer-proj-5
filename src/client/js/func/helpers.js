/// Some of helper functions
import { checkExisted } from "./save";

// get days from entered date to current date
function countDate(date) {
  let date1 = new Date();
  let date2 = new Date(date);
  // Calculate the time difference in milliseconds
  const timeDifference = Math.abs(date2.getTime() - date1.getTime());

  // Convert the time difference from milliseconds to days
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return daysDifference > 1
    ? daysDifference + " days"
    : daysDifference + " day";
}

// weatherbit weather icon CDN
function getWeatherIconCdnLink(icon) {
  return `https://cdn.weatherbit.io/static/img/icons/${icon}.png`;
}

// get param from url in js
function getParam(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return null;
}

function disableButton(trip, reserve) {
  if (trip) {
    if (reserve) {
      return checkExisted(
        trip.geonames.toponymName + ", " + trip.geonames.countryName,
        trip.startDate
      )
        ? ""
        : "hidden";
    }
    return checkExisted(
      trip.geonames.toponymName + ", " + trip.geonames.countryName,
      trip.startDate
    )
      ? "hidden"
      : "";
  }
}

export { countDate, getWeatherIconCdnLink, getParam, disableButton };
