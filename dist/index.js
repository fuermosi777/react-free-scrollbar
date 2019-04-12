"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Direction;
(function (Direction) {
    Direction[Direction["Vertical"] = 0] = "Vertical";
    Direction[Direction["Horizontal"] = 1] = "Horizontal";
})(Direction || (Direction = {}));
var styles = {
    main: {
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
    },
    container: {
        position: 'absolute',
        top: '0',
        left: '0',
        overflow: 'scroll',
        boxSizing: 'border-box',
    },
    track: {
        vertical: {
            position: 'absolute',
            top: '0',
            right: '0',
        },
        verticalCustomize: {
            width: '10px',
            backgroundColor: '#FAFAFA',
            borderLeft: '1px solid #E8E8E8',
            transition: 'opacity 0.3s',
        },
        horizontal: {
            position: 'absolute',
            left: '0',
            bottom: '0',
        },
        horizontalCustomize: {
            height: '10px',
            backgroundColor: '#FAFAFA',
            borderTop: '1px solid #E8E8E8',
            transition: 'opacity 0.3s',
        },
    },
    handler: {
        vertical: {
            position: 'absolute',
        },
        verticalCustomize: {
            width: '100%',
            backgroundColor: '#C1C1C1',
            borderRadius: '5px',
            transition: 'opacity 0.3s',
        },
        horizontal: {
            position: 'absolute',
        },
        horizontalCustomize: {
            height: '100%',
            backgroundColor: '#C1C1C1',
            borderRadius: '5px',
            transition: 'opacity 0.3s',
        },
    },
    square: {
        position: 'absolute',
        width: '10px',
        height: '10px',
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
    },
};
var FreeScrollbar = /** @class */ (function (_super) {
    __extends(FreeScrollbar, _super);
    function FreeScrollbar(props) {
        var _this = _super.call(this, props) || this;
        _this.el = null;
        _this.offsetHeight = 0;
        _this.offsetWidth = 0;
        _this.lastScrollHeight = 0;
        _this.lastScrollWidth = 0;
        _this.activeHandler = null;
        _this.lastMousePos = null;
        _this.lastContainerScrollTop = 0;
        _this.lastContainerScrollLeft = 0;
        _this.handlerHider = null;
        _this.throttle = function (func, timeout) {
            if (!func)
                return null;
            var canRun = true;
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (canRun) {
                    canRun = false;
                    func.apply(void 0, args);
                    setTimeout(function () {
                        canRun = true;
                    }, timeout);
                }
            };
        };
        _this.scrollbarScrollThrottle = _this.props.onScrollbarScrollTimeout > 0
            ? _this.throttle(_this.props.onScrollbarScroll, _this.props.onScrollbarScrollTimeout)
            : _this.props.onScrollbarScroll;
        _this.handleReadyStateChange = function () {
            if (document.readyState === 'complete') {
                _this.prepareScrollbar();
                _this.prepareScrollbarStartPos();
            }
        };
        _this.prepareScrollbar = function () {
            _this.collectInfo();
            _this.updateTrackVisibilities();
            // Trigger auto hider.
            _this.handlerContainerScroll();
        };
        _this.prepareScrollbarStartPos = function () {
            var start = _this.props.start;
            if (typeof start === 'string') {
                if (start.includes('bottom')) {
                    _this.el.scrollTop = _this.el.scrollHeight;
                }
                if (start.includes('right')) {
                    _this.el.scrollLeft = _this.el.scrollWidth;
                }
            }
            else if (typeof start === 'object') {
                _this.el.scrollTop = start.top;
                _this.el.scrollLeft = start.left;
            }
        };
        _this.collectInfo = function () {
            _this.offsetWidth = _this.el.offsetWidth;
            _this.offsetHeight = _this.el.offsetHeight;
        };
        _this.updateTrackVisibilities = function () {
            var el = _this.el;
            var scrollHeight = el.scrollHeight, scrollWidth = el.scrollWidth;
            if (scrollHeight === _this.lastScrollHeight && scrollWidth === _this.lastScrollWidth)
                return;
            _this.setState({
                showVeriticalTrack: scrollHeight > _this.offsetHeight,
                showHorizontalTrack: scrollWidth > _this.offsetWidth,
            });
            _this.lastScrollWidth = scrollWidth;
            _this.lastScrollHeight = scrollHeight;
        };
        _this.resetHandlerHider = function () {
            if (_this.props.autohide) {
                clearTimeout(_this.handlerHider);
                _this.setState({ hideHandler: false });
                _this.handlerHider = setTimeout(function () {
                    _this.setState({ hideHandler: true });
                }, _this.props.timeout);
            }
        };
        _this.handlerContainerScroll = function () {
            _this.resetHandlerHider();
            var el = _this.el;
            var top = (el.scrollTop / (el.scrollHeight - _this.offsetHeight)) *
                (1 - _this.offsetHeight / _this.lastScrollHeight) *
                100;
            var bottom = (1 -
                ((el.scrollTop + _this.offsetHeight) / (el.scrollHeight - _this.offsetHeight)) *
                    (1 - _this.offsetHeight / _this.lastScrollHeight)) *
                100;
            if (bottom < 0)
                bottom = 0;
            var left = (el.scrollLeft / (el.scrollWidth - _this.offsetWidth)) *
                (1 - _this.offsetWidth / _this.lastScrollWidth) *
                100;
            var right = (1 -
                ((el.scrollLeft + _this.offsetWidth) / (el.scrollWidth - _this.offsetWidth)) *
                    (1 - _this.offsetWidth / _this.lastScrollWidth)) *
                100;
            if (right < 0)
                right = 0;
            var pos = {
                top: top,
                bottom: bottom,
                left: left,
                right: right,
            };
            _this.setState({ handlerPos: pos });
            if (_this.scrollbarScrollThrottle) {
                _this.scrollbarScrollThrottle();
            }
        };
        _this.handleHandlerMouseDown = function (e, d) {
            _this.resetHandlerHider();
            _this.lastContainerScrollTop = _this.el.scrollTop;
            _this.lastContainerScrollLeft = _this.el.scrollLeft;
            _this.activeHandler = d;
            _this.lastMousePos = {
                top: e.clientY,
                left: e.clientX,
            };
            _this.setState({ noselect: true });
        };
        _this.handleHandlerMouseMove = function (event) {
            if (_this.activeHandler === Direction.Vertical) {
                var delY = event.clientY - _this.lastMousePos.top;
                _this.el.scrollTop =
                    _this.lastContainerScrollTop + (delY / _this.offsetHeight) * _this.lastScrollHeight;
            }
            if (_this.activeHandler === Direction.Horizontal) {
                var delX = event.clientX - _this.lastMousePos.left;
                _this.el.scrollLeft =
                    _this.lastContainerScrollLeft + (delX / _this.offsetWidth) * _this.lastScrollWidth;
            }
        };
        _this.handleHandlerMouseUp = function () {
            _this.lastMousePos = null;
            _this.activeHandler = null;
            _this.setState({ noselect: false });
        };
        /**
         * Set the scrolling position manually.
         */
        _this.setPosition = function (pos) {
            if (pos.top) {
                _this.el.scrollTop = pos.top;
            }
            if (pos.left) {
                _this.el.scrollLeft = pos.left;
            }
        };
        _this.state = {
            showVeriticalTrack: false,
            showHorizontalTrack: false,
            noselect: false,
            handlerPos: {
                // Vertical handler.
                top: 0,
                bottom: 0,
                // Horizontal handler.
                left: 0,
                right: 0,
            },
            hideHandler: props.autohide,
        };
        return _this;
    }
    FreeScrollbar.prototype.componentDidMount = function () {
        window.addEventListener('resize', this.prepareScrollbar);
        document.addEventListener('mousemove', this.handleHandlerMouseMove);
        document.addEventListener('mouseup', this.handleHandlerMouseUp);
        document.addEventListener('readystatechange', this.handleReadyStateChange);
        this.prepareScrollbar();
    };
    FreeScrollbar.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.prepareScrollbar);
        document.removeEventListener('mousemove', this.handleHandlerMouseMove);
        document.removeEventListener('mouseup', this.handleHandlerMouseUp);
        document.removeEventListener('readystatechange', this.handleReadyStateChange);
        clearTimeout(this.handlerHider);
    };
    FreeScrollbar.prototype.componentDidUpdate = function () {
        this.updateTrackVisibilities();
    };
    FreeScrollbar.prototype.render = function () {
        var _this = this;
        // Dynamic styles
        var containerStyles = {
            paddingRight: this.props.fixed
                ? 0
                : this.state.showHorizontalTrack
                    ? this.props.tracksize
                    : 0,
            paddingBottom: this.props.fixed
                ? 0
                : this.state.showVeriticalTrack
                    ? this.props.tracksize
                    : 0,
            right: "-" + this.props.browserOffset,
            bottom: "-" + this.props.browserOffset,
        };
        if (this.state.noselect) {
            containerStyles.userSelect = 'none';
            containerStyles.MozUserSelect = 'none';
            containerStyles.WebkitUserSelect = 'none';
            containerStyles.msUserSelect = 'none';
        }
        var verticalTrackStyles = {
            bottom: this.state.showHorizontalTrack ? this.props.tracksize : '0',
            opacity: this.state.hideHandler ? 0 : 1,
        };
        var horizontalTrackStyles = {
            right: this.state.showVeriticalTrack ? this.props.tracksize : '0',
            opacity: this.state.hideHandler ? 0 : 1,
        };
        var verticalHandlerStyles = {
            top: this.state.handlerPos.top + '%',
            bottom: this.state.handlerPos.bottom + '%',
            opacity: this.state.hideHandler ? 0 : 1,
        };
        var horizontalHandlerStyles = {
            left: this.state.handlerPos.left + '%',
            right: this.state.handlerPos.right + '%',
            opacity: this.state.hideHandler ? 0 : 1,
        };
        return (React.createElement("div", { className: "FreeScrollbar " + this.props.className, style: __assign({}, this.props.style, styles.main) },
            React.createElement("div", { className: "FreeScrollbar-container", style: __assign({}, containerStyles, styles.container), ref: function (container) { return (_this.el = container); }, onScroll: this.handlerContainerScroll }, this.props.children),
            this.state.showVeriticalTrack ? (React.createElement("div", { className: "FreeScrollbar-vertical-track " + (this.props.className ? this.props.className + '-vertical-track' : ''), style: this.props.className
                    ? Object.assign(verticalTrackStyles, styles.track.vertical)
                    : Object.assign(verticalTrackStyles, styles.track.vertical, styles.track.verticalCustomize) },
                React.createElement("div", { className: "FreeScrollbar-vertical-handler " + (this.props.className ? this.props.className + '-vertical-handler' : ''), onMouseDown: function (event) {
                        _this.handleHandlerMouseDown(event, Direction.Vertical);
                    }, style: this.props.className
                        ? Object.assign(verticalHandlerStyles, styles.handler.vertical)
                        : Object.assign(verticalHandlerStyles, styles.handler.vertical, styles.handler.verticalCustomize) }))) : null,
            this.state.showHorizontalTrack ? (React.createElement("div", { className: "FreeScrollbar-horizontal-track " + (this.props.className ? this.props.className + '-horizontal-track' : ''), style: this.props.className
                    ? Object.assign(horizontalTrackStyles, styles.track.horizontal)
                    : Object.assign(horizontalTrackStyles, styles.track.horizontal, styles.track.horizontalCustomize) },
                React.createElement("div", { className: "FreeScrollbar-horizontal-handler " + (this.props.className ? this.props.className + '-horizontal-handler' : ''), onMouseDown: function (event) {
                        _this.handleHandlerMouseDown(event, Direction.Horizontal);
                    }, style: this.props.className
                        ? Object.assign(horizontalHandlerStyles, styles.handler.horizontal)
                        : Object.assign(horizontalHandlerStyles, styles.handler.horizontal, styles.handler.horizontalCustomize) }))) : null,
            this.state.showHorizontalTrack && this.state.showVeriticalTrack && !this.props.fixed ? (React.createElement("div", { className: "FreeScrollbar-square " + (this.props.className ? this.props.className + '-square' : ''), style: styles.square })) : null));
    };
    FreeScrollbar.displayName = 'FreeScrollbar';
    FreeScrollbar.defaultProps = {
        className: '',
        style: {
            width: '100%',
            height: '100%',
        },
        fixed: false,
        autohide: false,
        timeout: 2000,
        tracksize: '10px',
        start: '',
        browserOffset: '17px',
        onScrollbarScroll: null,
        onScrollbarScrollTimeout: 300,
    };
    return FreeScrollbar;
}(React.PureComponent));
exports.default = FreeScrollbar;
//# sourceMappingURL=index.js.map