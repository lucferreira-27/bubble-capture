import goodreads from "../../services/goodreads";
import jikan from "../../services/jinka";
import animenetwork from "../../services/animenetwork";

const electron = window.require('electron');
const fs = window.require('fs');
const path = window.require('path');
const ipcRenderer = electron.ipcRenderer;


async function searchMangaJikan(query, includeCharacters, mangaInfo) {
  return jikan.searchManga(query, { includeCharacters }).then((searchMangaResult) => {
    Object.assign(mangaInfo, searchMangaResult);
  })
}

async function searchMangaAnimeNetwork(query, mangaInfo) {

  return animenetwork.searchManga(query).then((encyclopediaResult) => {
    mangaInfo.chapterCount = mangaInfo.chapterCount || encyclopediaResult.chapters.length;
  })

}

async function searchMangaGoodreads(query, mangaInfo) {
  return goodreads.searchBook(query).then(({ volumes, totalPages }) => {
    console.log("test")
      mangaInfo.volumeCount = volumes.length;
      mangaInfo.totalPages = totalPages;
  }).catch((err)=>{
    console.log(err)
  })
}

export async function searchManga(query, { includeVolumes, includeCharacters }) {
  const mangaInfo = {};
  const promises = []
  const searchMangaJikanPromise = searchMangaJikan(query, includeCharacters, mangaInfo);
  const searchMangaAnimeNetworkPromise = searchMangaAnimeNetwork(query, mangaInfo);
  promises.push(searchMangaJikanPromise, searchMangaAnimeNetworkPromise)
  if (includeVolumes) {
    const searchMangaGoodreadsPromise = searchMangaGoodreads(query, mangaInfo);
    promises.push(searchMangaGoodreadsPromise)
  }
  
  await Promise.allSettled(promises)

  return mangaInfo;
}


const readDirectory = (dirPath, depth) => {
  const contents = {
    list: []
  };
  const files = fs.readdirSync(dirPath);

  if (depth <= 0) {
    let moreFolders = files.some(file => {
      return fs.statSync(path.join(dirPath, file)).isDirectory();
    });
    contents.moreFolders = moreFolders;
    return contents;
  }

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stats = fs.statSync(fullPath);

    if (stats.isFile()) {
      contents.list.push({ type: 'file', path: fullPath });
    }

    if (stats.isDirectory()) {
      contents.list.push({ type: 'directory', path: fullPath, children: readDirectory(fullPath, depth - 1) });
    }
  }

  return contents;
};

export const findFolder = async (maxDepth = 3) => { // Set default maxDepth to 3
  const folderPath = await ipcRenderer.invoke('open-directory-dialog');

  if (!folderPath) {
    console.log('No folder selected');
    return;
  }

  console.log('Selected folder:', folderPath);

  try {
    const folderContents = readDirectory(folderPath, maxDepth);
    console.log('Folder contents:', folderContents);
    return folderContents;
  } catch (err) {
    console.error('Error reading folder or getting file stats:', err);
  }
};