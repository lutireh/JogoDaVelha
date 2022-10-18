//Variável para verificar a vez de cada jogador
let turn = 0;
// Variável para imagem que o jogador escolher
let player1ImagePath = "assets/dog.png",
  player2ImagePath = "assets/cat.png";
//Mapamento do campo do jogo
const gameMap = ["", "", "", "", "", "", "", "", ""];
//Jogador atual
let currentPlayer = "";
//Condições para ganhar o jogo
let winCondition = [
  //Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  //Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  //Transversal
  [0, 4, 8],
  [2, 4, 6],
];
//Criar elementos H2 e H# na div Nomes
const divNomes = document.getElementById("nomes");
divNomes.appendChild(document.createElement("h2"));
divNomes.appendChild(document.createElement("h3"));

//Função para validar os movimentos do jogo
function validateGame() {
  let roundWon = false;
  //Repetição para verificar as condições de vitória
  for (let i = 0; i < 8; i++) {
    const win = winCondition[i];
    //vai pegar cada item das linhas das condições de vitória e separar para verificação
    let c1 = gameMap[win[0]];
    let c2 = gameMap[win[1]];
    let c3 = gameMap[win[2]];
    //Se alguma das células de condição de vitória estiver vazia, continua o jogo
    if (c1 === "" || c2 === "" || c3 === "") {
      continue;
    }
    //Caso as células estiverem preenchidas com o mesmo valor, ou seja Dog ou Cat, ele acaba o jogo
    if (c1 === c2 && c1 === c3 && c2 === c3) {
      roundWon = true;
      break;
    }
  }
  //Testa se a rodada foi ganha
  if (roundWon) {
    //Recebe o jogador vencedor
    const message = `Jogador ${currentPlayer} venceu !!`;
    //Remove o click dos botões
    removeEventListener();
    //Envia a mensagem para o h3
    document.querySelector("div#nomes>h3").innerHTML = message;
    return roundWon;
  }

  //Verifica se todos os espaços estão preenchidos
  let roundDraw = !gameMap.includes("");
  //Se o roundDraw estiver preenchido
  if (roundDraw) {
    //Envia a mensagem de empate
    const message = "Empate";
    //Remove o click dos botões
    removeEventListener();
    //Envia a mensagem para o h3
    document.querySelector("div#nomes>h3").innerHTML = message;
    return roundDraw;
  }
}

//Função para realizar uma jogada
function makePlay(event) {
  //Cell recebe a td que foi clicada
  cell = event.currentTarget;
  //Se for rodada par = imagem de Dog
  //Se for rodada impar = imagem do Cat
  const imagePath = turn % 2 == 0 ? player1ImagePath : player2ImagePath;
  //Atribui quem é o jogador corrente
  currentPlayer = turn % 2 == 0 ? player1Name : player2Name;
  // Atribui quem é o próximo jogador
  //Aqui vai +1 pro turno, pq o texto é para o próximo Jogador
  const message = `Vez do Jogador ${
    (turn + 1) % 2 == 0 ? player1Name : player2Name
  }`;
  document.querySelector("div#nomes>h3").innerHTML = message;
  //Envia para o mapeamento do campo qual foi a jogada
  gameMap[parseInt(event.composedPath()[0].id)] = currentPlayer;
  validateGame();
  //Criando o elemento Image
  let image = document.createElement("img");
  //Setando qual vai ser a imagem
  image.setAttribute("src", imagePath);
  //Setando o id da imagem
  image.setAttribute("id", `${currentPlayer}:${turn}`);
  //Verifica se já tem uma imagem na célula
  if (!cell.hasChildNodes()) {
    //Caso não tem, insere a imagem dentro do nó
    cell.appendChild(image);
    //Adiciona mais um no turno para trocar a vez
    turn += 1;
  }
}

//Recebendo os campos de JSON de forma desestruturada
const { player1Name, player2Name } = JSON.parse(
  //Pegando o item dentro do storage de sessão com a chave Players
  window.sessionStorage.getItem("players")
);

//Enviando para o H2 os nomes dos jogadores
document.querySelector(
  "div#nomes>h2"
).innerHTML = `${player1Name} X ${player2Name}`;

//Atribui a primeira jogada ao primeiro jogador
const message = `Vez do Jogador ${player1Name}`;
document.querySelector("div#nomes>h3").innerHTML = message;

//Habilitando o click nos TDs
for (let i = 0; i < 9; i++) {
  const cell = document.getElementById(i);
  cell.addEventListener("click", makePlay, false);
}

//Função para quando alguém ganha, travar novos cliques no tabuleiro
function removeEventListener() {
  for (let i = 0; i < 9; i++) {
    const cell = document.getElementById(i);
    cell.removeEventListener("click", makePlay);
  }
}

//Função de resetar a página para jogar novamente sem precisar logar
function playAgain() {
  window.location.reload();
}
