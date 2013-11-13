namespace("jim.events");
jim.events.create = function () {
    "use strict";
    var listeners = {},
        objectCount = 0;
    return {
        listeners: {},
        fire: function (event, arg) {
            if (this.listeners[event]) {
                this.listeners[event] = this.listeners[event].filter(function (listener) { return !listener.dead; });
                this.listeners[event].forEach(function (e) { e.execute(arg); });
            }
        },
        on: function (e, f) {
            objectCount += 1;
            if (this.listeners[e] === undefined) {
                this.listeners[e] = [];
            }
            this.listeners[e].push({id: objectCount, execute: f, dead: false});
            return objectCount;
        },
        forget: function (e, id) {
            listeners[e] = listeners[e].filter(function (l) {
                return l.id !== id;
            });
        },
        delay: function (action, maxAge, desc) {
            var age = 0;
            this.on("frame", function (time) {
                age += time.time;
                if (age > maxAge) {
                    action();
                    this.dead = true;
                }
            });
        }
    };
};

jim.events.createTimedEvent = function (events, event, maxAge) {
    "use strict";
    var src,
        age = jim.age.create(maxAge, function () { events.fire(event, src); });
    return {
        update: function (time, source) {
            src = source;
            age.increase(time);
        }
    };
};