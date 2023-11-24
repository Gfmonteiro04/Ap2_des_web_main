document.addEventListener('DOMContentLoaded', function () {
  const criarElemento = (tag, texto) => {
    const elemento = document.createElement(tag);
    elemento.textContent = texto;
    return elemento;
  };

  const criarImagem = (src) => {
    const imagem = document.createElement('img');
    imagem.src = src;
    return imagem;
  };

  const criarParagrafo = (texto) => {
    return criarElemento('p', texto);
  };

  const criarLinkVoltar = () => {
    const linkVoltar = document.createElement('a');
    linkVoltar.className = 'div_voltar';
    linkVoltar.innerHTML = 'Voltar';
    linkVoltar.href = './index.html';
    linkVoltar.style.color = '#ffffff';
    linkVoltar.style.fontSize = '23pt';
    linkVoltar.style.textDecoration = 'none';
    return linkVoltar;
  };

  const descricaoJogadorElement = document.getElementById('foto_descrição');
  descricaoJogadorElement.style.textAlign = 'center';
  descricaoJogadorElement.style.textTransform = 'uppercase';
  descricaoJogadorElement.style.fontWeight = 'bolder';
  descricaoJogadorElement.style.fontFamily = 'Arial, Helvetica, sans-serif';

  descricaoJogadorElement.appendChild(criarImagem(localStorage.getItem('imagem')));
  descricaoJogadorElement.appendChild(criarElemento('p', localStorage.getItem('nome')));
  descricaoJogadorElement.appendChild(criarElemento('p', localStorage.getItem('posicao')));

  const detalhesDescricaoElement = document.getElementById('detalhes_descrição');
  detalhesDescricaoElement.appendChild(criarElemento('p', localStorage.getItem('descricao')));
  detalhesDescricaoElement.appendChild(criarElemento('p', 'Nome completo: ' + localStorage.getItem('nome_completo')));
  detalhesDescricaoElement.appendChild(criarElemento('p', 'Nascimento: ' + localStorage.getItem('nascimento')));
  detalhesDescricaoElement.appendChild(criarElemento('p', 'Altura: ' + localStorage.getItem('altura')));

  const tudoElement = document.getElementById('descrição_jogador');
  tudoElement.appendChild(descricaoJogadorElement);
  tudoElement.appendChild(detalhesDescricaoElement);

  document.body.appendChild(tudoElement);
  document.body.appendChild(criarLinkVoltar());
});
