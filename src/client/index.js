import { executeAnimation } from "./js/animations/heroAnimation.js";
import { CommonLayout } from "./js/views/common/commonLayout.js";

import "./styles/hero.scss";
import "./styles/style.scss";

document.addEventListener("DOMContentLoaded", function () {
  executeAnimation();
});

const content = `
  <main id="hero" class="container">
  <div class="word-container">
      <h1 class="word1">BEST</h1>
      <h2 class="word2">WEBSITE</h2>
      <h2 class="word3">FOR TRAVELLER</h2>
      <img class="airplane" src="../assets/airplane.png" alt="airplain" />
  </div>
  </main>
  `;
document.body.appendChild(CommonLayout(content));
