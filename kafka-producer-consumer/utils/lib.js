module.exports.randmomNumber = function (min, max) {
    return Number((Math.random() * (max - min + 1) + min).toFixed(2));
}

