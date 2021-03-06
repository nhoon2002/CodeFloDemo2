/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Returns whether `process.env.NODE_ENV` exists and equals `env`. */
function isNodeEnv(env) {
    return typeof process !== "undefined" && process.env && process.env.NODE_ENV === env;
}
exports.isNodeEnv = isNodeEnv;
/** Returns whether the value is a function. Acts as a type guard. */
// tslint:disable-next-line:ban-types
function isFunction(value) {
    return typeof value === "function";
}
exports.isFunction = isFunction;
// tslint:disable-next-line:ban-types
function safeInvoke(func) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (isFunction(func)) {
        return func.apply(void 0, args);
    }
}
exports.safeInvoke = safeInvoke;
function elementIsOrContains(element, testElement) {
    return element === testElement || element.contains(testElement);
}
exports.elementIsOrContains = elementIsOrContains;
/**
 * Returns the difference in length between two arrays. A `null` argument is considered an empty list.
 * The return value will be positive if `a` is longer than `b`, negative if the opposite is true,
 * and zero if their lengths are equal.
 */
function arrayLengthCompare(a, b) {
    if (a === void 0) { a = []; }
    if (b === void 0) { b = []; }
    return a.length - b.length;
}
exports.arrayLengthCompare = arrayLengthCompare;
/**
 * Returns true if the two numbers are within the given tolerance of each other.
 * This is useful to correct for floating point precision issues, less useful for integers.
 */
function approxEqual(a, b, tolerance) {
    if (tolerance === void 0) { tolerance = 0.00001; }
    return Math.abs(a - b) <= tolerance;
}
exports.approxEqual = approxEqual;
/** Clamps the given number between min and max values. Returns value if within range, or closest bound. */
function clamp(val, min, max) {
    if (max < min) {
        throw new Error("clamp: max cannot be less than min");
    }
    return Math.min(Math.max(val, min), max);
}
exports.clamp = clamp;
/** Returns the number of decimal places in the given number. */
function countDecimalPlaces(num) {
    if (typeof num !== "number" || Math.floor(num) === num) {
        return 0;
    }
    return num.toString().split(".")[1].length;
}
exports.countDecimalPlaces = countDecimalPlaces;
/**
 * Throttle an event on an EventTarget by wrapping it in `requestAnimationFrame` call.
 * Returns the event handler that was bound to given eventName so you can clean up after yourself.
 * @see https://developer.mozilla.org/en-US/docs/Web/Events/scroll
 */
function throttleEvent(target, eventName, newEventName) {
    var running = false;
    /* istanbul ignore next: borrowed directly from MDN */
    var func = function (event) {
        if (running) {
            return;
        }
        running = true;
        requestAnimationFrame(function () {
            target.dispatchEvent(new CustomEvent(newEventName, event));
            running = false;
        });
    };
    target.addEventListener(eventName, func);
    return func;
}
exports.throttleEvent = throttleEvent;
;

//# sourceMappingURL=utils.js.map
