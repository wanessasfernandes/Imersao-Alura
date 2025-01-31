const searchInput = document.getElementById("search-input");
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlist");

function requestApi(searchTerm) {
    fetch(`http://localhost:3000/artists?name_like=${encodeURIComponent(searchTerm)}`)
        .then((response) => response.json())
        .then((result) => displayResults(result))
        .catch((error) => console.error("Erro ao buscar artistas:", error));
}

function displayResults(result) {
    hidePlaylists();
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    if (result.length === 0) {
        resultArtist.classList.add("hidden");
        return;
    }

    const searchTerm = searchInput.value.trim().toLowerCase();
    const matchingArtist = result.find(artist => artist.name.toLowerCase().startsWith(searchTerm));

    if (!matchingArtist) {
        resultArtist.classList.add("hidden");
        return;
    }

    artistName.innerText = matchingArtist.name;
    artistImage.src = matchingArtist.urlImg;
    resultArtist.classList.remove("hidden");
}

function hidePlaylists() {
    resultPlaylist.classList.add("hidden");
}

searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === "") {
        resultArtist.classList.add("hidden");
        resultPlaylist.classList.remove("hidden");
        return;
    }

    requestApi(searchTerm);
});
