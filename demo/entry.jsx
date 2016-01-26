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
                    <h1>Free Scrollbar</h1>
                    <h2>Default</h2>
                    <div className="default">
                        <FreeScrollBar>
                            {List}
                        </FreeScrollBar>
                    </div>
                    <h2>Auto-hide</h2>
                    <div className="auto-hide">
                        <FreeScrollBar autoHide={true}>
                            {Text}
                        </FreeScrollBar>
                    </div>
                    <h2>Custom color</h2>
                    <div className="custom-color">
                        <FreeScrollBar>
                            {Text}
                        </FreeScrollBar>
                    </div>
                    <h2>Slack</h2>
                    <div className="slack">
                        <FreeScrollBar>
                            {Text}
                        </FreeScrollBar>
                    </div>
                    <h2>Hide handler completely</h2>
                    <div className="slack">
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