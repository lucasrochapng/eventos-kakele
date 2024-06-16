document.addEventListener('DOMContentLoaded', () => {
    const timerContainers = document.querySelectorAll('.timer-container');
    const alarmAudio = document.getElementById('alarmAudio');

    timerContainers.forEach(container => {
        const timerElement = container.querySelector('.timer');
        const startButton = container.querySelector('.start-timer');
        let initialTime = timerElement.textContent;
        let countdown;

        startButton.addEventListener('click', () => {
            clearInterval(countdown);
            startTimer(timerElement, initialTime);
        });

        function startTimer(timerElement, initialTime) {
            let [hours, minutes, seconds] = initialTime.split(':').map(Number);
            let totalSeconds = hours * 3600 + minutes * 60 + seconds;

            countdown = setInterval(() => {
                if (totalSeconds <= 0) {
                    clearInterval(countdown);
                    timerElement.textContent = initialTime;
                    alarmAudio.play();
                    return;
                }

                totalSeconds--;

                let h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
                let m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
                let s = String(totalSeconds % 60).padStart(2, '0');

                timerElement.textContent = `${h}:${m}:${s}`;
            }, 1000);
        }
    });
});
