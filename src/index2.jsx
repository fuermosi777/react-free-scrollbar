var React = require('react');
var findDOMNode = require('react-dom').findDOMNode;


var FreeScrollbarStyles = {
    overflow: 'hidden',
    height: '100%',
    position: 'relative'
};

var FreeScrollbarScrollbarStyles = {
    position: "absolute",
    top: "0",
    right: "0",
    height: "100%"
};

var FreeScrollbarHandlerStyles = {
    position: "absolute",
    zIndex: "1"
};

var FreeScrollbarScrollerStyles = {
    overflow: "auto",
    position: "absolute",
    top: "0",
    left: "0",
    bottom: "-20px",
    right: "-20px",
    paddingRight: "20px",
    paddingBottom: "20px"
};

module.exports = React.createClass({
    displayName: 'FreeScrollbar',

    getDefaultProps() {
        return {
            autoHide: false,
            hideHandler: false
        };
    },

    getInitialState() {
        return {
            handlerScrollTop: 0,
            handlerHide: this.props.autoHide,
            height: 0,
            scrollHeight: 0,
            disableScroll: false
        };
    },

    handlerHider: null,
    scrollHandler: null,
    handlerPositionTop: 0, // the distance between the top of the handler to the mouse
    lastPos: 0,

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        document.addEventListener('mousemove', this.handleHandlerMouseMove);
        document.addEventListener('mouseup', this.handleHandlerMouseUp);
        this.updateHeight();
    },

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);  
        document.removeEventListener('mousemove', this.handleHandlerMouseMove);
        document.removeEventListener('mouseup', this.handleHandlerMouseUp);
    },

    componentDidUpdate() {
        console.log(this.showVerticalScrollHandler());
    },
    
    render() {
        // Mutating style is deprecated
        // Convert to immutable way
        var dynamicStyles = Object.assign({}, {height: `${this.state.height / this.state.scrollHeight * 100}%`, top: this.state.handlerScrollTop.toString() + '%'});
        var handlerStyles = Object.assign(dynamicStyles, FreeScrollbarHandlerStyles);
        return (
            <div className="FreeScrollbar" 
                style={FreeScrollbarStyles}>
                {this.props.hideHandler ? '' : <div className="FreeScrollbar-scrollbar" 
                    style={FreeScrollbarScrollbarStyles}>
                    {this.state.disableScroll ? '' : <div className={"FreeScrollbar-handler " + (this.state.handlerHide ? 'hide' : '')} 
                        onMouseDown={this.handleHandlerMouseDown} 
                        style={handlerStyles}
                        ref="handler"/>}
                </div>}
                <div className="FreeScrollbar-scroller" 
                    onScroll={this.handleScroll} 
                    ref="scroller" 
                    style={FreeScrollbarScrollerStyles}>
                    {this.props.children}
                </div>
            </div>
        );
    },

    showVerticalScrollHandler() {
        var el = findDOMNode(this);
        return el.scrollHeight > el.offsetHeight;
    },

    showHorizontalScrollHandler() {
        var el = findDOMNode(this);
        return el.scrollWidth > el.offsetWidth;
    },

    handleScroll(e) {
        clearTimeout(this.handlerHider);
        var pos = e.target.scrollTop / (e.target.scrollHeight- this.state.height) * (1 - this.state.height / this.state.scrollHeight);
        this.setState({
            handlerScrollTop: pos * 100,
            handlerHide: false
        }, () => {
            this.handlerHider = setTimeout(() => {
                this.setState({handlerHide: this.props.autoHide});
            }, 1500);
        });
        if (pos < 0.2 && pos < this.lastPos && this.props.onApproachingTop) {
            this.props.onApproachingTop();
        }
        if (pos > 0.6 && pos > this.lastPos && this.props.onApproachingBottom) {
            this.props.onApproachingBottom();
        }
        if (this.props.onScrolling) {
            this.props.onScrolling(pos, e.target.scrollTop);
        }
        this.lastPos = pos;
    },

    handleResize() {
        this.updateHeight();
    },

    componentWillReceiveProps(nextProps) {
        // when updating children
        // should remeasure the heights to decide
        // whether to disable the scroll or not
        this.updateHeight();
    },

    handleHandlerMouseDown(e) {
        this.scrollHandler = e.target;
        clearTimeout(this.handlerHider);
        this.setState({handlerHide: false});

        var handler = findDOMNode(this.refs.handler);
        var handlerOffsetTop = handler.getBoundingClientRect().top;
        this.handlerPositionTop = e.pageY + (window.scrollY || document.documentElement.scrollTop) - handlerOffsetTop;
    },

    handleHandlerMouseMove(e) {
        var scroller = findDOMNode(this.refs.scroller);
        var scrollerOffsetTop = scroller.getBoundingClientRect().top;
        
        if (this.scrollHandler) {
            var pos = (e.pageY - scrollerOffsetTop) / this.state.height;

            var resTop = pos * this.state.scrollHeight - this.handlerPositionTop;
            //resTop = (resTop < 0 ? 0 : ((pos > this.state.height * (1 - this.state.height / this.state.scrollHeight)) ? (this.state.height * (1 - this.state.height / this.state.scrollHeight)) : resTop));
            scroller.scrollTop = resTop;
        }
    },

    handleHandlerMouseUp(e) {
        this.scrollHandler = null;
        this.handlerPositionTop = 0;
        clearTimeout(this.handlerHider);
        this.handlerHider = setTimeout(() => {
            this.setState({handlerHide: this.props.autoHide});
        }, 1500);
    },

    updateHeight() {
        var height = findDOMNode(this).offsetHeight;
        var scrollHeight = findDOMNode(this.refs.scroller).scrollHeight;
        this.setState({
            height: height,
            scrollHeight: scrollHeight,
            disableScroll: (scrollHeight <= height)
        });
    }
});