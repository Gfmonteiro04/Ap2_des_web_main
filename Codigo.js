const url = "https://botafogo-atletas.mange.li/all";
const urlmasc = "https://botafogo-atletas.mange.li/masculino";
const urlfem = "https://botafogo-atletas.mange.li/feminino";

const body = document.body;
body.style.display = 'flex';
body.style.gap = '.5em';
body.style.flexWrap = 'wrap';

const jogadoresContainer = document.getElementById('jogadores-container');
const carregandoElement = document.getElementById('carregando');

const preenche = (atleta) => {
    const container = document.createElement('article');
    const titulo = document.createElement('h3');
    const imagem = document.createElement('img');

    container.dataset.id = atleta.id;
    container.dataset.altura = atleta.altura;
    container.dataset.nome_completo = atleta.nome_completo;
    container.dataset.nascimento = atleta.nascimento;
    container.dataset.tipo = atleta.tipo;

    titulo.innerText = atleta.nome;
    imagem.src = atleta.imagem;
    imagem.alt = `Imagem de ${atleta.nome}`;

    container.addEventListener('click', handleClick);

    container.appendChild(titulo);
    container.appendChild(imagem);

    jogadoresContainer.appendChild(container);
};

const handleClick = (e) => {
    const artigo = e.target.closest('article');
    document.cookie = `id=${artigo.dataset.id}`;
    document.cookie = `nome_completo=${artigo.dataset.nome_completo}`;
    document.cookie = `nascimento=${artigo.dataset.nascimento}`;
    document.cookie = `altura=${artigo.dataset.altura}`;

    const dados = {
        id: artigo.dataset.id,
        nome_completo: artigo.dataset.nome_completo,
        nascimento: artigo.dataset.nascimento,
        altura: artigo.dataset.altura,
        tipo: artigo.dataset.tipo
    };

    localStorage.setItem('dados-original', JSON.stringify(artigo.dataset));
    localStorage.setItem('dados', JSON.stringify(dados));

    console.log(acha_cookie('nome_completo'));
    console.log(localStorage.getItem('id'));
    console.log(JSON.parse(localStorage.getItem('dados')).altura);

    window.location = `jogadores.html?id=${artigo.dataset.id}&nome_completo=${artigo.dataset.nome_completo}`;
};

const acha_cookie = (chave) => {
    const lista_de_cookies = document.cookie.split("; ");
    const procurado = lista_de_cookies.find(
        (e) => e.startsWith(chave));
    return procurado.split("=")[1];
};

const pegar_coisas = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};

const limparJogadores = () => {
    jogadoresContainer.innerHTML = '';
};

const exibirCarregando = () => {
    carregandoElement.style.display = 'block';
};

const ocultarCarregando = () => {
    carregandoElement.style.display = 'none';
};

const filtrarJogadores = async (tipo) => {
    limparJogadores();
    exibirCarregando();

    let apiUrl = url;

    if (tipo === 'MASCULINO') {
        apiUrl = urlmasc;
    } else if (tipo === 'FEMININO') {
        apiUrl = urlfem;
    }

    try {
        const entrada = await pegar_coisas(apiUrl);

        for (atleta of entrada) {
            preenche(atleta);
        }

    } catch (error) {
        console.error('Erro ao carregar jogadores:', error);
    } finally {
        ocultarCarregando();
    }
};

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
    const container = document.createElement('article');
    const title = document.createElement('h3');
    const image = document.createElement('img');

    container.dataset.id = player.id;
    container.dataset.height = player.altura;
    container.dataset.full_name = player.nome_completo;
    container.dataset.birthdate = player.nascimento;
    container.dataset.type = player.tipo;

    title.innerText = player.nome;
    image.src = player.imagem;
    image.alt = `Imagem de ${player.nome}`;

    container.addEventListener('click', handlePlayerClick);

    container.appendChild(title);
    container.appendChild(image);

    playersContainer.appendChild(container);
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



