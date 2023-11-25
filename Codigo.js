const endpoints = {
    all: "https://botafogo-atletas.mange.li/all",
    masculino: "https://botafogo-atletas.mange.li/masculino",
    feminino: "https://botafogo-atletas.mange.li/feminino"
};

const bodyStyles = document.body.style;
bodyStyles.display = 'flex';
bodyStyles.gap = '.5em';
bodyStyles.flexWrap = 'wrap';

const jogadoresContainer = document.getElementById('jogadores-container');
const carregandoElement = document.getElementById('carregando');

const preencheJogador = (atleta) => {
    const container = document.createElement('article');
    const titulo = document.createElement('h3');
    const imagem = document.createElement('img');

    const { id, altura, nome_completo, nascimento, tipo, nome, imagem: imgSrc } = atleta;

    container.dataset.id = id;
    container.dataset.altura = altura;
    container.dataset.nome_completo = nome_completo;
    container.dataset.nascimento = nascimento;
    container.dataset.tipo = tipo;

    titulo.innerText = nome;
    imagem.src = imgSrc;
    imagem.alt = `Imagem de ${nome}`;

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

    console.log(achaCookie('nome_completo'));
    console.log(localStorage.getItem('id'));
    console.log(JSON.parse(localStorage.getItem('dados')).altura);

    window.location = `jogadores.html?id=${artigo.dataset.id}&nome_completo=${artigo.dataset.nome_completo}`;
};

const achaCookie = (chave) => {
    const listaDeCookies = document.cookie.split("; ");
    const procurado = listaDeCookies.find((e) => e.startsWith(chave));
    return procurado.split("=")[1];
};

const obterDados = async (caminho) => {
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

    const apiUrl = endpoints[tipo.toLowerCase()] || endpoints.all;

    try {
        const entrada = await obterDados(apiUrl);

        for (const atleta of entrada) {
            preencheJogador(atleta);
        }

    } catch (error) {
        console.error('Erro ao carregar jogadores:', error);
    } finally {
        ocultarCarregando();
    }
};
