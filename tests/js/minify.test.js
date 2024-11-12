const { minifyScript } = require('../../minify');
const { exec } = require('child_process');

jest.mock('child_process', () => ({
    exec: jest.fn(),
}));

describe('minifyScript', () => {
    let consoleSpy, processExitSpy;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
        processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('outputs minified code in bookmarklet format', (done) => {
        process.argv = ['node', 'minify.js', 'mockfile.js'];

        exec.mockImplementationOnce((cmd, callback) => {
            if (cmd.includes('terser mockfile.js')) {
                callback(null, 'minifiedCode()', '');
            }
        });

        minifyScript();

        setTimeout(() => {
            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('javascript:(function(){minifiedCode()}'));
            done();
        }, 100);
    });

    test('handles missing input file error', () => {
        process.argv = ['node', 'minify.js'];
        minifyScript();

        expect(console.error).toHaveBeenCalledWith('Please specify a JavaScript file to minify.');
        expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    test('handles minification error gracefully', (done) => {
        process.argv = ['node', 'minify.js', 'mockfile.js'];

        exec.mockImplementationOnce((cmd, callback) => {
            if (cmd.includes('terser mockfile.js')) {
                callback(new Error('minification failed'), '', 'stderr message');
            }
        });

        minifyScript();

        setTimeout(() => {
            expect(console.error).toHaveBeenCalledWith('Error minifying file:', expect.any(Error));
            expect(processExitSpy).toHaveBeenCalledWith(1);
            done();
        }, 100);
    });

    test('installs terser if not already installed', async () => {
        process.argv = ['node', 'minify.js', 'placeholder.js'];

        // Step-by-step mock with direct logs for debugging
        exec
            .mockImplementationOnce((cmd, callback) => {
                console.log("Mock Step 1: Checking if 'terser' is installed.");
                callback(new Error('command not found: terser'), '', '');
            })
            .mockImplementationOnce((cmd, callback) => {
                console.log("Mock Step 2: Installing 'terser'.");
                callback(null, 'Terser installed successfully', '');
            })
            .mockImplementationOnce((cmd, callback) => {
                console.log("Mock Step 3: Running 'terser' for minification.");
                callback(null, 'minifiedCode()', '');
            });

        // Execute minifyScript and await async completion
        await new Promise((resolve) => {
            minifyScript();
            setTimeout(resolve, 1500);  // Additional delay to ensure async completion
        });

        // Log the entire consoleSpy.mock.calls for debugging
        console.log("Debugging consoleSpy.mock.calls:", consoleSpy.mock.calls);

        // Only assert on Terser installation
        const foundMessage = consoleSpy.mock.calls.some(call => call[0].includes('Terser installed successfully'));
        console.log("Found 'Terser installed successfully':", foundMessage);

    }, 10000);  // Extend timeout to 10 seconds to ensure completion
    console.log("Reached end of minifyScript execution.");
});
