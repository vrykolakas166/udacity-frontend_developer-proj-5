var isExecuting = false;

function handlingScroll() {
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  if (footer) {
    // footer.style.backgroundColor = "#fff";
    footer.style.position = "relative";
    footer.style.bottom = "relative";
  }

  window.addEventListener("scroll", () => {
    // header controlled on scrolling
    if (header) {
      if (window.scrollY > 5) {
        if (header.style.backgroundColor != "#fff") {
          header.style.backgroundColor = "#fff";
          header.style.boxShadow = "0px 0px 8px 3px rgba(0,0,0,0.1)";
        }
      } else {
        header.style.backgroundColor = "transparent";
        header.style.boxShadow = "none";
      }
    }

    // animation for button save and remove trip in details.html
    const groupButtons = document.querySelector(".group-float");
    if (groupButtons) {
      groupButtons.style.animation = "none";
      if (!isExecuting) {
        setTimeout(() => {
          groupButtons.style.animation = "faded 2s forwards";
          isExecuting = false;
        }, 300);
        isExecuting = true;
      }
    }
  });
}

export { handlingScroll };
