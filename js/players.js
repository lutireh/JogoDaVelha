//Recebe o nome dos jogadores
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
let player1Name = player1.value,
  player2Name = player2.value;

player1.addEventListener("keyup", () => {
  player1Name = player1.value;
});
player2.addEventListener("keyup", () => {
  player2Name = player2.value;
});
//Verifica se os nomes estão vazios
const buttom = document.getElementById("button");
buttom.addEventListener("click", (event) => {
  event.preventDefault();
  if (player1Name === "" || player2Name === "") {
    alert("Preencha os dois nomes!");
  } else window.location = "./game.html";
});

function saveNames() {
  //Ao recarregar a pag ele remove os itens
  window.sessionStorage.removeItem("players");

  //cria uma estrutura com os nomes dos jogadores
  const players = {
    player1Name,
    player2Name,
  };

  //Envia para o outro arquivo js a estrutura
  window.sessionStorage.setItem("players", JSON.stringify(players));
}
