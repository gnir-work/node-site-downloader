const ALLOWED_IMAGE_SUFFIXES = [".png", ".svg", ".jpg"];
const ALLOWED_SUFFIXES = [".js", ".css", "woff2", "woff", "ttf"];
const BLACK_LIST = ["https://github"];
const MAX_DEPTH = 50;
const INCLUDE_IMAGES = false;

module.exports = {
    ALLOWED_SUFFIXES,
    BLACK_LIST,
    MAX_DEPTH,
    ALLOWED_IMAGE_SUFFIXES,
    INCLUDE_IMAGES
};
