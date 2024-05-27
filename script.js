document.addEventListener("DOMContentLoaded", function() {
    const events = [
        { id: 'time1', hour: 6, minute: 47 },
        { id: 'time2', hour: 7, minute: 25 },
        { id: 'time3', hour: 7, minute: 26 },
        { id: 'time4', hour: 8, minute: 3 },
        { id: 'time5', hour: 8, minute: 18}
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
