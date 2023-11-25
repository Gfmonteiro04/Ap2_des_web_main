document.addEventListener("DOMContentLoaded", function () {
    const detalhesAtleta = document.getElementById("detalhesAtleta");
    const imagemAtleta = document.getElementById("imagemAtleta");
    const nomeAtleta = document.getElementById("nomeAtleta");
    const posicaoAtleta = document.getElementById("posicaoAtleta");
    const alturaAtleta = document.getElementById("alturaAtleta");
    const nascimentoAtleta = document.getElementById("nascimentoAtleta");
    const historiaAtleta = document.getElementById("historiaAtleta");

    const params = new URLSearchParams(window.location.search);
    const atletaId = params.get('id');

    const buscarDetalhesAtletaPorId = (id) => {
        if (id > 60) {
            detalhesAtleta.innerHTML = "<p id='error'>Erro:ID não localizado. Não é possível obter detalhes do atleta.</p>";
            return;
        }

        fetch(`https://botafogo-atletas.mange.li/${id}`)
            .then(response => response.json())
            .then(atleta => {
                preencherDetalhesAtleta(atleta);
            })
            .catch(error => {
                console.error('Erro ao buscar detalhes do atleta:', error);
                detalhesAtleta.innerHTML = "<p>Erro ao buscar detalhes do atleta.</p>";
            });
    };

    const preencherDetalhesAtleta = (atleta) => {
        imagemAtleta.src = atleta.imagem;
        nomeAtleta.textContent = `Nome: ${atleta.nome}`;
        historiaAtleta.textContent = `História: ${atleta.descricao}`;
        posicaoAtleta.textContent = `Posição: ${atleta.posicao}`;
        alturaAtleta.textContent = `Altura: ${atleta.altura}`;
        nascimentoAtleta.textContent = `Nascimento: ${atleta.nascimento}`;
    };

    buscarDetalhesAtletaPorId(atletaId);
});
