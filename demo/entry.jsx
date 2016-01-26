import React from 'react';  
import ReactDOM from 'react-dom';
import FreeScrollBar from '../dist/index.js';
import Styles from './demo.less';

let things = ['Clean the room', 'Take out the ice-cream', 'Do the homework', 'Feed the cat', 'Clean the car', 'Go to dinner', 'Clean the cups', 'Throw a party', 'Repeat things above', 'Think about the trip', 'Make up a list', 'Go out with friends', 'Kick neighbor\'s butt'];

let List = things.map((item, key) => {
    return (
        <li key={key}>{item}</li>
    );
});

let Text = (<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente sint quos at. Quae in voluptate, autem ipsa porro quisquam architecto eos impedit laudantium, dolorem blanditiis fugiat maxime, veritatis voluptas temporibus?<br/><br/>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic consequuntur, incidunt explicabo reiciendis, reprehenderit voluptates dolorum possimus quo consequatur ratione quasi ipsa provident, ducimus similique. Ipsum quo alias exercitationem corrupti?<br/><br/>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic consequuntur, incidunt explicabo reiciendis, reprehenderit voluptates dolorum possimus quo consequatur ratione quasi ipsa provident, ducimus similique. Ipsum quo alias exercitationem corrupti?<br/><br/>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic consequuntur, incidunt explicabo reiciendis, reprehenderit voluptates dolorum possimus quo consequatur ratione quasi ipsa provident, ducimus similique. Ipsum quo alias exercitationem corrupti?</p>);

let Root = React.createClass({
    render() {
        return (
            <div className="Root">
                <div className="box">
                    <h1>React-free-scrollbar</h1>
                    <p>A highly customizable react component that creates custom scrollbar with the scrolling boxes for web app.</p>
                    <a href="https://github.com/fuermosi777/react-free-scrollbar" rel="external" className="github-corner" title="Fork me on GitHub">
                        <svg width="80" height="80" viewBox="0 0 250 250">
                            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{transformOrigin: "130px 106px"}} className="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body"></path>
                        </svg>
                    </a>
                    <h2>Install</h2>
                    <pre>
                        <code>$ npm install --save-dev react-free-scrollbar</code>
                    </pre>
                    <h2>Examples</h2>
                    <h3>Default</h3>
                    <div className="default">
                        <FreeScrollBar>
                            {List}
                        </FreeScrollBar>
                    </div>
                    <h3>Auto-hide</h3>
                    <div className="auto-hide">
                        <FreeScrollBar autoHide={true}>
                            {Text}
                        </FreeScrollBar>
                    </div>
                    <h3>Custom color</h3>
                    <div className="custom-color">
                        <FreeScrollBar>
                            {Text}
                        </FreeScrollBar>
                    </div>
                    <h3>Slack</h3>
                    <div className="slack">
                        <FreeScrollBar>
                            {Text}
                        </FreeScrollBar>
                    </div>
                    <h3>Hide handler completely</h3>
                    <div className="hide-completely">
                        <FreeScrollBar hideHandler={true}>
                            {Text}
                        </FreeScrollBar>
                    </div>
                </div>
            </div>
        );
    }
})

ReactDOM.render(
    <Root/>, document.getElementById('app')
);