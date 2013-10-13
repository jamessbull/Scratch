namespace("jim.colour");
jim.colour.create = function (r, g, b, a) {
    "use strict";
    var colour = {},
        setColourPercent = function (colour, percentage) {
            this[colour] = (255 / 100) * percentage;
        };
    colour.red = r;
    colour.green = g;
    colour.blue = b;
    colour.alpha = a;
    colour.setColourPercent = setColourPercent;
    return colour;
};
