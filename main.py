import threading
import time
from flask import Flask, jsonify, json
from flask_cors import CORS

import tag_scrapper

app = Flask(__name__)
CORS(app)

first_request_served = threading.Event()

@app.route('/episodes.json')
def get_episodes():
    global first_request_served
    try:
        with open('episodes.json', 'r') as file:
            data = json.load(file)
        first_request_served.set()
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "episodes.json file not found"}), 404

def start_local_server():
    thread = threading.Thread(target=lambda: app.run(port=8000, use_reloader=False))
    thread.daemon = True
    thread.start()
    return thread

def main():
    tag_scrapper.scrape_tags()

    server_thread = start_local_server()
    print("Serving at http://localhost:8000")

    timeout_seconds = 120
    start_time = time.time()

    try:
        while not first_request_served.is_set():
            if time.time() - start_time > timeout_seconds:
                print("\nTimeout reached. Shutting down the server...")
                break
            time.sleep(0.1)
        if first_request_served.is_set():
            print("\nFirst request served. Shutting down Crunchyroll-Shippuden episode tagging server...")
        else:
            print("Server shut down due to timeout without serving any requests.")
    except KeyboardInterrupt:
        print("\nShutting down Crunchyroll-Shippuden episode tagging server manually...")


if __name__ == "__main__":
    main()
