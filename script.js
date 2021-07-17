var qtndDeCartas = document.querySelector('input#qtndDeCartas');
var inputBotão = document.querySelector('input#jogarButton');
const menu = document.querySelector('section#menu');
const gameBoard = document.querySelector('section#game');
const cabeçalhoPagina = document.querySelector('header.cabecalho');

function validaNumeroCartas(nCartas) {
    let nDePares = nCartas / 2;
    if((nDePares <= 7 && nDePares >= 2 && nCartas % 2 === 0)){
        return true;
    } else {
        return false;
    }

}
function jogar() {
    let aux = Number(qtndDeCartas.value);
    if(validaNumeroCartas(aux)){
        
        game(aux);

    }else{
        window.alert(`Valor inválido, por favor insira um novo valor, que esteja dentro do espaço amostral citado!`);
    }
};
function game(e){

    menu.style.display = 'none';
    gameBoard.style.display = 'block';
    cabeçalhoPagina.style.display ='block';
    // conteudo.innerHTML = ` 
    // <div class="teste">
    //     <ul>
    //         <li>merda</li>
    //     </ul>
    // </div>
    
    
    // `;

}
function hideGame(){
    gameBoard.style.display = 'none';
}