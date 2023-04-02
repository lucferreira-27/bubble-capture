import cheerio from "cheerio"
import axios from "axios"

const baseUrl = "https://www.goodreads.com/"

const goodreads = {
    searchBook: async (query) => {
        const url = `${baseUrl}search?q=${query}`;
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const bookUrl = baseUrl + goodreads._getBookUrl($);
        const bookResponse = await axios.get(bookUrl);
        const $$ = cheerio.load(bookResponse.data);
        const seriesUrl = goodreads._getSeriesUrl($$);
        console.log("seriesUrl",seriesUrl)
        const volumes = await goodreads.getListVolumes(seriesUrl);
        const totalPages = goodreads.getTotalPages(volumes);
        return {
            volumes,
            seriesUrl,
            totalPages,
        };
    },
    _getBookUrl: ($) => {
        return $('.bookTitle').eq(0).attr('href');
    },
    _getSeriesUrl: ($$) => {
        return $$('.BookPageTitleSection__title > h3 > a').attr('href');
    },
    getListVolumes: async (seriesUrl) => {
        const allVolumes = [];
        let numberOfPrimaryWorks = null;

        const fetchVolumesFromPage = async (url) => {
            console.log("fetchVolumesFromPage",url)
            const seriesResponse = await axios.get(url);
            const $ = cheerio.load(seriesResponse.data);
            if(!numberOfPrimaryWorks){
               numberOfPrimaryWorks = goodreads._getNumberOfPrimaryWorks($)
            }
            const volumesData = goodreads._extractVolumeData($, numberOfPrimaryWorks);
            allVolumes.push(...volumesData);

            // Check for pagination
            const paginationData = $('[data-react-class="ReactComponents.FullPagePaginationControls"]').attr('data-react-props');
            if (paginationData) {
                const paginationJson = paginationData.replace(/&amp;quot;/g, '"');
                const pagination = JSON.parse(paginationJson);
                const { numWorks, currentPageNumber, perPage } = pagination;

                if (numWorks > currentPageNumber * perPage) {
                    const nextPageUrl = `${seriesUrl}?page=${currentPageNumber + 1}`;
                    await fetchVolumesFromPage(nextPageUrl);
                }
            }
        };

        await fetchVolumesFromPage(seriesUrl);
        return allVolumes;
    },
    _extractVolumeData: ($, numberOfPrimaryWorks) => {
        const allVolumes = [];

        $('[data-react-class="ReactComponents.SeriesList"]').each((index, element) => {
            const volumesDataEncoded = $(element).attr('data-react-props');
            const volumesDataJson = volumesDataEncoded.replace(/&amp;quot;/g, '"');
            const volumesData = JSON.parse(volumesDataJson);

            const volumes = volumesData.series.map(({ book }) => ({
                title: book.title,
                author: book.author.name,
                bookPages: book.numPages || 0,
                isbn: book.isbn,
                rating: book.averagerating,
                imageUrl: book.imageurl,
                description: book.description,
                publishedYear: book.publishedyear,
                toBePublished: book.toBePublished,
            })).filter(volume => !volume.toBePublished);

            allVolumes.push(...volumes);
        });

        return allVolumes.slice(0, numberOfPrimaryWorks);
    },
    _getNumberOfPrimaryWorks: ($$) => {
        const seriesHeaderData = $$(
            '[data-react-class="ReactComponents.SeriesHeader"]'
        ).attr("data-react-props");
        const seriesHeaderJson = seriesHeaderData.replace(/&amp;quot;/g, '"');
        const seriesHeader = JSON.parse(seriesHeaderJson);
        const primaryWorks = parseInt(
            seriesHeader.subtitle.match(/(\d+) primary works/)[1]
        );
        return primaryWorks;
    },

    getTotalPages: (volumes) => {
        return volumes.reduce((acc, vol) => acc + vol.bookPages, 0);
    },
};

export default goodreads;
