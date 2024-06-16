// app.js

document.getElementById('startTimer').addEventListener('click', function() {
    const timeInput = document.getElementById('timeInput').value;
    let timeLeft = parseInt(timeInput, 10);
    const timerDisplay = document.getElementById('timerDisplay');

    if (isNaN(timeLeft) || timeLeft <= 0) {
        alert('Por favor, insira um número válido.');
        return;
    }

    const timerInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showNotification();
        } else {
            timerDisplay.textContent = `Tempo restante: ${timeLeft} segundos`;
            timeLeft--;
        }
    }, 1000);
});

function showNotification() {
    if (Notification.permission === 'granted') {
        new Notification('O tempo acabou!');
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification('O tempo acabou!');
            }
        });
    }
}
