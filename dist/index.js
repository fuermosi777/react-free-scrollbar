var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
    displayName: 'FreeScrollbar',

    render() {
        return React.createElement('div', { className: 'ScrollView' });
    }
});
