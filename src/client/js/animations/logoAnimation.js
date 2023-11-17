// animate logo: LEVART -> TRAVEL when hovering
function animateLogo() {
  const letterL = document.querySelector("#logo_L");
  const letterE = document.querySelector("#logo_E");
  const letterV = document.querySelector("#logo_V");
  const letterA = document.querySelector("#logo_A");
  const letterR = document.querySelector("#logo_R");
  const letterT = document.querySelector("#logo_T");

  // logo animation
  if (letterL || letterE || letterV || letterA || letterR || letterT) {
    // L - T
    var distanceLT =
      letterT.offsetLeft - letterL.offsetLeft - letterT.offsetWidth / 2;
    letterL.style.transform = `translateX(${distanceLT}px)`;
    letterT.style.transform = `translateX(${-distanceLT}px)`;
    // E - R
    var distanceER =
      letterR.offsetLeft - letterE.offsetLeft - letterR.offsetWidth / 2;
    letterE.style.transform = `translateX(${distanceER}px)`;
    letterR.style.transform = `translateX(${-distanceER}px)`;
    // V - A
    var distanceVA =
      letterA.offsetLeft - letterV.offsetLeft - letterA.offsetWidth / 2;
    letterV.style.transform = `translateX(${distanceVA}px)`;
    letterA.style.transform = `translateX(${-distanceVA}px)`;
  }
}

// cancel logo animation
function cancelAnimation() {
  const letterL = document.querySelector("#logo_L");
  const letterE = document.querySelector("#logo_E");
  const letterV = document.querySelector("#logo_V");
  const letterA = document.querySelector("#logo_A");
  const letterR = document.querySelector("#logo_R");
  const letterT = document.querySelector("#logo_T");

  if (letterL || letterE || letterV || letterA || letterR || letterT) {
    // L - T
    letterL.style.transform = `translateX(0px)`;
    letterT.style.transform = `translateX(0px)`;
    letterE.style.transform = `translateX(0px)`;
    letterR.style.transform = `translateX(0px)`;
    letterV.style.transform = `translateX(0px)`;
    letterA.style.transform = `translateX(0px)`;
  }
}

export { animateLogo, cancelAnimation };
