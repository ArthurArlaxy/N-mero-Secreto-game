let listaNumerosSorteados = [];
let chooseNumber = numeroSecreto();
let tentativas = 0;

function alterarElementosPagina(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function textoInicial(){
    alterarElementosPagina('h1', 'Jogo do número secreto');
    alterarElementosPagina('p', `Escolha um número de 0 a 100`);
}

textoInicial()

function numeroSecreto(){
    let numeroEscolhido  = parseInt(Math.random() * 100 + 1);
    let tamanhoDaLista = listaNumerosSorteados.length

    if (tamanhoDaLista == 2){
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)){
        numeroSecreto();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
};


function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
};

function verificarChute(){

    let chute = document.querySelector('input').value;
    tentativas += 1;

    if (chute == chooseNumber){
        alterarElementosPagina("h1","Parabens você acertou!!!");
        let textoTentativa = tentativas > 1? "tentativas":"tentativa";
        alterarElementosPagina("p",`Você descobriu o número secreto com ${tentativas} ${textoTentativa}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > chooseNumber){
            alterarElementosPagina("p",`O número secreto é menor que ${chute}`);
        } else {
            alterarElementosPagina("p",`O número secreto é maior que ${chute}`);
        };
    limparCampo()
    };
};

function reiniciarJogo(){
    chooseNumber = numeroSecreto();
    tentativas = 0;
    textoInicial()
    limparCampo()
    document.getElementById('reiniciar').setAttribute('disabled', true)
}