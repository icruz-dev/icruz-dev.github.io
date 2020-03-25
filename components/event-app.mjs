export default class EventApp extends HTMLElement
{
    constructor() {
        super();

        this.calendarId = 0;
        this.searchTerm = '';
        this.searchTimeout = null;
    }

    connectedCallback() {
        const template = document.getElementById('template-event-app');
        const content = template.content.cloneNode(true);

        const calendarSelectElement = content.querySelector('#event-calendar');
        const searchInputElement = content.querySelector('#event-search');
        const eventListElement = content.querySelector('#event-list');

        calendarSelectElement.hidden = false;
        calendarSelectElement.addEventListener('change', (event) => {
            const element = event.target;
            const calendarId = element.options[element.selectedIndex].value;

            this.calendarId = calendarId;

            this.fetchEvents(eventListElement);
        });

        searchInputElement.addEventListener('input', (event) => {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = null;

            this.searchTimeout = setTimeout(() => {
                const element = event.target;

                this.searchTerm = element.value;

                this.fetchEvents(eventListElement);
            }, 500);
        });

        this.fetchCalendars(calendarSelectElement).then((calendars) => {
            this.calendarId = calendars[0].calid;

            this.fetchEvents(eventListElement);
        });

        this.appendChild(content);
    }

    async fetchCalendars(parentElement) {
        const calendarResponse = await fetch('https://sheep.libcal.net/1.0/calendars?iid=717&key=fc9940d70d17a8595c5ce491f2d10a8e');
        const json = await calendarResponse.json();
        const calendars = json.calendars;

        calendars.forEach(calendar => {
            const calendarOption = document.createElement('option');
            calendarOption.setAttribute('value', calendar.calid);
            calendarOption.textContent = calendar.name;

            parentElement.appendChild(calendarOption);
        });

        return calendars;
    }

    async fetchEvents(parentElement) {
        let apiEndpoint = `https://sheep.libcal.net/1.0/events?cal_id=${this.calendarId}&days=30&limit=100&iid=717&key=b68bff824f7a503f5becdfa796bf189f`;

        if (this.searchTerm !== '') {
            apiEndpoint = `https://sheep.libcal.net/1.0/event_search?cal_id=${this.calendarId}&search=${encodeURIComponent(this.searchTerm)}&limit=100&iid=717&key=b68bff824f7a503f5becdfa796bf189f`;
        }

        const eventsResponse = await fetch(apiEndpoint);
        const json = await eventsResponse.json();
        const events = json.events;

        parentElement.innerHTML = '';

        if (events.length === 0) {
            parentElement.textContent = 'No events';

            return [];
        }

        events.forEach(event => {
            const eventCard = document.createElement('event-card');
            eventCard.event = event;

            parentElement.appendChild(eventCard);
        });

        return events;
    }
}
