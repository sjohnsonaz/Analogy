/**
 * @method EventTarget.dispatchEvent(event)
 * @param event the Event object to be dispatched.
 * target is used to initialize the Event.target and determine which event listeners to invoke.
 * @return false if at least one of the event handlers which handled this event called Event.preventDefault(). Otherwise it returns true.
 */
// cancelled = !target.dispatchEvent(event)

/**
 * @method EventTarget.fireEvent(eventNameWithOn, event)
 * @param eventNameWithOn The name of the event to fire, prefixed with "on", as if it were an event handler attribute. For example, you would use "onclick" to fire a click event.
 * @param event The event object to fire
 * target The DOM element to fire the event at
 * @return Boolean indicating whether the event was canceled by an event handler
 */
//cancelled = target.fireEvent(eventNameWithOn, event)


!window.addEventListener && (function (WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {
    WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function (type, listener) {
        var target = this;

        registry.unshift([target, type, listener, function (event) {
            event.currentTarget = target;
            event.preventDefault = function () {
                event.returnValue = false
            };
            event.stopPropagation = function () {
                event.cancelBubble = true
            };
            event.target = event.srcElement || target;

            listener.call(target, event);
        }]);

        this.attachEvent("on" + type, registry[0][3]);
    };

    WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function (type, listener) {
        for (var index = 0, register; register = registry[index]; ++index) {
            if (register[0] == this && register[1] == type && register[2] == listener) {
                return this.detachEvent("on" + type, registry.splice(index, 1)[0][3]);
            }
        }
    };

    WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function (eventObject) {
        return this.fireEvent("on" + eventObject.type, eventObject);
    };
})(Window.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []);
