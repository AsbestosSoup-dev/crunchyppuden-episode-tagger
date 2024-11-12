
# Naruto Shippuden Episode Tagger

A project that dynamically tags Naruto Shippuden episodes on Crunchyroll with their episode type (Canon, Mixed Canon/Filler, Filler) based on data fetched from a local JSON file. The project includes a Python script to scrape episode types, a local server to serve the data, and a JavaScript bookmarklet to update the Crunchyroll UI with episode information.

## Table of Contents
  * [Description](#description)
  * [Requirements](#requirements)
  * [Setup](#setup)
    * [1. Clone the Repository](#1-clone-the-repository)
    * [2. Install Python Dependencies](#2-install-python-dependencies)
    * [3. Run the Python Script to Generate `episodes.json`](#3-run-the-python-script-to-generate-episodesjson)
    * [4. Using the Script Without Bookmarklet (Optional)](#4-using-the-script-without-bookmarklet-optional)
    * [5. Create the Bookmarklet (Optional)](#5-create-the-bookmarklet-optional)
  * [Usage](#usage)
    * [Running the Python Script](#running-the-python-script)
    * [Using the Bookmarklet](#using-the-bookmarklet)
    * [Minifying the Bookmarklet Script](#minifying-the-bookmarklet-script)
  * [Optional Customizations](#optional-customizations)
  * [Troubleshooting](#troubleshooting)
  * [License](#license)

---

## Description

This project enables Crunchyroll users to see the type of each Naruto Shippuden episode (e.g., Canon, Filler) directly on the episode's page. It fetches episode data from a locally hosted `episodes.json` file, which is created by scraping data from a filler guide website.

The JavaScript bookmarklet dynamically updates the episode title and adds an episode type tag, allowing users to identify whether an episode is Canon, Mixed Canon/Filler, or Filler at a glance.

## Requirements

- **Python 3.x**
- **Flask**, **Flask-CORS**, **Requests**, **BeautifulSoup4**: To serve the JSON data with CORS enabled, handling http requests, and web-scrapping.
- **JavaScript-enabled browser**: Chrome, Firefox, Edge, etc.
- **Node.js (for optional minification)**: Required for running the `minify.js` script.

## Setup

### 1. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/AsbestosSoup-dev/crunchyppuden-episode-tagger.git
cd crunchyppuden-episode-tagger
```

### 2. Install Python Dependencies
Set up a virtual environment and install necessary packages:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scriptsctivate`
```

Install Flask, Flask-CORS, Requests, and BeautifulSoup4:
```bash
pip install flask flask-cors requests beautifulsoup4
```

### 3. Run the Python Script to Generate `episodes.json`
The Python script scrapes episode information and creates `episodes.json` to store the data locally.

```bash
python3 main.py
```

This script will:
- Scrape episode type data from an online filler guide.
- Start a local Flask server at `http://localhost:8000` to serve `episodes.json`.

_Note_: You can stop the server by pressing `Ctrl+C` after the episode data has been fetched.

### 4. Using the Script Without Bookmarklet (Optional)

If you don’t want to create a bookmarklet, you can simply copy the code in `crunchyroll_injection.js` and paste it directly into the browser console while on the Naruto Shippuden episode page. This is suitable for non-persistent, temporary usage.

1. Open a Naruto Shippuden episode on Crunchyroll.
2. Open the Developer Console (`F12` or `Cmd+Option+J`).
3. Paste the entire code from `crunchyroll_injection.js` and press Enter.
4. This will tag the current episode with its type (Canon, Filler, etc.).

### 5. Create the Bookmarklet (Optional)

For a more permanent, easy to access solution, create a bookmarklet:

1. **Minify the `crunchyroll_injection.js` script** (see [Minifying the Bookmarklet Script](#minifying-the-bookmarklet-script)).
2. Create a new bookmark in your browser, name it "Naruto Episode Tagger," and paste the minified JavaScript code into the URL field.

## Usage

### Running the Python Script

1. Start the local server by running the Python script:
   ```bash
   python3 main.py
   ```
   - This generates the `episodes.json` file and serves it at `http://localhost:8000/episodes.json`.

2. The server will continue to run, listening for requests from the bookmarklet. You can stop the server if you don’t need it running continuously after loading `episodes.json`.

### Using the Bookmarklet

1. Open a Naruto Shippuden episode on Crunchyroll.
2. Click on the "Naruto Episode Tagger" bookmark.
3. The bookmarklet will:
   - Fetch `episodes.json` from the local server.
   - Add the episode type (Canon, Filler, etc.) to the page title and next to the episode title.

### Minifying the Bookmarklet Script

To make the `crunchyroll_injection.js` file more compact for bookmarklet use, a helper script, `minify.js`, is provided.

1. **Install Node.js**: If you haven't, [download Node.js here](https://nodejs.org/en/) and follow the instructions for your operating system.
2. Run the following command to minify:
   ```bash
   node minify.js crunchyroll_injection.js
   ```
3. Copy the minified output from the console, which will be prefixed with `javascript:`. This code is ready to paste into a new bookmark.

   Example of minified output:
   ```javascript
   javascript:(async function(){...})();
   ```

## Optional Customizations

1. **Episode Colors**: Update the colors in the `typeColors` dictionary in `crunchyroll_injection.js` to match your preference.
2. **Generate Updated Minified JavaScript**: After customizing the JavaScript code, use `minify.js` to quickly minify it for the bookmarklet.

## Troubleshooting

- **CORS Errors**: Ensure `main.py` uses Flask with CORS enabled to allow the JavaScript bookmarklet to access `episodes.json`.
- **No Episode Tag**: If no tag appears, make sure the script correctly identifies the episode number. Use the Developer Console (`F12` or `Cmd+Option+J`) to check for debug logs.
- **Script Doesn’t Persist**: The bookmarklet needs to be clicked each time you navigate to a new episode. (This has been addressed in recent updates to the script.)

---

## License
MIT License. Free to use and modify.

---
