// add event for button to toggle suggestion list view

function addEventSuggestionList() {
  // links bar click
  var btnShowLink = document.querySelector(".toggle-show-icon");
  var links = document.querySelector(".sidebar ol");
  if (btnShowLink) {
    btnShowLink.addEventListener("click", () => {
      btnShowLink.classList.toggle("close");
      if (btnShowLink.classList.contains("close")) {
        links.style.display = "none";
      } else {
        links.style.display = "block";
      }
    });
  }
}

export { addEventSuggestionList };
