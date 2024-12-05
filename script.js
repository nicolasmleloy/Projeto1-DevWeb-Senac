const input = document.getElementsByClassName("nome-personagem")[0];
const botao = document.getElementsByClassName("botao-submit")[0];
const mensagemVerificacao = document.getElementsByClassName(
    "mensagem-verificacao"
)[0];
const primeiroPersonagem = document.getElementById("primeiro-personagem");

const personagemUser = "Hulk";

async function encontraPersonagem() {
    try {
        var personagem = await fetch(
            `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${personagemUser}&ts=1&apikey=e4f36d5e9afff590f757f223a9ce6278&hash=f560c06bdacf8b44a597a7928e159ae5`
        );
        personagem = await personagem.json();
        var h2 = primeiroPersonagem.childNodes[1];
        var img = primeiroPersonagem.childNodes[3];
        var h3 = primeiroPersonagem.childNodes[5];

        let personagemEncontrado = personagem.data.results;
        h2.innerHTML = personagemEncontrado[0].name;
        img.src =
            `${personagemEncontrado[0].thumbnail.path}.` +
            `${personagemEncontrado[0].thumbnail.extension}`;
        h3.innerHTML = personagemEncontrado[0].description;

        for (let i = 0; i < personagemEncontrado.length; i++) {
            console.log(personagemEncontrado[i]);
        }
    } catch (error) {
        console.log(error);
    }
}

encontraPersonagem();

// botao.addEventListener("click", () => {
//     personagemExiste(input.value);
// });
