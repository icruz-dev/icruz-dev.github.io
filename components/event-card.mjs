export default class EventCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const event = this.event;

        const template = document.getElementById('template-event-card');
        const content = template.content.cloneNode(true);

        const startDate = moment(event.start).format('MMMM DD, YYYY');
        const endDate = moment(event.end).format('MMMM DD, YYYY');
        const startTime = moment(event.start).format('hh:MMa');
        const endTime = moment(event.end).format('hh:MMa');

        const imgEl = content.querySelector('.event-image');
        const titleEl = content.querySelectorAll('.event-title');
        const dateEl = content.querySelector('.event-date');
        const startTimeEl = content.querySelector('.event-start-time');
        const endTimeEl = content.querySelector('.event-end-time');
        const descriptionEl = content.querySelector('.event-description');
        const calendarEl = content.querySelector('.event-calendar-name');
        const locationEl = content.querySelector('.event-location-name');
        const campusEl = content.querySelector('.event-campus-name');
        const linkEl = content.querySelector('.event-link');

        const date = (startDate === endDate) ? startDate : `${startDate} - ${endDate}`;

        imgEl.src = event.featured_image || 'https://lcimages.s3.amazonaws.com/event-default.png';
        imgEl.alt = event.title;

        titleEl.forEach(element => {
            element.textContent = event.title;
        });

        dateEl.textContent = date;
        startTimeEl.textContent = startTime;
        endTimeEl.textContent = endTime;
        descriptionEl.innerHTML = event.description;
        calendarEl.textContent = event.calendar.name;
        calendarEl.href = event.calendar.public;
        locationEl.textContent = event.location.name || 'No Location';
        campusEl.textContent = event.campus.name || 'No Campus';
        linkEl.href = event.url.public;

        this.appendChild(content);
    }
}
