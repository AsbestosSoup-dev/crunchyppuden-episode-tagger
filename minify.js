
const { exec } = require('child_process');
const fs = require('fs');

// Function to minify the JavaScript file
function minifyScript() {
    const inputFile = process.argv[2];
    if (!inputFile) {
        console.error("Please specify a JavaScript file to minify.");
        process.exit(1);
    }

    exec(`terser ${inputFile} -c -m`, (minifyError, minifiedCode, minifyStderr) => {
        if (minifyError) {
            console.error("Error minifying file:", minifyError);
            process.exit(1);
        }
        
        // Add the bookmarklet prefix
        const bookmarkletCode = `javascript:(function(){${minifiedCode}})();`;
        
        console.log("Minified bookmarklet code:");
        console.log(bookmarkletCode);
    });
}

// Check if terser is installed, if not, install it
exec('terser -v', (error, stdout, stderr) => {
    if (error) {
        console.log("Terser is not installed. Installing...");
        exec('npm install terser -g', (installError, installStdout, installStderr) => {
            if (installError) {
                console.error("Failed to install Terser:", installError);
                process.exit(1);
            }
            console.log("Terser installed successfully.");
            minifyScript();
        });
    } else {
        console.log("Terser is already installed.");
        minifyScript();
    }
});
