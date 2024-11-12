import threading
import time
from flask import Flask, jsonify, json
from flask_cors import CORS

import tag_scrapper

app = Flask(__name__)
CORS(app)


@app.route('/episodes.json')
def get_episodes():
    try:
        with open('episodes.json', 'r') as file:
            data = json.load(file)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "episodes.json file not found"}), 404

def start_local_server():
    thread = threading.Thread(target=lambda: app.run(port=8000, use_reloader=False))
    thread.daemon = True
    thread.start()


def main():
    tag_scrapper.scrape_tags()

    start_local_server()

    try:
        while True:
            time.sleep(0.1)
    except KeyboardInterrupt:
        print("\nShutting down Crunchyroll-Shippuden episode tagging server...")


if __name__ == "__main__":
    main()
