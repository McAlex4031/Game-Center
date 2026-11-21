
// ========================================
// GAME CENTER - CATALOGUE DES JEUX
// ========================================

const games = [
    {
        id: "cube-rush",
        name: "Cube Rush",
        description: "Un jeu de course et d'obstacles.",
        image: "games/cube-rush/cover.png",
        path: "games/cube-rush/index.html"
    }

    // Ajoute les prochains jeux ici
];

const MAX_GAMES = 6;


// ========================================
// HISTORIQUE DES JEUX
// ========================================

function getRecentlyPlayed() {
    const history = JSON.parse(
        localStorage.getItem("gc-recent-games") || "[]"
    );

    return history
        .map(id => games.find(game => game.id === id))
        .filter(game => game !== undefined)
        .slice(0, MAX_GAMES);
}


// ========================================
// FAVORIS
// ========================================

function getFavoriteGames() {
    const favorites = JSON.parse(
        localStorage.getItem("gc-favorite-games") || "[]"
    );

    return games
        .filter(game => favorites.includes(game.id))
        .slice(0, MAX_GAMES);
}


function toggleFavorite(gameId) {
    if (!games.some(game => game.id === gameId)) {
        return false;
    }

    let favorites = JSON.parse(
        localStorage.getItem("gc-favorite-games") || "[]"
    );

    if (favorites.includes(gameId)) {
        favorites = favorites.filter(id => id !== gameId);
    } else {
        favorites.push(gameId);
    }

    localStorage.setItem(
        "gc-favorite-games",
        JSON.stringify(favorites)
    );

    return favorites.includes(gameId);
}


// ========================================
// JEUX ALEATOIRES
// ========================================

function getRandomGames(excludedIds = []) {
    const availableGames = games.filter(
        game => !excludedIds.includes(game.id)
    );

    const shuffled = [...availableGames].sort(
        () => Math.random() - 0.5
    );

    return shuffled.slice(0, MAX_GAMES);
}


// ========================================
// ENREGISTREMENT D'UNE PARTIE
// ========================================

function registerGamePlayed(gameId) {
    if (!games.some(game => game.id === gameId)) {
        return;
    }

    let history = JSON.parse(
        localStorage.getItem("gc-recent-games") || "[]"
    );

    history = history.filter(id => id !== gameId);

    history.unshift(gameId);

    history = history.slice(0, 20);

    localStorage.setItem(
        "gc-recent-games",
        JSON.stringify(history)
    );
}


// ========================================
// DETECTION AUTOMATIQUE DU JEU
// ========================================

function autoRegisterGame() {

    const path = window.location.pathname;

    const match = path.match(/\/games\/([^/]+)\//);

    if (match) {
        const gameId = match[1];

        registerGamePlayed(gameId);
    }
}


// ========================================
// INITIALISATION
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    autoRegisterGame
);
