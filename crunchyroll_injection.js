(async function () {
    const typeColors = {
        "Canon": "#4CAF50",
        "Mixed Canon/Filler": "#FFC107",
        "Filler": "#F44336"
    };

    function isNarutoShippudenPage() {
        const seriesLink = document.querySelector("a.show-title-link");
        console.log("Series link found:", seriesLink ? seriesLink.textContent : "None");
        return seriesLink && seriesLink.textContent.includes("Naruto Shippuden");
    }

    async function fetchEpisodeData() {
        try {
            const response = await fetch('http://localhost:8000/episodes.json');
            console.log("Fetching episode data, status:", response.status);
            if (!response.ok) throw new Error(`Failed to load episode data. Status: ${response.status}`);
            const data = await response.json();
            console.log("Episode data fetched:", data);
            return data;
        } catch (error) {
            console.error("Error fetching episodes data:", error);
            return [];
        }
    }

    function getEpisodeTitleElement() {
        return Array.from(document.querySelectorAll("h1"))
            .find(el => /E\d+ - /.test(el.textContent));
    }

    function getEpisodeNumber() {
        const episodeTitleElement = getEpisodeTitleElement();
        console.log("Episode title element:", episodeTitleElement ? episodeTitleElement.textContent : "None");
        if (episodeTitleElement) {
            const match = episodeTitleElement.textContent.match(/E(\d+)/);
            console.log("Episode number match:", match ? match[1] : "No match");
            return match ? parseInt(match[1], 10) : null;
        }
        return null;
    }

    function updateTitleAndPage(episodeData) {
        const episodeNumber = getEpisodeNumber();
        console.log("Current episode number:", episodeNumber);
        if (episodeNumber === null) {
            console.log("No episode number found. Skipping update.");
            return;
        }

        const episode = episodeData.find(ep => ep.episodeNumber === episodeNumber);
        console.log("Episode data found for current episode:", episode);
        if (!episode) {
            console.log("No matching episode data found. Skipping update.");
            return;
        }

        document.title = `${document.title.split(" –")[0]} – ${episode.type}`;
        console.log("Updated document title:", document.title);

        const episodeTitleElement = getEpisodeTitleElement();
        if (episodeTitleElement) {
            let typeTag = document.querySelector("#episode-type-tag");
            if (!typeTag) {
                typeTag = document.createElement("span");
                typeTag.id = "episode-type-tag";
                typeTag.style.marginLeft = "10px";
                typeTag.style.padding = "4px 6px";
                typeTag.style.borderRadius = "4px";
                typeTag.style.color = "#fff";
                typeTag.style.fontWeight = "bold";
                episodeTitleElement.appendChild(typeTag);
            }
            typeTag.textContent = episode.type;
            typeTag.style.backgroundColor = typeColors[episode.type] || "#000";
            console.log("Updated episode type tag:", typeTag.textContent);
        }
    }

    async function main() {
        if (!isNarutoShippudenPage()) {
            console.log("Not a Naruto Shippuden page.");
            return;
        } else {
            console.log("This is a Naruto Shippuden page.");
        }

        // Fetch episode data once
        const episodeData = await fetchEpisodeData();
        updateTitleAndPage(episodeData);

        // Listen for URL changes to handle episode transitions
        let currentURL = window.location.href;
        setInterval(async () => {
            if (window.location.href !== currentURL) {
                console.log("Detected URL change, updating page.");
                currentURL = window.location.href;

                // Update the page title and tag for the new episode
                updateTitleAndPage(episodeData);
            }
        }, 10000);
    }

    main();
})();
