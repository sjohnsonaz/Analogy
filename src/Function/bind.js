/*
 * Function.bind()
 * BuildJS
 */
if (!Function.prototype.bind) {
    (function () {
        Function.prototype.bind = function (context) {
            if (context) {
                var self = this;
                if (arguments.length > 1) {
                    var prepend = Array.prototype.slice.call(arguments, 1);
                    return function () {
                        self.apply(context, Array.prototype.slice.call(arguments).unshift(prepend));
                    };
                } else {
                    return function () {
                        self.apply(context, arguments);
                    };
                }
            } else {
                return this;
            }
        };
    })();
}
