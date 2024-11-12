import json
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from tag_scrapper import parse_episode_range, scrape_tags


def test_parse_single_episode():
    result = parse_episode_range("5")
    assert result == [5], "Should parse single episode"


def test_parse_episode_range():
    result = parse_episode_range("1-3")
    assert result == [1, 2, 3], "Should parse range of episodes"


def test_parse_mixed_episodes_and_ranges():
    result = parse_episode_range("1-3, 5, 7-8")
    assert result == [1, 2, 3, 5, 7, 8], "Should parse a combination of ranges and single episodes"


@pytest.fixture
def sample_html():
    # Provide sample HTML structure that scrape_tags expects
    return """
    <div class='manga_canon'><span class='Episodes'>1-3</span></div>
    <div class='mixed_canon/filler'><span class='Episodes'>4-5</span></div>
    <div class='filler'><span class='Episodes'>6</span></div>
    """


def test_scrape_tags_creates_json_file(requests_mock, sample_html):
    # Mock the external URL with sample HTML content
    url = "https://www.animefillerlist.com/shows/naruto"
    requests_mock.get(url, text=sample_html)

    # Run the function to scrape tags
    scrape_tags()

    # Verify JSON file was created
    with open("episodes.json") as f:
        data = json.load(f)
        assert len(data) == 6, "Should contain data for all episodes parsed"
        assert data[0] == {"episodeNumber": 1, "type": "Canon"}, "First entry should match expected Canon data"
        assert data[-1] == {"episodeNumber": 6, "type": "Filler"}, "Last entry should match expected Filler data"
