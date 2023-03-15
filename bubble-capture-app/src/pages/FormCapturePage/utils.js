import goodreads from "../../services/goodreads";
import jikan from "../../services/jinka";

export async function searchManga(query, { includeVolumes, includeCharacters }) {
    const searchMangaPromise = jikan.searchManga(query, { includeCharacters });
  
    let searchBookPromise;
    if (includeVolumes) {
      searchBookPromise = goodreads.searchBook(query);
    }
  
    const mangaInfo = await searchMangaPromise;
  
    if (includeVolumes) {
      const { volumes, totalPages } = await searchBookPromise;
      mangaInfo.volumeCount = volumes.length;
      mangaInfo.totalPages = totalPages;
    }
  
    return mangaInfo;
  }
  


export const findFolder = () => {
    console.log("Folder find clicked!");
};
