import cheerio from "cheerio";
import axios from "axios";

const baseUrl = "https://www.animenewsnetwork.com/";

const annEncyclopedia = {
  searchManga: async (query) => {
    const url = `${baseUrl}encyclopedia/search/name?only=manga&q=${encodeURIComponent(query)}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const mangaUrl = baseUrl + annEncyclopedia._getMangaUrl($);
    console.log(mangaUrl);
    const mangaResponse = await axios.get(mangaUrl);
    const $$ = cheerio.load(mangaResponse.data);
    const chapters = annEncyclopedia._getChapters($$);
    return {
      mangaUrl,
      chapters,
    };
  },
  _getMangaUrl: ($) => {
    return $('table.results_table tr a').first().attr('href');
  },
  _getChapters: ($$) => {
    const chapterInfo = $$('.encyclopedia .encyclopedia_data_box').text();
    const chaptersMatch = chapterInfo.match(/Number of (?:chapters|pages): (\d+)/);
    return chaptersMatch ? parseInt(chaptersMatch[1], 10) : 0;
  },
};

export default annEncyclopedia;
