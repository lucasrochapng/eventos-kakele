document.addEventListener("DOMContentLoaded", function() {
    const events = [
        { id: 'time1', hour: 18, minute: 47 },
        { id: 'time2', hour: 19, minute: 14 },
        { id: 'time3', hour: 19, minute: 15 },
        { id: 'time4', hour: 20, minute: 3 },
        { id: 'time5', hour: 20, minute: 18 }
    ];

    function loadEvents() {
        const lastUpdate = localStorage.getItem('lastUpdate');
        const now = new Date();

        if (lastUpdate) {
            const lastUpdateDate = new Date(lastUpdate);
            const elapsedHours = Math.floor((now - lastUpdateDate) / 3600000); // 3600000 ms = 1 hour

            events.forEach(event => {
                const storedTime = localStorage.getItem(event.id);
                if (storedTime) {
                    const [hour, minute] = storedTime.split(':').map(Number);
                    event.hour = hour;
                    event.minute = minute;
                    console.log(`Loaded ${event.id}: ${formatTime(event.hour, event.minute)}`);

                    if (elapsedHours > 0) {
                        // Update event time based on elapsed hours
                        const cycles = Math.floor(elapsedHours / 20);
                        event.hour += 20 * cycles;
                        if (event.hour >= 24) {
                            event.hour %= 24;
                        }
                        saveEvent(event);
                        console.log(`Updated ${event.id} after time elapsed: ${formatTime(event.hour, event.minute)}`);
                    }
                }
                document.getElementById(event.id).textContent = formatTime(event.hour, event.minute);
            });
        } else {
            events.forEach(event => {
                document.getElementById(event.id).textContent = formatTime(event.hour, event.minute);
            });
        }

        localStorage.setItem('lastUpdate', now.toISOString());
    }

    function saveEvent(event) {
        localStorage.setItem(event.id, formatTime(event.hour, event.minute));
        console.log(`Saved ${event.id}: ${formatTime(event.hour, event.minute)}`);
    }

    function updateTime(event) {
        event.hour += 20;
        if (event.hour >= 24) {
            event.hour -= 24;
        }
        saveEvent(event);
        console.log(`Updated ${event.id} to ${formatTime(event.hour, event.minute)}`);
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

    // Load events from localStorage on initial load
    loadEvents();

    // Check events every minute
    setInterval(checkEvents, 60000);
});
