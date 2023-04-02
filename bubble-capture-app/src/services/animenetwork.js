import cheerio from "cheerio";
import axios from "axios";

const baseUrl = "https://www.animenewsnetwork.com/";

const annEncyclopedia = {
  searchManga: async (query) => {
    const url = `${baseUrl}encyclopedia/search/name?only=manga&q=${encodeURIComponent(query)}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const mangaUrl = baseUrl + annEncyclopedia._getMangaUrl($);
    const mangaResponse = await axios.get(mangaUrl);
    const $$ = cheerio.load(mangaResponse.data);
    const mangaChaptersUrl = baseUrl + annEncyclopedia._getChaptersPage($$)
    const mangaChaptersPageResponse = await axios.get(mangaChaptersUrl);
    const $$$ = cheerio.load(mangaChaptersPageResponse.data);

    const chapters = await annEncyclopedia._getChapters($$$,mangaChaptersUrl)
    // const totalVolumes = chapters.filter((chapter) => chapter.extraInfo && chapter.extraInfo.includes("start of Volume")).length
    return {
      mangaUrl,
      chapters,
    };
  },

  _fetchChapterTitles: async (subpages) => {
    const fetchChapterPage = async (url) => {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const chapterRows = $('table.episode-list tbody tr');

      const chapters = chapterRows.map((index, element) => {
        const engTitle = $(element).find('td:nth-child(4) > div').first().text().trim();
        const originalTitle = $(element).find('td:nth-child(4) > div.j > div:nth-child(2)').first().text().trim();
        const jpTitle = $(element).find('td:nth-child(4) > div.j > div:nth-child(1)').first().text().trim();
        const extraInfo = $(element).find('td:nth-child(4) > div.r > div').last().text().trim();

        return {
          originalTitle,
          engTitle,
          jpTitle,
          extraInfo: extraInfo || null
        };
      }).get();
      return chapters;
    };

    const chapterPromises = subpages.map(subpageUrl => fetchChapterPage(subpageUrl));
    const chaptersArrays = await Promise.all(chapterPromises);

    const chapters = chaptersArrays.flat();
    return chapters;
  },

  _getMangaUrl: ($) => {
    const mangaLinks = $("#content-zone > div > a")
      .map((index, element) => {
        return $(element).attr("href");
      })
      .get()
      .filter((link) => link.startsWith("/encyclopedia/manga.php?"));

    return mangaLinks.length > 0 ? mangaLinks[0] : null;
  },

  _getChaptersPage: ($$) => {

    const mangaChaptersUrl = $$('#infotype-34 > a').first().attr("href");
    return mangaChaptersUrl
  
  },
  _getChapters: async ($$,mangaUrl) => {
    const subpages = $$('#infotype-34 > p:nth-child(2) > a').map((index, element) => {
      return `${baseUrl}encyclopedia/manga.php${$$(element).attr('href')}`;
    }).get();
    const chaptersPages = [mangaUrl,...subpages]
    const chapters = await annEncyclopedia._fetchChapterTitles(chaptersPages);

    return chapters;
  },
};

export default annEncyclopedia;
