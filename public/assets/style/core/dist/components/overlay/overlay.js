/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var CSSTransitionGroup = require("react-addons-css-transition-group");
var Classes = require("../../common/classes");
var Keys = require("../../common/keys");
var utils_1 = require("../../common/utils");
var portal_1 = require("../portal/portal");
var Overlay = Overlay_1 = (function (_super) {
    tslib_1.__extends(Overlay, _super);
    function Overlay(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.displayName = "Blueprint.Overlay";
        _this.refHandlers = {
            container: function (ref) { return _this.containerElement = ref; },
        };
        _this.bringFocusInsideOverlay = function () {
            var containerElement = _this.containerElement;
            // container ref may be undefined between component mounting and Portal rendering
            // activeElement may be undefined in some rare cases in IE
            if (containerElement == null || document.activeElement == null || !_this.props.isOpen) {
                return;
            }
            var isFocusOutsideModal = !containerElement.contains(document.activeElement);
            if (isFocusOutsideModal) {
                // element marked autofocus has higher priority than the other clowns
                var autofocusElement = containerElement.query("[autofocus]");
                var wrapperElement = containerElement.query("[tabindex]");
                if (autofocusElement != null) {
                    autofocusElement.focus();
                }
                else if (wrapperElement != null) {
                    wrapperElement.focus();
                }
            }
        };
        _this.handleBackdropMouseDown = function (e) {
            if (_this.props.canOutsideClickClose) {
                utils_1.safeInvoke(_this.props.onClose, e);
            }
            utils_1.safeInvoke(_this.props.backdropProps.onMouseDown, e);
        };
        _this.handleDocumentClick = function (e) {
            var _a = _this.props, isOpen = _a.isOpen, onClose = _a.onClose;
            var eventTarget = e.target;
            var isClickInOverlay = _this.containerElement != null
                && _this.containerElement.contains(eventTarget);
            if (isOpen && _this.props.canOutsideClickClose && !isClickInOverlay) {
                // casting to any because this is a native event
                utils_1.safeInvoke(onClose, e);
            }
        };
        _this.handleContentMount = function () {
            if (_this.props.isOpen) {
                utils_1.safeInvoke(_this.props.didOpen);
            }
            if (_this.props.autoFocus) {
                _this.bringFocusInsideOverlay();
            }
        };
        _this.handleDocumentFocus = function (e) {
            if (_this.props.enforceFocus
                && _this.containerElement != null
                && !_this.containerElement.contains(e.target)) {
                e.stopImmediatePropagation();
                _this.bringFocusInsideOverlay();
            }
        };
        _this.handleKeyDown = function (e) {
            var _a = _this.props, canEscapeKeyClose = _a.canEscapeKeyClose, onClose = _a.onClose;
            if (e.which === Keys.ESCAPE && canEscapeKeyClose) {
                utils_1.safeInvoke(onClose, e);
                // prevent browser-specific escape key behavior (Safari exits fullscreen)
                e.preventDefault();
            }
        };
        _this.state = { hasEverOpened: props.isOpen };
        return _this;
    }
    Overlay.prototype.render = function () {
        // oh snap! no reason to render anything at all if we're being truly lazy
        if (this.props.lazy && !this.state.hasEverOpened) {
            return null;
        }
        var _a = this.props, children = _a.children, className = _a.className, inline = _a.inline, isOpen = _a.isOpen, transitionDuration = _a.transitionDuration, transitionName = _a.transitionName;
        // add a special class to each child that will automatically set the appropriate
        // CSS position mode under the hood. also, make the container focusable so we can
        // trap focus inside it (via `enforceFocus`).
        var decoratedChildren = React.Children.map(children, function (child) {
            return React.cloneElement(child, {
                className: classNames(child.props.className, Classes.OVERLAY_CONTENT),
                tabIndex: 0,
            });
        });
        var transitionGroup = (React.createElement(CSSTransitionGroup, { transitionAppear: true, transitionAppearTimeout: transitionDuration, transitionEnterTimeout: transitionDuration, transitionLeaveTimeout: transitionDuration, transitionName: transitionName },
            this.maybeRenderBackdrop(),
            isOpen ? decoratedChildren : null));
        var mergedClassName = classNames(Classes.OVERLAY, (_b = {},
            _b[Classes.OVERLAY_OPEN] = isOpen,
            _b[Classes.OVERLAY_INLINE] = inline,
            _b), className);
        var elementProps = {
            className: mergedClassName,
            onKeyDown: this.handleKeyDown,
        };
        if (inline) {
            return React.createElement("span", tslib_1.__assign({}, elementProps, { ref: this.refHandlers.container }), transitionGroup);
        }
        else {
            return (React.createElement(portal_1.Portal, tslib_1.__assign({}, elementProps, { containerRef: this.refHandlers.container, onChildrenMount: this.handleContentMount }), transitionGroup));
        }
        var _b;
    };
    Overlay.prototype.componentDidMount = function () {
        if (this.props.isOpen) {
            this.overlayWillOpen();
        }
    };
    Overlay.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({ hasEverOpened: this.state.hasEverOpened || nextProps.isOpen });
    };
    Overlay.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.isOpen && !this.props.isOpen) {
            this.overlayWillClose();
        }
        else if (!prevProps.isOpen && this.props.isOpen) {
            this.overlayWillOpen();
        }
    };
    Overlay.prototype.componentWillUnmount = function () {
        this.overlayWillClose();
    };
    Overlay.prototype.maybeRenderBackdrop = function () {
        var _a = this.props, backdropClassName = _a.backdropClassName, backdropProps = _a.backdropProps, hasBackdrop = _a.hasBackdrop, isOpen = _a.isOpen;
        if (hasBackdrop && isOpen) {
            return (React.createElement("div", tslib_1.__assign({}, backdropProps, { className: classNames(Classes.OVERLAY_BACKDROP, backdropClassName, backdropProps.className), onMouseDown: this.handleBackdropMouseDown, tabIndex: this.props.canOutsideClickClose ? 0 : null })));
        }
        else {
            return undefined;
        }
    };
    Overlay.prototype.overlayWillClose = function () {
        document.removeEventListener("focus", this.handleDocumentFocus, /* useCapture */ true);
        document.removeEventListener("mousedown", this.handleDocumentClick);
        document.body.classList.remove(Classes.OVERLAY_OPEN);
        var openStack = Overlay_1.openStack;
        var stackIndex = openStack.indexOf(this);
        if (stackIndex !== -1) {
            openStack.splice(stackIndex, 1);
            var lastOpenedOverlay = Overlay_1.getLastOpened();
            if (openStack.length > 0 && lastOpenedOverlay.props.enforceFocus) {
                document.addEventListener("focus", lastOpenedOverlay.handleDocumentFocus, /* useCapture */ true);
            }
        }
    };
    Overlay.prototype.overlayWillOpen = function () {
        var openStack = Overlay_1.openStack;
        if (openStack.length > 0) {
            document.removeEventListener("focus", Overlay_1.getLastOpened().handleDocumentFocus, /* useCapture */ true);
        }
        openStack.push(this);
        if (this.props.canOutsideClickClose && !this.props.hasBackdrop) {
            document.addEventListener("mousedown", this.handleDocumentClick);
        }
        if (this.props.enforceFocus) {
            document.addEventListener("focus", this.handleDocumentFocus, /* useCapture */ true);
        }
        if (this.props.inline) {
            utils_1.safeInvoke(this.props.didOpen);
            if (this.props.autoFocus) {
                this.bringFocusInsideOverlay();
            }
        }
        else if (this.props.hasBackdrop) {
            // add a class to the body to prevent scrolling of content below the overlay
            document.body.classList.add(Classes.OVERLAY_OPEN);
        }
    };
    return Overlay;
}(React.Component));
Overlay.defaultProps = {
    autoFocus: true,
    backdropProps: {},
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    inline: false,
    isOpen: false,
    lazy: true,
    transitionDuration: 300,
    transitionName: "pt-overlay",
};
Overlay.openStack = [];
Overlay.getLastOpened = function () { return Overlay_1.openStack[Overlay_1.openStack.length - 1]; };
Overlay = Overlay_1 = tslib_1.__decorate([
    PureRender
], Overlay);
exports.Overlay = Overlay;
exports.OverlayFactory = React.createFactory(Overlay);
var Overlay_1;

//# sourceMappingURL=overlay.js.map
