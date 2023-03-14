import axios from "axios";

export async function searchManga(query) {

    const getCharacters = async (malId) =>{
        const charactersResponse = await axios.get(`https://api.jikan.moe/v4/manga/${malId}/characters`);
        const characters = charactersResponse.data.data.filter(({character}) => character.images).map(({character}) => {
            return {
                name: character.name,
                picture: character.images.jpg.image_url,
            };
        });
        return characters
    }
    const getVolumes = async (tittle) =>{
        // TODO
    }
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/manga?q=${query}&order_by=members&sort=desc`);
        const manga = response.data.data[0];
        const malId = manga.mal_id
        const title = manga.title;
        const poster = manga.images.jpg.image_url;
        const chapterCount = manga.chapters;
        const volumeCount = manga.volumes;
        const serialization = manga.serializations[0].name;
        const startDate = manga.published.from;
        const endDate = manga.published.to;

        const characters = await getCharacters(malId)
        // const volumes = await getVolumes(title) www.goodreads.com

        return {
            title,
            poster,
            chapterCount,
            volumeCount,
            serialization,
            startDate,
            endDate,
            characters
        };
    } catch (error) {
        console.error("Error searching for manga:", error);
        return null;
    }
}






export const findFolder = () => {
    console.log("Folder find clicked!");
};
