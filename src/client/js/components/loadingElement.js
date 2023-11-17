// show loading circle element when fetching data
import { CommonLayout } from "../views/common/commonLayout.js";

function loadElement(con) {
  document.body.innerHTML = "";
  if (con === true) {
    const content = `
    <main class="loading">
      <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 24 24">
        <!-- Define the gradient -->
        <defs>
          <linearGradient id="customGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#a6cf98" />
            <stop offset="100%" stop-color="#557c55" />
          </linearGradient>
        </defs>
        
        <!-- Your existing paths with updated stroke attribute -->
        <g fill="none">
          <!-- Original path with stroke -->
          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
            <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"></animate>
          </path>
          
          <!-- Path with gradient stroke -->
          <path stroke="url(#customGradient)" stroke-linecap="round" stroke-width="2" stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12">
            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"></animate>
            <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform>
          </path>
        </g>
      </svg>
      <p class="msg">
        Loading content. . . 
      </p>
    </main>
  `;

    document.body.appendChild(CommonLayout(content));
  }
}

export { loadElement };
