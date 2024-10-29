let horas = 0;
let minutos = 0;
let segundos = 0;
let intervalo = null;

document.getElementById('start').addEventListener('click', () => {
    if (!intervalo) {
        minutos = parseInt(document.getElementById('minutos-input').value) || 0;
        horas = Math.floor(minutos / 60);
        minutos = minutos % 60;
        
        intervalo = setInterval(() => {
            if (horas === 0 && minutos === 0 && segundos === 0) {
                clearInterval(intervalo);
                intervalo = null;
                mostrarAlertaTempo();
                return;
            }
            if (segundos === 0) {
                if (minutos > 0) {
                    minutos--;
                    segundos = 59;
                } else if (horas > 0) {
                    horas--;
                    minutos = 59;
                    segundos = 59;
                }
            } else {
                segundos--;
            }
            atualizarDisplay();
        }, 1000);
    }
});

document.getElementById('pause').addEventListener('click', () => {
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
    }
});

document.getElementById('reset').addEventListener('click', () => {
    horas = 0;
    minutos = 0;
    segundos = 0;
    document.getElementById('minutos-input').value = "";
    atualizarDisplay();
    ocultarAlertaTempo();
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
    }
});

function atualizarDisplay() {
    document.getElementById('horas').innerText = String(horas).padStart(2, '0');
    document.getElementById('minutos').innerText = String(minutos).padStart(2, '0');
    document.getElementById('segundos').innerText = String(segundos).padStart(2, '0');
}

function mostrarAlertaTempo() {
    const alerta = document.getElementById('alerta-tempo');
    alerta.style.display = "block";

    // Após 20 segundos, oculta o alerta
    setTimeout(() => {
        alerta.style.display = "none";
    }, 20000); // 20000 ms = 20 segundos
}

function ocultarAlertaTempo() {
    document.getElementById('alerta-tempo').style.display = "none";
}

// Mensagem em Tempo Real
document.getElementById('enviar-mensagem').addEventListener('click', () => {
    const mensagem = document.getElementById('mensagem-input').value;
    document.getElementById('mensagem-exibida').innerText = mensagem;
});
