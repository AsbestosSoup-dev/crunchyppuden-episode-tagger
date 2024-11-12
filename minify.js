const fs = require('fs');

const inputFile = process.argv[2];
if (!inputFile) {
    console.error("Please specify a JavaScript file to minify.");
    process.exit(1);
}

fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        process.exit(1);
    }

    const minified = data
        .replace(/\s*([{}();,=+<>])\s*/g, '$1')
        .replace(/\s{2,}/g, ' ')
        .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '')
        .replace(/\n/g, '');

    console.log("javascript:" + minified);
});
