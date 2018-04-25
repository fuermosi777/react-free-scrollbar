'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VERTICAL = 'vertial';
var HORIZONTAL = 'horizontal';

var styles = {
    main: {
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box'
    },
    container: {
        position: 'absolute',
        top: '0',
        left: '0',
        overflow: 'scroll',
        boxSizing: 'border-box'
    },
    track: {
        vertical: {
            position: 'absolute',
            top: '0',
            right: '0'
        },
        verticalCustomize: {
            width: '10px',
            backgroundColor: '#FAFAFA',
            borderLeft: '1px solid #E8E8E8',
            transition: 'opacity 0.3s'
        },
        horizontal: {
            position: 'absolute',
            left: '0',
            bottom: '0'
        },
        horizontalCustomize: {
            height: '10px',
            backgroundColor: '#FAFAFA',
            borderTop: '1px solid #E8E8E8',
            transition: 'opacity 0.3s'
        }
    },
    handler: {
        vertical: {
            position: 'absolute'
        },
        verticalCustomize: {
            width: '100%',
            backgroundColor: '#C1C1C1',
            borderRadius: '5px',
            transition: 'opacity 0.3s'
        },
        horizontal: {
            position: 'absolute'
        },
        horizontalCustomize: {
            height: '100%',
            backgroundColor: '#C1C1C1',
            borderRadius: '5px',
            transition: 'opacity 0.3s'
        }
    },
    square: {
        position: 'absolute',
        width: '10px',
        height: '10px',
        right: 0,
        bottom: 0,
        backgroundColor: 'white'
    }
};

var FreeScrollbar = function (_React$PureComponent) {
    _inherits(FreeScrollbar, _React$PureComponent);

    function FreeScrollbar(props) {
        _classCallCheck(this, FreeScrollbar);

        var _this = _possibleConstructorReturn(this, (FreeScrollbar.__proto__ || Object.getPrototypeOf(FreeScrollbar)).call(this, props));

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
        _this.scrollbarScrollThrottle = null;

        _this.handleReadyStateChange = function () {
            if (document.readyState === 'complete') {
                _this.prepareScrollbar();
            }
        };

        _this.prepareScrollbar = function () {
            _this.collectInfo();
            _this.updateTrackVisibilities();
            _this.handlerContainerScroll();
            if (_this.props.start.includes('bottom')) {
                _this.el.scrollTop = _this.el.scrollHeight;
            }
            if (_this.props.start.includes('right')) {
                _this.el.scrollLeft = _this.el.scrollWidth;
            }
        };

        _this.collectInfo = function () {
            _this.offsetWidth = _this.el.offsetWidth;
            _this.offsetHeight = _this.el.offsetHeight;
        };

        _this.updateTrackVisibilities = function () {
            var el = _this.el;
            var scrollHeight = el.scrollHeight,
                scrollWidth = el.scrollWidth;


            if (scrollHeight === _this.lastScrollHeight && scrollWidth === _this.lastScrollWidth) return;
            _this.setState({
                showVeriticalTrack: scrollHeight > _this.offsetHeight,
                showHorizontalTrack: scrollWidth > _this.offsetWidth
            });
            _this.lastScrollWidth = scrollWidth;
            _this.lastScrollHeight = scrollHeight;
        };

        _this.runFunc = function (funcName) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            if (_this[funcName]) {
                _this[funcName](args);
            }
        };

        _this.throttle = function (func, timeout) {
            if (!func) return null;

            var canRun = true;

            return function () {

                if (canRun) {
                    canRun = false;
                    func.apply(undefined, arguments);

                    setTimeout(function () {
                        canRun = true;
                    }, timeout);
                }
            };
        };

        _this.handlerContainerScroll = function (e) {
            if (_this.props.autohide) {
                clearTimeout(_this.handlerHider);
                _this.setState({ hideHandler: false });
                _this.handlerHider = setTimeout(function () {
                    _this.setState({ hideHandler: true });
                }, _this.props.timeout);
            }

            var el = _this.el;
            var top = el.scrollTop / (el.scrollHeight - _this.offsetHeight) * (1 - _this.offsetHeight / _this.lastScrollHeight) * 100;
            var bottom = (1 - (el.scrollTop + _this.offsetHeight) / (el.scrollHeight - _this.offsetHeight) * (1 - _this.offsetHeight / _this.lastScrollHeight)) * 100;
            if (bottom < 0) bottom = 0;
            var left = el.scrollLeft / (el.scrollWidth - _this.offsetWidth) * (1 - _this.offsetWidth / _this.lastScrollWidth) * 100;
            var right = (1 - (el.scrollLeft + _this.offsetWidth) / (el.scrollWidth - _this.offsetWidth) * (1 - _this.offsetWidth / _this.lastScrollWidth)) * 100;
            if (right < 0) right = 0;
            var pos = {
                top: top,
                bottom: bottom,
                left: left,
                right: right
            };
            _this.setState({ handlerPos: pos });

            _this.runFunc('scrollbarScrollThrottle');
        };

        _this.handleVerticalHandlerMouseDown = function (d, e) {
            _this.lastContainerScrollTop = _this.el.scrollTop;
            _this.lastContainerScrollLeft = _this.el.scrollLeft;

            _this.activeHandler = d;
            _this.lastMousePos = {
                top: e.clientY,
                left: e.clientX
            };
            _this.setState({ noselect: true });
        };

        _this.handleHandlerMouseMove = function (e) {
            if (_this.activeHandler === VERTICAL) {
                var delY = e.clientY - _this.lastMousePos.top;
                _this.el.scrollTop = _this.lastContainerScrollTop + delY / _this.offsetHeight * _this.lastScrollHeight;
            }
            if (_this.activeHandler === HORIZONTAL) {
                var delX = e.clientX - _this.lastMousePos.left;
                _this.el.scrollLeft = _this.lastContainerScrollLeft + delX / _this.offsetWidth * _this.lastScrollWidth;
            }
        };

        _this.handleHandlerMouseUp = function () {
            _this.lastMousePos = null;
            _this.activeHandler = null;
            _this.setState({ noselect: false });
        };

        _this.state = {
            showVeriticalTrack: false,
            showHorizontalTrack: false,
            noselect: false,
            handlerPos: {
                top: 0,
                left: 0
            },
            hideHandler: props.autohide
        };

        // build prop funcs
        _this.scrollbarScrollThrottle = props.onScrollbarScrollTimeout > 0 ? _this.throttle(props.onScrollbarScroll, props.onScrollbarScrollTimeout) : props.onScrollbarScroll;
        return _this;
    }

    /** All prop funcs should be built to this funcs to run */
    /** @function {Function} - prop func */


    _createClass(FreeScrollbar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('mousemove', this.handleHandlerMouseMove);
            document.addEventListener('mouseup', this.handleHandlerMouseUp);
            document.addEventListener('readystatechange', this.handleReadyStateChange);

            this.prepareScrollbar();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('mousemove', this.handleHandlerMouseMove);
            document.removeEventListener('mouseup', this.handleHandlerMouseUp);
            document.removeEventListener('readystatechange', this.handleReadyStateChange);

            clearTimeout(this.handlerHider);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.updateTrackVisibilities();
        }
    }, {
        key: 'render',
        value: function render() {
            var _containerStyles,
                _this2 = this;

            // Dynamic styles
            var containerStyles = (_containerStyles = {
                paddingBottom: this.props.fixed ? 0 : this.state.showHorizontalTrack ? this.props.tracksize : 0
            }, _defineProperty(_containerStyles, 'paddingBottom', this.props.fixed ? 0 : this.state.showVeriticalTrack ? this.props.tracksize : 0), _defineProperty(_containerStyles, 'right', '-' + this.props.browserOffset), _defineProperty(_containerStyles, 'bottom', '-' + this.props.browserOffset), _containerStyles);
            if (this.state.noselect) {
                containerStyles.MozUserSelect = 'none';
                containerStyles.WebkitUserSelect = 'none';
                containerStyles.msUserSelect = 'none';
            }
            var verticalTrackStyles = {
                bottom: this.state.showHorizontalTrack ? this.props.tracksize : '0',
                opacity: this.state.hideHandler ? 0 : 1
            };
            var horizontalTrackStyles = {
                right: this.state.showVeriticalTrack ? this.props.tracksize : '0',
                opacity: this.state.hideHandler ? 0 : 1
            };
            var verticalHandlerStyles = {
                top: this.state.handlerPos.top + '%',
                bottom: this.state.handlerPos.bottom + '%',
                opacity: this.state.hideHandler ? 0 : 1
            };
            var horizontalHandlerStyles = {
                left: this.state.handlerPos.left + '%',
                right: this.state.handlerPos.right + '%',
                opacity: this.state.hideHandler ? 0 : 1
            };

            return _react2.default.createElement(
                'div',
                {
                    className: 'FreeScrollbar ' + this.props.className,
                    style: _extends({}, this.props.style, styles.main)
                },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'FreeScrollbar-container',
                        style: _extends({}, containerStyles, styles.container),
                        ref: function ref(container) {
                            return _this2.el = container;
                        },
                        onScroll: this.handlerContainerScroll
                    },
                    this.props.children
                ),
                this.state.showVeriticalTrack ? _react2.default.createElement(
                    'div',
                    {
                        className: 'FreeScrollbar-vertical-track ' + (this.props.className ? this.props.className + '-vertical-track' : ''),
                        style: this.props.className ? Object.assign(verticalTrackStyles, styles.track.vertical) : Object.assign(verticalTrackStyles, styles.track.vertical, styles.track.verticalCustomize)
                    },
                    _react2.default.createElement('div', {
                        className: 'FreeScrollbar-vertical-handler ' + (this.props.className ? this.props.className + '-vertical-handler' : ''),
                        onMouseDown: this.handleVerticalHandlerMouseDown.bind(this, VERTICAL),
                        style: this.props.className ? Object.assign(verticalHandlerStyles, styles.handler.vertical) : Object.assign(verticalHandlerStyles, styles.handler.vertical, styles.handler.verticalCustomize) })
                ) : null,
                this.state.showHorizontalTrack ? _react2.default.createElement(
                    'div',
                    {
                        className: 'FreeScrollbar-horizontal-track ' + (this.props.className ? this.props.className + '-horizontal-track' : ''),
                        style: this.props.className ? Object.assign(horizontalTrackStyles, styles.track.horizontal) : Object.assign(horizontalTrackStyles, styles.track.horizontal, styles.track.horizontalCustomize)
                    },
                    _react2.default.createElement('div', {
                        className: 'FreeScrollbar-horizontal-handler ' + (this.props.className ? this.props.className + '-horizontal-handler' : ''),
                        onMouseDown: this.handleVerticalHandlerMouseDown.bind(this, HORIZONTAL),
                        style: this.props.className ? Object.assign(horizontalHandlerStyles, styles.handler.horizontal) : Object.assign(horizontalHandlerStyles, styles.handler.horizontal, styles.handler.horizontalCustomize) })
                ) : null,
                this.state.showHorizontalTrack && this.state.showVeriticalTrack && !this.props.fixed ? _react2.default.createElement('div', {
                    className: 'FreeScrollbar-square ' + (this.props.className ? this.props.className + '-square' : ''),
                    style: styles.square }) : null
            );
        }
    }]);

    return FreeScrollbar;
}(_react2.default.PureComponent);

FreeScrollbar.displayName = 'FreeScrollbar';
FreeScrollbar.propTypes = {
    className: _propTypes2.default.string,
    style: _propTypes2.default.object,
    fixed: _propTypes2.default.bool,
    autohide: _propTypes2.default.bool,
    timeout: _propTypes2.default.number,
    tracksize: _propTypes2.default.string,
    start: _propTypes2.default.string,
    browserOffset: _propTypes2.default.string,
    onScrollbarScroll: _propTypes2.default.func,
    onScrollbarScrollTimeout: _propTypes2.default.number
};
FreeScrollbar.defaultProps = {
    className: '',
    style: {
        width: '100%',
        height: '100%'
    },
    fixed: false,
    autohide: false,
    timeout: 2000,
    tracksize: '10px',
    start: 'top left',
    browserOffset: '17px',
    onScrollbarScroll: null,
    onScrollbarScrollTimeout: 300
};
exports.default = FreeScrollbar;
;
