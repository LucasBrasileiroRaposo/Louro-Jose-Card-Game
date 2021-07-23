const inputBotão = document.querySelector('input#jogarButton');
const cabecalho = document.querySelector('.logo');
const cabecalho2 = document.querySelector('.logo2');
const imagensExtras = document.querySelector('div.imagensExtras');
const mesaDoJogo = document.querySelector('div#cardBoard');
const acervoCartas = ['images/static_parrot.png','images/404error_parrot.gif',
"images/hypno_parrot_dark.gif","images/john_francis_parrot.png",
'images/parrot_dad.gif','images/feminist_parrot.png',
'images/virusparrot.png'];
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

    let entradaNumeroCartas = window.prompt('Com quantas cartas deseja jogar? (4-14)');
    
    while (!validaNumeroCartas(Number(entradaNumeroCartas))){
        if(!entradaNumeroCartas) {break;}

        entradaNumeroCartas = window.prompt(`Valor inválido, por favor insira um novo valor, que esteja dentro do espaço amostral citado! \n
                                        Com quantas cartas deseja jogar? (4-14)`);
    }

    if(entradaNumeroCartas){
        totalPares = Number(entradaNumeroCartas)/2;
        resetacronometro ()
        startCronometro();
        game(entradaNumeroCartas/2);
    } 

};
function game(numeroDePares) {

    cabecalho.style.display = 'none';
    cabecalho2.style.display = 'block';
    inputBotão.style.display = 'none';
    imagensExtras.style.display = 'none';
 
    acervoCartas.sort(comparer);

    acervoCartas.forEach( (_, i) => {
      
        if(i < numeroDePares){

            cartasUsadas.push(acervoCartas[i]);
            cartasUsadas.push(acervoCartas[i]);
        }
        
    });

    cartasUsadas.sort(comparer);
    distribuidorCartas(cartasUsadas);

}

function distribuidorCartas(cartasUsadas){


    cartasUsadas.forEach( (e,i) => {
        saidaGame += `
            <div id="carta${i}" class="carta" data-value="${e}">
                <img id="frente" draggable="false" src="${e}">
                <img id="verso" draggable="false" src='images/louroJose.jpg'>
            </div>
            `;
    });
    
    mesaDoJogo.innerHTML = saidaGame;
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
    
    if(checkLimiteCartas) return false;
    this.classList.add('girar');
    contadorDeJogadas ++;
    if(!primeiraCarta){
            
        primeiraCarta = this;
        return ;        
    }else if(primeiraCarta && primeiraCarta.id !== this.id){
        segundaCarta = this;
    }
        
    confereParCartas();   
    
}


function confereParCartas(){
    
    let checkPar =  primeiraCarta.dataset.value === segundaCarta.dataset.value;
    if(!checkPar){
        desviraCarta()
    }else{
        if(++paresEncontrados === totalPares){
            window.alert(`Parabéns você ganhou com um tempo de: ${(horas > 0 ? (horas < 10 ? '0'+horas :horas) +' hora(s), ':"")}${(minutos > 0 ? (minutos < 10 ? '0'+minutos :minutos) + ' minuto(s) e ':'')}${(segundos<10 ? '0'+segundos :segundos) + ' segundo(s)'} e com ${contadorDeJogadas} jogadas!`);
            congelaCronometro();
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
    const logo2 = document.querySelector(".nomeDoJogo");
    logo2.addEventListener('click',voltarPaginaInicial);

    if(restart){
        cartasUsadas = []; 
        paresEncontrados = 0;
        contadorDeJogadas =0;
        totalPares = 0;
        saidaGame = '';
        jogar();
    }

}

function comparer() { 
	return Math.random() - 0.5; 
}

let horas = 0;
let minutos = 0;
let segundos = 0;
let auxCronometro;

function startCronometro(){
   
    auxCronometro = setInterval(() => { cronometro(); }, 1000);
    
}

function cronometro(){
    segundos++;
    if(segundos === 60) {
        segundos = 0;
        minutos++;

        if(minutos === 60) {
            minutos = 0;
            horas++;
        }
    }
    const saidaCronometro = document.querySelector('#timer');
    saidaCronometro.innerHTML = `<h2>Tempo: ${(horas < 10 ? '0'+horas :horas)}:${(minutos < 10 ? '0'+minutos :minutos)}:${segundos<10 ? '0'+segundos :segundos}</h2>`;
}

function congelaCronometro(){
    clearInterval(auxCronometro);
}

function resetacronometro () {
    horas = 0;
    minutos = 0;
    segundos = 0;
}
function voltarPaginaInicial(){
    cartasUsadas = []; 
    paresEncontrados = 0;
    contadorDeJogadas =0;
    totalPares = 0;
    saidaGame = '';
    mesaDoJogo.innerHTML = "";
    cabecalho.style.display = 'block';
    cabecalho2.style.display = 'none';
    inputBotão.style.display = 'block';
    inputBotão.style.position = 'absolute';
    inputBotão.style.left = '900px';
    imagensExtras.style.display = 'block';
    
}