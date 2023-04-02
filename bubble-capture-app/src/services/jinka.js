const axios = require("axios");

const jikan = {
  getCharacters: async (malId) => {
    const charactersResponse = await axios.get(
      `https://api.jikan.moe/v4/manga/${malId}/characters`
    );
    const characters = charactersResponse.data.data
      .filter(({ character }) => character.images)
      .map(({ character }) => {
        return {
          name: character.name,
          picture: character.images.jpg.image_url,
        };
      });
    return characters;
  },
  searchManga: async (query,{includeCharacters}) => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/manga?q=${query}&order_by=members&sort=desc`
      );

      const manga = response.data.data[0];
      const mangaInfo = {
        title: manga.title,
        poster: manga.images.jpg.image_url,
        chapterCount: manga.chapters,
        volumeCount: manga.volumes,
        serialization: manga.serializations[0].name,
        startDate: manga.published.from,
        endDate: manga.published.to,
        malId:manga.mal_id
      }
      if(includeCharacters){
        const characters = await jikan.getCharacters(mangaInfo.malId);
        mangaInfo.characters = characters
      }
      return mangaInfo
    } catch (error) {
      console.error("Error searching for manga:", error);
      return null;
    }
  },
};

export default jikan