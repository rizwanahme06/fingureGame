document.addEventListener('DOMContentLoaded', () => {
    let countdownEl = document.getElementById('countdown');
    let playerSection = document.querySelector('.player');
    let selectedImage = null;
    // let startButton = document.getElementsByClassName('.start-btn')
    let startBtn = document.getElementById('start-btn');
    let images = ['./img/rock.png', './img/paper.png', './img/scissors.png'];

    document.querySelector('#start-btn').addEventListener('click', startGame);
    document.querySelectorAll('.robot img').forEach(img => {
        img.addEventListener('click', (e) => {
            alert('You cannot select the robots choice!');
            e.preventDefault();
        });
    });

    function enableImageSelection() {
        document.querySelectorAll('.player img').forEach(img => {
            img.addEventListener('click', (e) => {
                selectedImage = e.target.src;
                document.querySelectorAll('.player img').forEach(i => i.classList.remove('selected'));
                e.target.classList.add('selected');
            });
        });
    }

    function startGame() {
        startBtn.style.display = 'none'; // Hide start button when clicked
        countdownEl.textContent = '5'; 
        let counter = 5;

        enableImageSelection(); 

        let countdown = setInterval(() => {
            counter--;
            countdownEl.textContent = counter;
            
            if (counter <= 0) {
                clearInterval(countdown);
                countdownEl.style.fontFamily = 'cursive',
                countdownEl.style.fontSize = '25px'
                countdownEl.textContent = ''; 
                determineWinner();
                startBtn.style.display = 'block'; // Hide start button when clicked

            }
        }, 1000);
    }

    function determineWinner() {
        if (!selectedImage) {
            alert('You did not select an image in time! Robot wins by default.');
            return;
        }

        const randomImg = Math.floor(Math.random() * images.length);
        const robotChoice = images[randomImg];

        showChoices(selectedImage, robotChoice);
        let result = decideWinner(selectedImage, robotChoice);
        
        setTimeout(() => alert(result), 500);
    }

    function showChoices(playerChoice, robotChoice) {
        let resultContainer = document.querySelector('.result');
        if (resultContainer) resultContainer.remove(); 

        resultContainer = document.createElement('section');
        resultContainer.className = 'result';

        resultContainer.innerHTML = `
            <h3>Results:</h3>
            <div class="choice">
                <p><strong>You:</strong></p>
                <img src="${playerChoice}" alt="Player Choice">
            </div>
            <div class="choice">
                <p><strong>Robot:</strong></p>
                <img src="${robotChoice}" alt="Robot Choice">
            </div>
        `;

        document.body.appendChild(resultContainer);
    }

    function decideWinner(playerChoice, robotChoice) {
        let player = playerChoice.split('/').pop().split('.')[0];
        let robot = robotChoice.split('/').pop().split('.')[0];

        if (player === robot) return "It's a tie!";
        if ((player === 'rock' && robot === 'scissors') ||
            (player === 'paper' && robot === 'rock') ||
            (player === 'scissors' && robot === 'paper')) {
            return 'You win!';
        }
        return 'Robot wins!';
    }
});
