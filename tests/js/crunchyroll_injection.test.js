// crunchyroll_injection.test.js
const { JSDOM } = require('jsdom');

// Setup DOM before loading the module
let dom;
beforeAll(() => {
    dom = new JSDOM(`<!DOCTYPE html><html lang="en"><body><a class="show-title-link">Naruto Shippuden</a><h1>E23 - Episode Title</h1></body></html>`);
    global.document = dom.window.document;
    global.window = dom.window;
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve([{ episodeNumber: 23, type: "Canon" }]),
        })
    );
});

afterAll(() => {
    delete global.document;
    delete global.window;
    delete global.fetch;
});

const {
    isNarutoShippudenPage,
    fetchEpisodeData,
    getEpisodeTitleElement,
    getEpisodeNumber,
    updateTitleAndPage
} = require('../../crunchyroll_injection'); // Adjust path if necessary

// Tests
test('isNarutoShippudenPage detects Naruto Shippuden page', () => {
    expect(isNarutoShippudenPage()).toBe(true);
});

test('fetchEpisodeData handles fetch call correctly', async () => {
    const data = await fetchEpisodeData();
    expect(data).toEqual([{ episodeNumber: 23, type: "Canon" }]);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/episodes.json');
});

test('getEpisodeTitleElement finds episode title element', () => {
    const element = getEpisodeTitleElement();
    expect(element).not.toBeNull();
    expect(element.textContent).toBe("E23 - Episode Title");
});

test('getEpisodeNumber extracts episode number correctly', () => {
    const episodeNumber = getEpisodeNumber();
    expect(episodeNumber).toBe(23);
});

test('updateTitleAndPage updates the title and adds tag', () => {
    const episodeData = [{ episodeNumber: 23, type: "Canon" }];
    updateTitleAndPage(episodeData);

    expect(document.title).toContain("Canon");
    const typeTag = document.querySelector("#episode-type-tag");
    expect(typeTag).not.toBeNull();
    expect(typeTag.textContent).toBe("Canon");
});
