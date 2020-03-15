import NavBar from './components/nav-bar.mjs';
import EventCard from './components/event-card.mjs';

window.addEventListener('load', () => {
    customElements.define('nav-bar', NavBar);
    customElements.define('event-card', EventCard);

    M.Sidenav.init(document.querySelectorAll('.sidenav'));

    fetchEvents();
});

async function fetchEvents() {
    const res = await fetch('https://sheep.libcal.net/1.0/events?cal_id=263&days=30&limit=100&iid=717&key=b68bff824f7a503f5becdfa796bf189f');
    const json = await res.json();

    json.events.forEach(event => {
        var eventCard = document.createElement('event-card');
        eventCard.event = event;
        eventCard.classList = 'col s12 m6';

        document.querySelector('#events').appendChild(eventCard);
    });
}
