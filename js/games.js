
const games = [
    {
        id: "snake",
        name: "Snake",
        description: "Le célèbre jeu du serpent.",
        image: "games/snake/cover.png",
        path: "games/snake/index.html"
    }
];

// Nombre maximum de jeux affichés par section
const MAX_GAMES = 6;


// Récupérer les jeux récemment joués
function getRecentlyPlayed() {
    const history = JSON.parse(
        localStorage.getItem("gc-recent-games") || "[]"
    );

    return history
        .map(id => games.find(game => game.id === id))
        .filter(game => game !== undefined)
        .slice(0, MAX_GAMES);
}


// Récupérer les jeux favoris
function getFavoriteGames() {
    const favorites = JSON.parse(
        localStorage.getItem("gc-favorite-games") || "[]"
    );

    return games
        .filter(game => favorites.includes(game.id))
        .slice(0, MAX_GAMES);
}


// Récupérer des jeux aléatoires
function getRandomGames(excludedIds = []) {
    const availableGames = games.filter(
        game => !excludedIds.includes(game.id)
    );

    // Mélange aléatoire
    const shuffled = [...availableGames].sort(
        () => Math.random() - 0.5
    );

    return shuffled.slice(0, MAX_GAMES);
}


// Enregistrer un jeu comme récemment joué
function registerGamePlayed(gameId) {
    if (!games.some(game => game.id === gameId)) {
        return;
    }

    let history = JSON.parse(
        localStorage.getItem("gc-recent-games") || "[]"
    );

    // Éviter les doublons
    history = history.filter(id => id !== gameId);

    // Ajouter le jeu en première position
    history.unshift(gameId);

    // Garder les 20 derniers jeux
    history = history.slice(0, 20);

    localStorage.setItem(
        "gc-recent-games",
        JSON.stringify(history)
    );
}


// Ajouter ou retirer un favori
function toggleFavorite(gameId) {
    if (!games.some(game => game.id === gameId)) {
        return;
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
