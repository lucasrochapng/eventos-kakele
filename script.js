document.addEventListener("DOMContentLoaded", function() {
    const events = [
        { id: 'time1', hour: 16, minute: 0 },
        { id: 'time2', hour: 23, minute: 13 }
    ];

    function updateTime(event) {
        // Increase the event time by 20 hours
        event.hour += 20;
        if (event.hour >= 24) {
            event.hour -= 24;
        }
        return event;
    }

    function formatTime(hour, minute) {
        let formattedHour = hour < 10 ? '0' + hour : hour;
        let formattedMinute = minute < 10 ? '0' + minute : minute;
        return `${formattedHour}:${formattedMinute}`;
    }

    function checkEvents() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        events.forEach(event => {
            if (currentHour === event.hour && currentMinute === event.minute) {
                updateTime(event);
                document.getElementById(event.id).textContent = formatTime(event.hour, event.minute);
            }
        });
    }

    // Check events every minute
    setInterval(checkEvents, 60000);

    // Initial check to set the correct times
    checkEvents();
});
