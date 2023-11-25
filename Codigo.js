document.addEventListener('DOMContentLoaded', function () {
  const createHTMLElement = (tag, text) => {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
  };

  const createImageElement = (src) => {
    const image = document.createElement('img');
    image.src = src;
    return image;
  };

  const createParagraphElement = (text) => {
    return createHTMLElement('p', text);
  };

  const createBackLink = () => {
    const backLink = document.createElement('a');
    backLink.className = 'back-link';
    backLink.innerHTML = 'Voltar';
    backLink.href = './index.html';
    backLink.style.color = '#ffffff';
    backLink.style.fontSize = '23pt';
    backLink.style.textDecoration = 'none';
    return backLink;
  };

  const playerDescriptionElement = document.getElementById('player_description');
  playerDescriptionElement.style.textAlign = 'center';
  playerDescriptionElement.style.textTransform = 'uppercase';
  playerDescriptionElement.style.fontWeight = 'bolder';
  playerDescriptionElement.style.fontFamily = 'Arial, Helvetica, sans-serif';

  playerDescriptionElement.appendChild(createImageElement(localStorage.getItem('image')));
  playerDescriptionElement.appendChild(createHTMLElement('p', localStorage.getItem('name')));
  playerDescriptionElement.appendChild(createHTMLElement('p', localStorage.getItem('position')));

  const detailsDescriptionElement = document.getElementById('details_description');
  detailsDescriptionElement.appendChild(createHTMLElement('p', localStorage.getItem('description')));
  detailsDescriptionElement.appendChild(createHTMLElement('p', 'Nome completo: ' + localStorage.getItem('full_name')));
  detailsDescriptionElement.appendChild(createHTMLElement('p', 'Nascimento: ' + localStorage.getItem('birthdate')));
  detailsDescriptionElement.appendChild(createHTMLElement('p', 'Altura: ' + localStorage.getItem('height')));

  const allElement = document.getElementById('player_description_container');
  allElement.appendChild(playerDescriptionElement);
  allElement.appendChild(detailsDescriptionElement);

  document.body.appendChild(allElement);
  document.body.appendChild(createBackLink());
});
