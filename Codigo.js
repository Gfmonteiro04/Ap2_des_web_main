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
    const container = document.createElement('div');
    const titulo = document.createElement('h3');
    const imagem = document.createElement('img');

    const { id, altura, nome_completo, nascimento, tipo, nome, imagem: imgSrc } = atleta;

    container.classList.add('card');

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

    console.log(findstuf('nome_completo'));
    console.log(localStorage.getItem('id'));
    console.log(JSON.parse(localStorage.getItem('dados')).altura);

    window.location = `jogadores.html?id=${artigo.dataset.id}&nome_completo=${artigo.dataset.nome_completo}`;
};

const findstuf = (key) => {
    const documento = document.cookie.split("; ");
    const buscasplit = documento.find((e) => e.startsWith(key));
    return buscasplit.split("=")[1];
};

const data = async (caminho) => {
    const resposta = await fetch(caminho);
    const info = await resposta.json();
    return info;
};

const remove = () => {
    jogadoresContainer.innerHTML = '';
};


const filtrarJogadores = async (tipo) => {
    remove();


    const apimangeli = endpoints[tipo.toLowerCase()] || endpoints.all;

    try {
        const entrada = await data(apimangeli);

        for (const atleta of entrada) {
            preencheJogador(atleta);
        }

    } catch (error) {
        console.error('Ops algo de errado não esta certo:', error);
    } finally {
        ocultarCarregando();
    }
};
