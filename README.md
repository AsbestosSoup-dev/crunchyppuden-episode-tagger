
# Naruto Shippuden Episode Tagger

A project that dynamically tags Naruto Shippuden episodes on Crunchyroll with their episode type (Canon, Mixed Canon/Filler, Filler) based on data fetched from a local JSON file. The project includes a Python script to scrape episode types, a local server to serve the data, and a JavaScript bookmarklet to update the Crunchyroll UI with episode information.

## Table of Contents
  * [Description](#description)
  * [Requirements](#requirements)
  * [Setup](#setup)
    * [1. Clone the Repository](#1-clone-the-repository)
    * [2. Install Python Dependencies](#2-install-python-dependencies)
    * [3. Run the Python Script to Generate `episodes.json`](#3-run-the-python-script-to-generate-episodesjson)
    * [4. Create the Bookmarklet (optional)](#4-create-the-bookmarklet-optional)
  * [Usage](#usage)
    * [Running the Python Script](#running-the-python-script)
    * [Using the Bookmarklet](#using-the-bookmarklet)
    * [Minifying the Bookmarklet Script](#minifying-the-bookmarklet-script)
  * [Optional Customizations](#optional-customizations)
  * [Troubleshooting](#troubleshooting)
  * [License](#license)

## Description
This project enables Crunchyroll users to see the type of each Naruto Shippuden episode (e.g., Canon, Filler) directly on the episode's page. It fetches episode data from a locally hosted `episodes.json` file, which is created by scraping data from a filler guide website.

The JavaScript bookmarklet dynamically updates the episode title and adds an episode type tag, allowing users to identify whether an episode is Canon, Mixed Canon/Filler, or Filler at a glance.

## Requirements

- **Python 3.x**
- **Flask** and **Flask-CORS**: To serve the JSON data with CORS enabled.
- **JavaScript-enabled browser**: Chrome, Firefox, Edge, etc.

## Setup

### 1. Clone the Repository
```bash
git clone https://github.com/AsbestosSoup-dev/crunchyppuden-episode-tagger.git
cd crunchyppuden-episode-tagger
```

### 2. Install Python Dependencies
Make sure to set up a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

Install Flask, Flask-CORS, Requests, BeautifulSoup4:
```bash
pip install flask flask-cors requests beautifulsoup4
```

### 3. Run the Python Script to Generate `episodes.json`
The Python script will scrape episode information and create `episodes.json`.

```bash
python main.py
```

This will:
- Scrape episode type data from an online filler guide.
- Start a local Flask server at `http://localhost:8000` to serve `episodes.json`.

_Note_: You can stop the server after the episode data has been fetched by pressing `Ctrl+C`.

### 4. Create the Bookmarklet (optional)

To use the episode tagging feature, create a bookmarklet with the following steps:

1. **Minify the `crunchyroll_injection.js` script** (see [Minifying the Bookmarklet Script](#minifying-the-bookmarklet-script) below).
2. Create a new bookmark in your browser, name it something like "Naruto Episode Tagger," and paste the minified JavaScript code into the URL field.

## Usage

### Running the Python Script

1. Start the local server by running the Python script:
   ```bash
   python main.py
   ```
   - This will generate the `episodes.json` file and serve it at `http://localhost:8000/episodes.json`.

2. The server will continue to run, listening for requests from the bookmarklet. You can stop the server if you don’t need it running continuously after loading `episodes.json`.

### Using the Bookmarklet

1. Open a Naruto Shippuden episode on Crunchyroll.
2. Click on the "Naruto Episode Tagger" bookmark.
3. The bookmarklet will:
   - Fetch `episodes.json` from the local server.
   - Add the episode type (Canon, Filler, etc.) to the page title and next to the episode title.

### Minifying the Bookmarklet Script

For ease of use, a helper script is provided to minify `crunchyroll_injection.js`. This script, `minify.js`, takes a JavaScript file as input, removes unnecessary spaces and line breaks, and outputs a minified version with a `javascript:` prefix for easy bookmarking.

**Usage:**

1. Place `crunchyroll_injection.js` in the project folder.
2. Run the following command to minify it:
   ```bash
   node minify.js crunchyroll_injection.js   # Note: for help installing Node, check [the Node.org site](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
   ```
3. Copy the minified output from the console and paste it into a new bookmark.

## Optional Customizations

1. **Episode Colors**: Update the colors in the `typeColors` dictionary in the JavaScript code to match your preference.
2. **Generate Minified JavaScript**: After customizing, use `minify.js` to quickly minify and update your bookmarklet.

## Troubleshooting

- **CORS Errors**: Make sure `main.py` uses Flask with CORS enabled to allow the JavaScript bookmarklet to access `episodes.json`.
- **No Episode Tag**: If no tag appears, ensure the script correctly finds the episode number. Use the Developer Console (`F12` or `Cmd+Option+J`) to check for debug logs.
- **The Script Doesn’t Persist**: The bookmarklet needs to be clicked each time you navigate to a new episode. (fixed!)

---

## License
MIT License. Free to use and modify.

