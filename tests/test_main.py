import json
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
print(sys.path)

import pytest

from main import app


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_server_starts_and_serves_data(client):
    # Attempt to fetch the JSON data
    response = client.get('/episodes.json')
    assert response.status_code == 200, "Expected status code 200"
    assert response.is_json, "Expected response to be JSON"


def test_episodes_json_exists_and_has_content():
    # Ensure the JSON file exists and is not empty
    assert os.path.exists('episodes.json'), "episodes.json file should exist"
    with open('episodes.json') as f:
        data = json.load(f)
        assert len(data) > 0, "episodes.json should contain episode data"
        assert 'episodeNumber' in data[0], "Episode data should include 'episodeNumber'"


def test_episode_data_structure():
    with open('episodes.json') as f:
        data = json.load(f)
        required_fields = {'episodeNumber', 'type'}
        for episode in data:
            assert required_fields.issubset(episode.keys()), "Each episode should contain required fields"
