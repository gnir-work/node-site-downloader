[![Build Status](https://travis-ci.com/gnir-work/node-site-downloader.svg?branch=master)](https://travis-ci.com/gnir-work/node-site-downloader)
[![Build Status](https://img.shields.io/david/gnir-work/node-site-downloader.svg)](https://travis-ci.com/gnir-work/node-site-downloader)

## NodeJS based website downloader

Download a website locally without any configuration right from you terminal

__Note:__ The script is based entirely on [node-webiste-scraper](https://github.com/website-scraper/node-website-scraper), an awesome website scraper library :)

## Requirments

* Nodejs version >= 8

## Installation

```bash
npm install -g node-site-downloader
```

## Usage

```bash
website-downloader download DOMAIN START_POINT OUTPUT_FOLDER [VERBOSE] [OUTPUT_FOLDER_SUFFIX] [INCLUDE_IMAGES]
```



## Example

```bash
# Download all of the english jest documentation
website-downloader download -s https://jestjs.io/docs/en/getting-started -d https://jestjs.io/docs/en/ -o jest-docs -v --include-images
```



## Options

* domain - The script will download all of the urls under the specified url.
* start point - The page from which the script should start scraping
* include-images - Should the script download relevant images as well?
* output folder - The folder in which the script should save the downloaded assets,
  __Note:__ The folder should not exist!
* verbose - If flag is present the script will print every url that was downloaded.
* output folder suffix - The suffix that will be added to `OUTPUT_FOLDER`, defaults to: `.site`

