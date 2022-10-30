//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

function isPositiveInteger(id) {
    id = id.trim();
    return !(!id || isNaN(parseInt(id)) || parseInt(id) < 0);
}

module.exports = {
    isPositiveInteger
};
