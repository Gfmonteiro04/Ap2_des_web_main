const endpointAll = "https://botafogo-atletas.mange.li/all";
const endpointMasculino = "https://botafogo-atletas.mange.li/masculino";
const endpointFeminino = "https://botafogo-atletas.mange.li/feminino";

const pageBody = document.body;
pageBody.style.display = 'flex';
pageBody.style.gap = '.5em';
pageBody.style.flexWrap = 'wrap';

const playersContainer = document.getElementById('jogadores-container');
const loadingElement = document.getElementById('carregando');

const fillPlayerDetails = (player) => {
    const playerContainer = document.createElement('article');
    const title = document.createElement('h3');
    const image = document.createElement('img');

    playerContainer.dataset.id = player.id;
    playerContainer.dataset.height = player.altura;
    playerContainer.dataset.full_name = player.nome_completo;
    playerContainer.dataset.birthdate = player.nascimento;
    playerContainer.dataset.type = player.tipo;

    title.innerText = player.nome;
    image.src = player.imagem;
    image.alt = `Imagem de ${player.nome}`;

    playerContainer.addEventListener('click', handlePlayerClick);

    playerContainer.appendChild(title);
    playerContainer.appendChild(image);

    playersContainer.appendChild(playerContainer);
};

const handlePlayerClick = (e) => {
    const article = e.target.closest('article');

    document.cookie = `id=${article.dataset.id}`;
    document.cookie = `full_name=${article.dataset.full_name}`;
    document.cookie = `birthdate=${article.dataset.birthdate}`;
    document.cookie = `height=${article.dataset.height}`;

    const playerData = {
        id: article.dataset.id,
        full_name: article.dataset.full_name,
        birthdate: article.dataset.birthdate,
        height: article.dataset.height,
        type: article.dataset.type
    };

    localStorage.setItem('original-data', JSON.stringify(article.dataset));
    localStorage.setItem('player-data', JSON.stringify(playerData));

    console.log(findCookie('full_name'));
    console.log(localStorage.getItem('id'));
    console.log(JSON.parse(localStorage.getItem('player-data')).height);

    window.location = `player-details.html?id=${article.dataset.id}&full_name=${article.dataset.full_name}`;
};

const findCookie = (key) => {
    const cookiesList = document.cookie.split("; ");
    const foundCookie = cookiesList.find(
        (e) => e.startsWith(key));
    return foundCookie.split("=")[1];
};

const fetchData = async (path) => {
    const response = await fetch(path);
    const data = await response.json();
    return data;
};

const clearPlayers = () => {
    playersContainer.innerHTML = '';
};

const showLoading = () => {
    loadingElement.style.display = 'block';
};

const hideLoading = () => {
    loadingElement.style.display = 'none';
};

const filterPlayers = async (type) => {
    clearPlayers();
    showLoading();

    let apiUrl = endpointAll;

    if (type === 'MASCULINO') {
        apiUrl = endpointMasculino;
    } else if (type === 'FEMININO') {
        apiUrl = endpointFeminino;
    }

    try {
        const data = await fetchData(apiUrl);

        for (player of data) {
            fillPlayerDetails(player);
        }

    } catch (error) {
        console.error('Erro ao carregar jogadores:', error);
    } finally {
        hideLoading();
    }
};
