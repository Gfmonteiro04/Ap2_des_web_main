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
    const { id, altura, nome_completo, nascimento, tipo, nome, imagem: imgSrc } = atleta;

    const container = criarElemento('article');
    const titulo = criarElemento('h3', nome);
    const imagem = criarElemento('img', null, { src: imgSrc, alt: `Imagem de ${nome}` });

    container.dataset.id = id;
    container.dataset.altura = altura;
    container.dataset.nome_completo = nome_completo;
    container.dataset.nascimento = nascimento;
    container.dataset.tipo = tipo;

    container.addEventListener('click', () => handleClick(container));

    container.appendChild(titulo);
    container.appendChild(imagem);

    jogadoresContainer.appendChild(container);
};

const handleClick = (artigo) => {
    const { id, nome_completo, nascimento, altura } = artigo.dataset;

    const dados = {
        id,
        nome_completo,
        nascimento,
        altura,
        tipo: artigo.dataset.tipo
    };

    adicionarCookie('id', id);
    adicionarCookie('nome_completo', nome_completo);
    adicionarCookie('nascimento', nascimento);
    adicionarCookie('altura', altura);

    localStorage.setItem('dados-original', JSON.stringify(artigo.dataset));
    localStorage.setItem('dados', JSON.stringify(dados));

    console.log(achaCookie('nome_completo'));
    console.log(localStorage.getItem('id'));
    console.log(JSON.parse(localStorage.getItem('dados')).altura);

    redirecionarPagina(`jogadores.html?id=${id}&nome_completo=${nome_completo}`);
};

const adicionarCookie = (chave, valor) => {
    document.cookie = `${chave}=${valor}`;
};

const achaCookie = (chave) => {
    const listaDeCookies = document.cookie.split("; ");
    const procurado = listaDeCookies.find((e) => e.startsWith(chave));
    return procurado.split("=")[1];
};

const obterDados = async (caminho) => {
    const resposta = await fetch(caminho);
    return await resposta.json();
};

const criarElemento = (tag, texto = null, atributos = {}) => {
    const elemento = document.createElement(tag);
    if (texto) elemento.innerText = texto;
    for (const [atributo, valor] of Object.entries(atributos)) {
        elemento.setAttribute(atributo, valor);
    }
    return elemento;
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


