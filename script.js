var inputBotão = document.querySelector('input#jogarButton');
const cabeçalhoPagina = document.querySelector('header.cabecalho');
var gameBoard = document.querySelector('div#cardBoard');
const acervoCartas = ['C:/Users/LUCAS/Documents/JavaScript/Projeto1Teste/Louro-Jose-Card-Game/images/static_parrot.png','C:/Users/LUCAS/Documents/JavaScript/Projeto1Teste/Louro-Jose-Card-Game/images/404error_parrot.gif',
"C:/Users/LUCAS/Documents/JavaScript/Projeto1Teste/Louro-Jose-Card-Game/images/hypno_parrot_dark.gif","C:/Users/LUCAS/Documents/JavaScript/Projeto1Teste/Louro-Jose-Card-Game/images/john_francis_parrot.png",
'C:\Users/LUCAS/Documents/JavaScript/Projeto1Teste/Louro-Jose-Card-Game/images/parrot_dad.gif','C:/Users/LUCAS/Documents/JavaScript/Projeto1Teste/Louro-Jose-Card-Game/images/feminist_parrot.png',
'C:\Users/LUCAS/Documents/JavaScript/Projeto1Teste/Louro-Jose-Card-Game/images/virusparrot.png'];
let cartasUsadas = [];
let saidaGame = '';
let totalPares = 0;

function validaNumeroCartas(nCartas) {
    let nDePares = nCartas / 2;
    if((nDePares <= 7 && nDePares >= 2) && nCartas % 2 === 0){
        return true;
    } else {
        return false;
    }

}
function jogar() {

    let aux = window.prompt('Com quantas cartas deseja jogar? (4-14)');
    
    while (!validaNumeroCartas(Number(aux))){
        if(!aux) {break;}

        aux = Number(window.prompt(`Valor inválido, por favor insira um novo valor, que esteja dentro do espaço amostral citado! \n
                                        Com quantas cartas deseja jogar? (4-14)`));
    }

    if(aux){
        totalPares = Number(aux)/2;
        game(aux/2);
    } 

};
function game(numeroDePares) {

    inputBotão.style.display = 'none';
    acervoCartas.sort(comparer);

    for(let i = 0; i < numeroDePares; i++) {
        
        cartasUsadas.push(acervoCartas[i]);
        cartasUsadas.push(acervoCartas[i]);

    } 
    cartasUsadas.sort(comparer);
    distribuidorCartas(cartasUsadas,numeroDePares);

}

function distribuidorCartas(cartasUsadas,numeroDePares){


    cartasUsadas.forEach( e => {
        saidaGame += `
            <div id="carta" class="carta" data-value="${e}">
                <img id="frente" src="${e}">
                <img id="verso" src='C:/Users/LUCAS/Documents/JavaScript/Projeto1Teste/Louro-Jose-Card-Game/images/louroJose.jpg'>
            </div>
            `;
    });
    
    gameBoard.innerHTML = saidaGame;
    rotacionaCartas();

}

// adiciona o evento onclick em 'objetos'/elementos da classe carta
function rotacionaCartas(){

    const aux = document.querySelectorAll('.carta');
    aux.forEach( card => card.addEventListener('click',girar));

}

let primeiraCarta,segundaCarta;
let checkLimiteCartas = false;
let contadorDeJogadas = 0;
let paresEncontrados = 0;


function girar() {
    console.log(paresEncontrados);
    console.log(contadorDeJogadas);
    
    if(checkLimiteCartas) return false;
    this.classList.add('girar');
    contadorDeJogadas ++;
    if(!primeiraCarta){
            
        primeiraCarta = this;
        return ;        
    }else {
        segundaCarta = this;
    }
        
    confereParCartas();   
    
}


function confereParCartas(){
        
    let checkPar =  primeiraCarta.dataset.value === segundaCarta.dataset.value;
    if(!checkPar){
        desviraCarta()
    }else{
        if(++paresEncontrados == totalPares){
            window.alert(`Parabéns você ganhou com ${contadorDeJogadas} jogadas!`);
            reiniciar();
        }
        resetCartas(checkPar); 
    }

}

function desviraCarta(){
    checkLimiteCartas = true;
    setTimeout(() => {
        primeiraCarta.classList.remove('girar');
        segundaCarta.classList.remove('girar');
        resetCartas();
    }, 1000);

}

function resetCartas(checkPar = false){
    if(checkPar){
        primeiraCarta.removeEventListener('click',girar);
        segundaCarta.removeEventListener('click',girar);
    }
    [primeiraCarta,segundaCarta,checkLimiteCartas] = [null,null,false];
}
function reiniciar(){

    let restart = window.confirm("Deseja jogar novamente ?");

    restart ? jogar() : rest;

}

function comparer() { 
	return Math.random() - 0.5; 
}