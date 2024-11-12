const {exec} = require('child_process');
require('fs');

const isDebug = process.env.DEBUG === 'true';

function logDebug(message) {
    if (isDebug) {
        console.log(message);
    }
}

function minifyScript() {
    const inputFile = process.argv[2];
    if (!inputFile) {
        console.error("Please specify a JavaScript file to minify.");
        process.exit(1);
    }

    logDebug("Debug: Starting minification process.");

    exec(`terser ${inputFile} -c -m`, (minifyError, minifiedCode) => {
        if (minifyError) {
            console.error("Error minifying file:", minifyError);
            process.exit(1);
        }

        logDebug("Debug: Minification successful. Preparing bookmarklet.");

        const bookmarkletCode = `javascript:(function(){${minifiedCode}})();`;

        console.log("Minified bookmarklet code:");
        console.log(bookmarkletCode);
    });
}

logDebug("Debug: Checking if terser is installed.");

exec('terser --version', (error) => {
    if (error) {
        console.log("Terser is not installed. Installing...");
        exec('npm install terser -g', (installError) => {
            if (installError) {
                console.error("Failed to install Terser:", installError);
                process.exit(1);
            }
            console.log("Terser installed successfully.");
            minifyScript();
        });
    } else {
        logDebug("Terser is already installed.");
        minifyScript();
    }
});

module.exports = {minifyScript};
