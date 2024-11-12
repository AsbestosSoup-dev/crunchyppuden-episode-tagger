#!/bin/bash

VIOLET='\033[0;35m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

source venv/bin/activate
python3 main.py &

MAIN_PID=$!

sleep 1
printf '\n'

MINIFY_OUTPUT=$(node minify.js crunchyroll_injection.js)
echo -e "${VIOLET}${MINIFY_OUTPUT}${NC}"
printf '\n'
echo -e "${YELLOW}Enter minified script in console, or use via bookmark/bookmarklet${NC}"
printf '\n'

wait $MAIN_PID
