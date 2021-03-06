// These are Harmony features.
(function () {
    if (!String.prototype.endsWith) {
        Object.defineProperty(String.prototype, 'endsWith', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function (searchString, position) {
                position = (position || this.length) - searchString.length;
                var lastIndex = this.lastIndexOf(searchString);
                return lastIndex !== -1 && lastIndex === position;
            }
        });
    }
})();
