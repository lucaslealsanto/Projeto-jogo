// Definindo as variáveis do jogo
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const speedElement = document.getElementById('speed');
const nitroButton = document.getElementById('nitroButton');

let car = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 80,
    speed: 0,
    maxSpeed: 15,
    nitroSpeed: 25,
    color: 'red',
    movingLeft: false,
    movingRight: false,
    isNitroActive: false,
    moveLeft: false,
    moveRight: false
};

let keys = {};

// Configuração do canvas
canvas.width = 800;
canvas.height = 600;

// Função para desenhar o carro e o painel de velocidade
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa a tela

    // Desenha o carro
    ctx.fillStyle = car.color;
    ctx.fillRect(car.x, car.y, car.width, car.height);

    // Desenha o painel de velocidade
    ctx.fillStyle = 'white';
    ctx.font = '18px Arial';
    ctx.fillText(`Velocidade: ${car.speed} km/h`, 10, 30);
}

// Função para atualizar a lógica do movimento
function update() {
    // Controla o movimento do carro
    if (keys['ArrowLeft']) {
        car.x -= 5;
    }
    if (keys['ArrowRight']) {
        car.x += 5;
    }

    // Controla o nitro
    if (car.isNitroActive) {
        if (car.speed < car.nitroSpeed) {
            car.speed += 1;
        }
    } else if (car.speed < car.maxSpeed) {
        car.speed += 0.1; // Aceleração gradual
    }

    if (car.x < 0) car.x = 0;
    if (car.x > canvas.width - car.width) car.x = canvas.width - car.width;

    // Atualiza o painel de velocidade
    speedElement.textContent = Math.floor(car.speed);

    // Desenha o jogo novamente
    drawGame();

    // Solicita o próximo frame
    requestAnimationFrame(update);
}

// Função para lidar com o teclado
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Função de nitro ativado
nitroButton.addEventListener('click', () => {
    car.isNitroActive = true;
    setTimeout(() => {
        car.isNitroActive = false; // Desativa o nitro após 5 segundos
    }, 5000);
});

// Inicia o jogo
update();
