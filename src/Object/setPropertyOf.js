/*
 * Object.setPrototypeOf()
 */
if (typeof Object.setPrototypeOf != 'function') {
    (function () {
        var prototypeSupport = !!({}).__proto__;
        Object.setPrototypeOf = function (obj, proto) {
            if (prototypeSupport) {
                obj.__proto__ = proto;
            } else {
                for (var property in proto) {
                    // We may need to copy all, not just Object.hasOwnProperty.
                    // However, do not set if an identical property is visible.
                    if (obj[property] !== proto[property]) {
                        obj[property] = proto[property];
                    }
                }
            }
            return obj;
        };
    })();
}
