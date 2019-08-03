[![Build Status](https://travis-ci.com/gnir-work/node-site-downloader.svg?branch=master)](https://travis-ci.com/gnir-work/node-site-downloader)
[![Build Status](https://img.shields.io/david/gnir-work/node-site-downloader.svg)](https://travis-ci.com/gnir-work/node-site-downloader)
[![Docker Pulls](https://img.shields.io/docker/pulls/gnird/node-site-downloader)](https://cloud.docker.com/u/gnird/repository/docker/gnird/node-site-downloader)
[![Npm Downloades](https://img.shields.io/npm/dm/node-site-downloader?label=npm%20downloads)](https://www.npmjs.com/package/node-site-downloader    )

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
node-site-downloader download DOMAIN START_POINT OUTPUT_FOLDER [VERBOSE] [OUTPUT_FOLDER_SUFFIX] [INCLUDE_IMAGES]
```



## Example

```bash
# Download all of the english jest documentation
node-site-downloader download -s https://jestjs.io/docs/en/getting-started -d https://jestjs.io/docs/en/ -o jest-docs -v --include-images
```

__For more information please run__
```bash
node-site-downloader --help
node-site-downloader download --help
```

## Docker support
Now you can run the downloader straight from a docker container. This way there is no need to download `nodejs` and install `node-site-downloader`.

Instead please pull the image from [dockerhub](https://cloud.docker.com/u/gnird/repository/docker/gnird/node-site-downloader)
```bash
docker pull gnird/node-site-downloader
``` 
And then run the container with all of the relevant options passed to the script (Please check the options section), except for `--output-folder`.

`--output-folder` isn't passed to the container because the script saves the site inside of the container.

Instead configure a volume from a folder on your
computer to `/data` in the container.
```bash
docker run -v /some/path:/data ...
````

## Docker example
```bash
docker run -v /tmp/mysite:/data gnird/node-site-downloader download -d https://jestjs.io/docs/en/ -s https://jestjs.io/docs/en/getting-started -v 
```
__NOTICE:__ The first `-v` configures the volume for the container and the second `-v` (at the end of the command) is passed to the script in order to make it `verbose`. 

## Options

* domain (-d) - The script will download all of the urls under the specified url.
* start point (-s) - The page from which the script should start scraping
* include-images (--include-images) - Should the script download relevant images as well?
* output folder (--output-folder) - The folder in which the script should save the downloaded assets,
  __Note:__ The folder should not exist!
* verbose (-v) - If flag is present the script will print every url that was downloaded.
* output folder suffix (--output-folder-suffix) - The suffix that will be added to `OUTPUT_FOLDER`, defaults to: `.site`

