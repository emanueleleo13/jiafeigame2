const jiafei = document.getElementById('jiafei');
const gameContainer = document.getElementById('game-container');
const temuFactory = document.getElementById('temu-factory');

const gameContainerRect = gameContainer.getBoundingClientRect();
const temuFactoryRect = temuFactory.getBoundingClientRect();

let jiafeiPosition = { x: 275, y: 550 };
let gameOver = false;

// Create products
function createProduct() {
    const product = document.createElement('div');
    product.classList.add('product');
    product.style.top = '0px';
    product.style.left = Math.random() * (gameContainerRect.width - 40) + 'px';
    gameContainer.appendChild(product);
    moveProduct(product);
}

function moveProduct(product) {
    const interval = setInterval(() => {
        if (gameOver) {
            clearInterval(interval);
            return;
        }

        const productRect = product.getBoundingClientRect();
        if (productRect.top > gameContainerRect.height) {
            product.remove();
            clearInterval(interval);
        } else {
            product.style.top = productRect.top + 5 + 'px';
        }

        const jiafeiRect = jiafei.getBoundingClientRect();
        if (
            productRect.left < jiafeiRect.right &&
            productRect.right > jiafeiRect.left &&
            productRect.top < jiafeiRect.bottom &&
            productRect.bottom > jiafeiRect.top
        ) {
            alert('Game Over! Jiafei was hit by a product.');
            gameOver = true;
            clearInterval(interval);
        }
    }, 100);
}

function moveJiafei(x, y) {
    if (gameOver) return;

    jiafeiPosition.x = Math.max(0, Math.min(gameContainerRect.width - 50, jiafeiPosition.x + x));
    jiafeiPosition.y = Math.max(0, Math.min(gameContainerRect.height - 50, jiafeiPosition.y + y));

    jiafei.style.left = jiafeiPosition.x + 'px';
    jiafei.style.top = jiafeiPosition.y + 'px';

    if (jiafeiPosition.y <= 0 && jiafeiPosition.x > temuFactoryRect.left - gameContainerRect.left && jiafeiPosition.x < temuFactoryRect.right - gameContainerRect.left) {
        alert('Congratulations! Jiafei reached the Temu factory!');
        gameOver = true;
    }
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
            moveJiafei(0, -10);
            break;
        case 'ArrowDown':
        case 's':
            moveJiafei(0, 10);
            break;
        case 'ArrowLeft':
        case 'a':
            moveJiafei(-10, 0);
            break;
        case 'ArrowRight':
        case 'd':
            moveJiafei(10, 0);
            break;
    }
});

// Create products at intervals
setInterval(() => {
    if (!gameOver) createProduct();
}, 1000);