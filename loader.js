import NavBar from './components/nav-bar.mjs';
import EventApp from './components/event-app.mjs';
import EventCard from './components/event-card.mjs';

window.addEventListener('load', () => {
    customElements.define('nav-bar', NavBar);
    customElements.define('event-app', EventApp);
    customElements.define('event-card', EventCard);

    const appContainer = document.querySelector('#app-container');
    const eventAppElement = document.createElement('event-app');

    appContainer.appendChild(eventAppElement);
});
