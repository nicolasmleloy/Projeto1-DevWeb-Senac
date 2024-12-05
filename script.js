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
        var h2 = primeiroPersonagem.childNodes[1]; //Pega o html do card do primeiro personagem
        var img = primeiroPersonagem.childNodes[3]; //Pega o html do card do primeiro personagem
        var h3 = primeiroPersonagem.childNodes[5]; //Pega o html do card do primeiro personagem

        let personagemEncontrado = personagem.data.results;
        h2.innerHTML = personagemEncontrado[0].name; //Insere o conteudo da API nas tags
        img.src =
            `${personagemEncontrado[0].thumbnail.path}.` +
            `${personagemEncontrado[0].thumbnail.extension}`; //Insere o conteudo da API nas tags
        h3.innerHTML = personagemEncontrado[0].description; //Insere o conteudo da API nas tags

        if (personagem.data.results.length > 1) {
            var outrosPersonagens = document.createElement("div"); // Tentando criar os outros personagem para inserir os dados
            outrosPersonagens.innerHTML = `<div id="primeiro-personagem"> 
            <h2 class="nome-personagem"></h2>
            <img class="img-personagem" src="" alt="" />
            <h3 class="descricao-personagem"></h3>
            </div>`;
        }

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
