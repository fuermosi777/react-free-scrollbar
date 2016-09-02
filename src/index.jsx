var React = require('react');
var findDOMNode = require('react-dom').findDOMNode;

const styles = {
    main: {
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box'
    },
    container: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '-15px',
        bottom: '-15px',
        overflow: 'scroll',
        boxSizing: 'border-box'
    },
    track: {
        vertical: {
            position: 'absolute',
            left: '0',
            right: '0',
            height: '10px',
            bottom: '0',
            backgroundColor: 'black'
        },
        horizontal: {
            position: 'absolute',
            top: '0',
            right: '0',
            width: '10px',
            bottom: '0',
            backgroundColor: 'black'
        }
    },
    handler: {
        vertical: {

        },
        horizontal: {
            
        }
    }
};

module.exports = React.createClass({
    displayName: 'FreeScrollbar',

    getDefaultProps() {
        return {
            className: '',
            style: {
                width: '100%',
                height: '100%'
            }
        }
    },

    getInitialState() {
        return {
            showVeriticalTrack: false,
            showHorizontalTrack: false
        }
    },

    componentDidMount() {
        this.updateTrackVisibilities();        
    },

    componentDidUpdate() {
        // this.updateTrackVisibilities();  
    },

    render() {
        console.log(this.state);
        return (
            <div className={`FreeScrollbar ${this.props.className}`} style={Object.assign(this.props.style, styles.main)}>
                <div className="FreeScrollbar-container" style={styles.container} ref="container">
                    {this.props.children}
                    {this.state.showVeriticalTrack ? <div className="FreeScrollbar-vertical-track" style={styles.track.vertical}></div> : null}
                    {this.state.showHorizontalTrack ? <div className="FreeScrollbar-horizontal-track" style={styles.track.horizontal}></div> : null}
                </div>
            </div>
        )
    },

    updateTrackVisibilities() {
        var el = findDOMNode(this.refs.container);
        this.setState({
            showVeriticalTrack: el.scrollHeight > el.offsetHeight,
            showHorizontalTrack: el.scrollWidth > el.offsetWidth
        })
    }


});