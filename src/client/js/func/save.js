/// Save and remove trip in local storage

// Output: Array of objects
function getStore() {
  const retrievedJson = localStorage.getItem("store");
  if (retrievedJson) {
    const retrievedArray = JSON.parse(retrievedJson);
    return retrievedArray;
  } else {
    return [];
  }
}

// Input: Array of objects
function saveStore(store) {
  localStorage.removeItem("store");
  localStorage.setItem("store", JSON.stringify(store));
}

// input is json string
function addTrip(kind, object = null, reload = true) {
  const store = getStore();
  let trip = null;
  if (object === null) {
    switch (kind) {
      case "searchResult":
        trip = JSON.parse(sessionStorage.getItem("trip"));
        break;
      case "lastView":
        trip = JSON.parse(sessionStorage.getItem("lastTrip"));
        break;
      default:
        break;
    }
  } else {
    trip = object;
  }

  // add id to trip
  trip = {
    id: new Date().toISOString(),
    ...trip,
  };
  console.log(trip);

  if (trip === null) return;
  if (store) {
    if (store.length > 0) {
      // check if existed
      if (checkExisted(trip.placeName, trip.startTime)) {
        return;
      }
    }
    // add if not existed
    store.push(trip);
    saveStore(store);
    if (reload) {
      location.reload();
    } else {
      // handle new trip in details.html
      // Get the current URL
      const currentUrl = window.location.href;
      let rawUrl = currentUrl;
      if (currentUrl.includes("?")) {
        // Get the URL without parameters (query string)
        rawUrl = currentUrl.split("?")[0];
      }
      let newUrl = `${rawUrl}?lastView=true`;
      location.href = newUrl;
    }
  }
}

function removeTrip(placeName, startDate, reload) {
  let store = getStore();
  if (store) {
    if (store.length > 0) {
      // get removed object
      var removed = getRemovedIndex(placeName, startDate);
      if (removed != -1) {
        store.splice(removed, 1);
        saveStore(store);
        if (reload) {
          location.reload();
        } else {
          // handle new trip in details.html
          // Get the current URL
          const currentUrl = window.location.href;
          let rawUrl = currentUrl;
          if (currentUrl.includes("?")) {
            // Get the URL without parameters (query string)
            rawUrl = currentUrl.split("?")[0];
          }
          let newUrl = `${rawUrl}?lastView=true`;
          location.href = newUrl;
        }
        return;
      }
    }
  }
}

function getTripById(id) {
  let store = getStore();
  for (let s of store) {
    if (s.id === id) return s;
  }
  return null;
}

function getRemovedIndex(placeName, startDate) {
  let store = getStore();
  for (let s of store) {
    if (
      s.geonames.toponymName + ", " + s.geonames.countryName === placeName &&
      s.startDate === startDate
    )
      return store.indexOf(s);
  }
  return -1;
}

function checkExisted(placeName, startDate) {
  const store = getStore();
  for (let s of store) {
    if (
      s.geonames.toponymName + ", " + s.geonames.countryName === placeName &&
      s.startDate === startDate
    )
      return true;
  }
  return false;
}

export { addTrip, removeTrip, checkExisted, getTripById };
