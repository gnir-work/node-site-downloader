// @ts-ignore
const byTypeFilenameGenerator = require('website-scraper/lib/filename-generator/by-type');

/**
 * A plugin for website-scraper that replaces the filename of html files ending with .asp to
 * .html. This helps scrape asp.net based websites.
 */
class AspPlugin {
	apply (registerAction) {
		let occupiedFilenames, subdirectories, defaultFilename;

		registerAction('beforeStart', ({options}) => {
			occupiedFilenames = [];
			subdirectories = options.subdirectories;
			defaultFilename = options.defaultFilename;
        });
        
		registerAction('generateFilename', ({resource}) => {
            const filename = byTypeFilenameGenerator(resource, {subdirectories, defaultFilename}, occupiedFilenames);
            const newFilename = filename.replace(/\.asp$/, ".html")
			occupiedFilenames.push(newFilename);
			return {filename: newFilename};
		});
	}
}

module.exports = AspPlugin;