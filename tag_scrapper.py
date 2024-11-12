import json

import requests
from bs4 import BeautifulSoup


def parse_episode_range(range_str: str) -> list[int]:
    episodes = []

    for part in range_str.split(", "):
        if "-" in part:
            start, end = map(int, part.split("-"))
            episodes.extend(range(start, end + 1))
        else:
            episodes.append(int(part))
    return episodes


def scrape_tags():
    url = "https://www.animefillerlist.com/shows/naruto"

    try:
        response = requests.get(url)
        response.raise_for_status()
        print(f"Successfully fetched {url}")
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch {url}:", e)
        return

    soup = BeautifulSoup(response.text, "html.parser")

    canon_selector = "div[class='manga_canon'] span.Episodes"
    mixed_selector = "div[class='mixed_canon/filler'] span.Episodes"
    filler_selector = "div[class='filler'] span.Episodes"

    episode_data = []

    canon_text = soup.select_one(canon_selector).text.strip()
    canon_episodes = parse_episode_range(canon_text)
    for ep in canon_episodes:
        episode_data.append(
            {
                "episodeNumber": ep,
                "type": "Canon",
            }
        )

    mixed_text = soup.select_one(mixed_selector).text.strip()
    mixed_episodes = parse_episode_range(mixed_text)
    for ep in mixed_episodes:
        episode_data.append(
            {
                "episodeNumber": ep,
                "type": "Mixed Canon/Filler"
            }
        )

    filler_text = soup.select_one(filler_selector).text.strip()
    filler_episodes = parse_episode_range(filler_text)
    for ep in filler_episodes:
        episode_data.append(
            {
                "episodeNumber": ep,
                "type": "Filler"
            }
        )

    episode_data = sorted(episode_data, key=lambda x: x["episodeNumber"])

    with open("episodes.json", "w") as f:
        json.dump(episode_data, f, indent=4)

    print("Episode data has been saved to episodes.json")
