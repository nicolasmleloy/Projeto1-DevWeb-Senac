const input = document.querySelector(".pesquisa input");
const botao = document.querySelector(".pesquisa button");
const mensagemVerificacao = document.getElementsByClassName(
  "mensagem-verificacao"
)[0];
const primeiroPersonagem = document.getElementById("primeiro-personagem");
const body = document.getElementsByTagName("body")[0];

function inserirDados(personagem) {
  var h2 = primeiroPersonagem.childNodes[1];
  var img = primeiroPersonagem.childNodes[3];
  var h3 = primeiroPersonagem.childNodes[5];

  var personagemEncontrado = personagem.data.results;
  h2.innerHTML = personagemEncontrado[0].name;
  img.src =
    `${personagemEncontrado[0].thumbnail.path}.` +
    `${personagemEncontrado[0].thumbnail.extension}`;
  h3.innerHTML = personagemEncontrado[0].description;
  primeiroPersonagem.style.display = "flex";
}

function rolaPraBaixo() {
  window.scroll({
    top: 1000,
    behavior: "smooth",
  });
}
async function encontraPersonagem() {
  try {
    var personagem = await fetch(
      `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${input.value}&ts=1&apikey=e4f36d5e9afff590f757f223a9ce6278&hash=f560c06bdacf8b44a597a7928e159ae5`
    );
    personagem = await personagem.json();

    inserirDados(personagem);
    rolaPraBaixo();
  } catch (error) {
    console.log(error);
  }
}

botao.addEventListener("click", () => {
  encontraPersonagem();
  document.createElement("button"); //Criar os cards dos outros relacionados
});
