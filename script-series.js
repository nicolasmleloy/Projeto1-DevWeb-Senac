// Captura o parâmetro 'id' da URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Função para encontrar o personagem
async function encontraPersonagem() {
  try {
    // Faz a requisição à API da Marvel
    var personagem = await fetch(
      `http://gateway.marvel.com/v1/public/characters/${id}/series?ts=1&apikey=e4f36d5e9afff590f757f223a9ce6278&hash=f560c06bdacf8b44a597a7928e159ae5`
    );
    
    // Converte a resposta para JSON
    personagem = await personagem.json();
    
    // Acessando a lista de quadrinhos retornada pela API
    const comics = personagem.data.results;
    
    // Criando um array com as URLs das imagens dos quadrinhos
    const imageUrls = comics.map(comic => `${comic.thumbnail.path}.${comic.thumbnail.extension}`);
    
    // Chamando a função para criar o carrossel de imagens
    criarCarrossel(imageUrls);

  } catch (error) {
    console.log('Erro ao buscar personagem:', error);
  }
}

// Função para criar o carrossel com as URLs das imagens
function criarCarrossel(imageUrls) {
  const carouselContainer = document.getElementById('carouselImages');
  

  // Adiciona as imagens ao carrossel
  imageUrls.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.style.width = "100%"; // Faz as imagens se ajustarem ao tamanho do contêiner
    carouselContainer.appendChild(img);
  });

  // Funções de navegação no carrossel
  let currentIndex = 0;

  function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselContainer.style.transition = 'transform 1s ease'; // Define a transição suave
    carouselContainer.style.transform = `translateX(${offset}%)`;
  }

  // Avançar para a próxima imagem
  function nextImage() {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    updateCarousel();
  }

  // Voltar para a imagem anterior
  function prevImage() {
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    updateCarousel();
  }

  // Configura os botões de navegação
  document.getElementById('nextBtn').addEventListener('click', nextImage);
  document.getElementById('prevBtn').addEventListener('click', prevImage);

  // Avançar automaticamente a cada 3 segundos
  setInterval(nextImage, 2000);
}

// Chama a função para encontrar o personagem e iniciar o carrossel
encontraPersonagem();
