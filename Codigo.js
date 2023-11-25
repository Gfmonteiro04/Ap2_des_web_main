const apiEndpoints = {
    all: "https://example-api.com/all",
    male: "https://example-api.com/male",
    female: "https://example-api.com/female"
};

const bodyStyles = document.body.style;
bodyStyles.display = 'flex';
bodyStyles.gap = '.5em';
bodyStyles.flexWrap = 'wrap';

const playersContainer = document.getElementById('players-container');
const loadingElement = document.getElementById('loading');

const fillPlayer = (player) => {
    const container = document.createElement('article');
    const title = document.createElement('h3');
    const image = document.createElement('img');

    const { id, height, full_name, birthdate, type, name, image: imgSrc } = player;

    container.dataset.id = id;
    container.dataset.height = height;
    container.dataset.full_name = full_name;
    container.dataset.birthdate = birthdate;
    container.dataset.type = type;

    title.innerText = name;
    image.src = imgSrc;
    image.alt = `Image of ${name}`;

    container.addEventListener('click', handleClick);

    container.appendChild(title);
    container.appendChild(image);

    playersContainer.appendChild(container);
};

const handleClick = (e) => {
    const article = e.target.closest('article');
    document.cookie = `id=${article.dataset.id}`;
    document.cookie = `full_name=${article.dataset.full_name}`;
    document.cookie = `birthdate=${article.dataset.birthdate}`;
    document.cookie = `height=${article.dataset.height}`;

    const data = {
        id: article.dataset.id,
        full_name: article.dataset.full_name,
        birthdate: article.dataset.birthdate,
        height: article.dataset.height,
        type: article.dataset.type
    };

    localStorage.setItem('original-data', JSON.stringify(article.dataset));
    localStorage.setItem('player-data', JSON.stringify(data));

    console.log(findCookie('full_name'));
    console.log(localStorage.getItem('id'));
    console.log(JSON.parse(localStorage.getItem('player-data')).height);

    window.location = `players.html?id=${article.dataset.id}&full_name=${article.dataset.full_name}`;
};

const addCookie = (key, value) => {
    document.cookie = `${key}=${value}`;
};

const findCookie = (key) => {
    const cookieList = document.cookie.split("; ");
    const found = cookieList.find((entry) => entry.startsWith(key));
    return found.split("=")[1];
};

const fetchData = async (path) => {
    const response = await fetch(path);
    return await response.json();
};

const createElement = (tag, text = null, attributes = {}) => {
    const element = document.createElement(tag);
    if (text) element.innerText = text;
    for (const [attribute, value] of Object.entries(attributes)) {
        element.setAttribute(attribute, value);
    }
    return element;
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

const filterPlayers = async (category) => {
    clearPlayers();
    showLoading();

    const apiUrl = apiEndpoints[category.toLowerCase()] || apiEndpoints.all;

    try {
        const data = await fetchData(apiUrl);

        for (const player of data) {
            fillPlayer(player);
        }

    } catch (error) {
        console.error('Error loading players:', error);
    } finally {
        hideLoading();
    }
};
