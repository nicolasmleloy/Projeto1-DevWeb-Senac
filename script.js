const input = document.querySelector(".pesquisa input");
const botao = document.querySelector(".pesquisa button");
const mensagemVerificacao = document.getElementsByClassName(
  "mensagem-verificacao"
)[0];
const primeiroPersonagem = document.getElementById("primeiro-personagem");
const body = document.getElementsByTagName("body")[0];
const botoes = document.querySelectorAll(".estilo-botoes");
const outrosPersonagensContainer = document.getElementById(
  "outros-personagens-container"
);
const mensagem = document.getElementsByClassName("mensagem")[0];

function inserirDados(personagem) {
  const personagemEncontrado = personagem.data.results;
  mensagem.className = "mensagem";

  if (personagemEncontrado.length != 0) {
    for (let i = 0; i < personagemEncontrado.length; i++) {
      const card = document.createElement("div");
      card.className = "outros-personagens";

      const outroPersH2 = document.createElement("h2");
      const outroPersImg = document.createElement("img");
      const outroPersH3 = document.createElement("h3");

      outroPersH2.textContent = personagemEncontrado[i].name;
      outroPersImg.src = `${personagemEncontrado[i].thumbnail.path}.${personagemEncontrado[i].thumbnail.extension}`;
      outroPersH3.textContent =
        personagemEncontrado[i].description || "No description available.";

      const botoes = document.createElement("div");
      botoes.className = "estilo-botoes";

      const comicsButton = document.createElement("a");
      comicsButton.href = "carrossel-comics.html";
      comicsButton.textContent = "Ver comics";

      const seriesButton = document.createElement("a");
      seriesButton.href = "carrossel-series.html";
      seriesButton.textContent = "Ver series";

      const filmesButton = document.createElement("a");
      filmesButton.href = "carrossel-filmes.html";
      filmesButton.textContent = "Ver filmes";

      botoes.appendChild(comicsButton);
      botoes.appendChild(seriesButton);
      botoes.appendChild(filmesButton);

      card.appendChild(outroPersH2);
      card.appendChild(outroPersImg);
      card.appendChild(outroPersH3);
      card.appendChild(botoes);

      if (i === 0) {
        const h2 = primeiroPersonagem.childNodes[1];
        const img = primeiroPersonagem.childNodes[3];
        const h3 = primeiroPersonagem.childNodes[5];
        const principalBotoes =
          primeiroPersonagem.querySelector(".estilo-botoes");

        h2.textContent = personagemEncontrado[i].name;
        img.src = outroPersImg.src;
        h3.textContent = outroPersH3.textContent;

        principalBotoes.style.display = "flex";
        primeiroPersonagem.style.display = "flex";
      } else {
        outrosPersonagensContainer.appendChild(card);
      }
    }
  } else {
    mensagem.className = ".mensagem erro";
  }
}

function rolaPraBaixo() {
  window.scroll({
    top: 700,
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
    for (let index = 0; index < botoes.length; index++) {
      botoes[index].style.display = "flex";
    }
  } catch (error) {
    console.log(error);
  }
}

botao.addEventListener("click", () => {
  encontraPersonagem();
});
