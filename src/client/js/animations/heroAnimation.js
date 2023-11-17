// Animation for hero page
function executeAnimation() {
  const word1 = document.querySelector(".word1");
  const word2 = document.querySelector(".word2");
  const word3 = document.querySelector(".word3");
  const wordContainer = document.querySelector(".word-container");
  const airplane = document.querySelector(".airplane");
  const body = document.body;

  // element to change text color
  const logoCon = document.querySelector(".logo");
  const svgs = document.querySelectorAll("svg");

  if (airplane) {
    // a plane cross the page animation
    airplane.style.animation = "crossFlying 7s forwards";
    airplane.style.animationDelay = "3s";

    // words are faded off
    setTimeout(() => {
      if (word1) {
        word1.style.animation = "fadeOff 2s forwards";
        word1.style.backgroundColor = "transparent";
      }
      if (word2) {
        word2.style.animation = "fadeOff 2s forwards";
        word2.style.backgroundColor = "transparent";
      }
      if (word3) {
        word3.style.animation = "fadeOff 2s forwards";
        word3.style.backgroundColor = "transparent";
      }
    }, 6000);

    // change the words' content, one by one
    setTimeout(() => {
      if (wordContainer) {
        wordContainer.style.textAlign = "center";
      }
      if (word1) {
        word1.style.animation = "contentChanging 2.5s forwards";
        word1.textContent = "TOGETHER";
      }
    }, 6500);
    setTimeout(() => {
      if (word2) {
        word2.style.animation = "contentChanging 2.5s forwards";
        word2.textContent = "WE TRAVEL";
      }
    }, 7000);
    setTimeout(() => {
      if (word3) {
        word3.style.animation = "contentChanging 2.5s forwards";
        word3.style.fontSize = "8vw";
        word3.textContent = "AROUND THE WORLD";
      }

      // re-load hero background image to finish final apperance
      var src =
        "https://th.bing.com/th/id/R.9f3e83fa15fe85f7932ed4f8cfe7ce79?rik=GYtif4hjQzBFDg&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f08%2fTravel-Images-For-Desktop.jpg&ehk=urBwMZmbv1mdOGjeVkvPn1Sy%2b4Jczyqp4oF8Oy80j9I%3d&risl=&pid=ImgRaw&r=0";

      // wait for load background to change text color
      load(src).then(() => {
        airplane.style.display = "none";
        body.style.animation = "backgroundColorChanging 3s forwards";
        logoCon.children[0].style.animation =
          "backgroundColorChanging 3s forwards";
        svgs.forEach((e) => {
          e.children[0].style.animation = "pathFillChanging 3s forwards";
        });
        changeTextColor();
        window.addEventListener("resize", () => changeTextColor(), true);
      });
    }, 7500);
  }
}

function changeTextColor() {
  var navLinks = document.querySelectorAll(".nav-link");
  if (navLinks.length > 0) {
    if (window.screen.width > 400) {
      navLinks.forEach((e) => {
        e.style.animation = "backgroundColorChanging 3s forwards";
      });
    } else {
      navLinks.forEach((e) => {
        e.style.animation = "colorChanging 3s forwards";
      });
    }
  }
}

function load(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", resolve);
    image.addEventListener("error", reject);
    image.src = src;
  });
}

export { executeAnimation };
