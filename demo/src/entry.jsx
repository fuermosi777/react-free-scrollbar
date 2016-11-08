import React from 'react';  
import ReactDOM from 'react-dom';
import FreeScrollBar from '../../src/index.jsx';
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
                <div className="container">
                    <div className="page-header">
                        <h1>React Free Scrollbar</h1>
                        <p className="lead">A react module for creating customizable scroll area</p>
                    </div>
                    <a href="https://github.com/fuermosi777/react-free-scrollbar" className="btn btn-lg btn-primary"><span className="fui-github"></span> Documentation on Github</a>

                    <h3>Features</h3>
                    <ul>
                        <li>Vertical and horizontal scrolling</li>
                        <li>Auto-hide</li>
                        <li>Fully customizable</li>
                    </ul>
                        
                    <h3>Install</h3>
                    <pre>
                        <code>$ npm install --save react-free-scrollbar</code>
                    </pre>
                    <h3>Examples</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <h4>Quick start</h4>
                            <div className="quick-start">
                                <FreeScrollBar start={"top"}>
                                    <div className="inner">{List}{List}{List}{List}{List}{List}{List}</div>
                                </FreeScrollBar>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h4>Horizontal</h4>
                            <div className="horizontal">
                            <FreeScrollBar>
                                <img src="http://designmodo.github.io/Flat-UI/docs/assets/img/example-image.jpg" className="img-rounded"/>
                            </FreeScrollBar>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <h4>Custom styles</h4>
                            <div className="custom-styles">
                                <FreeScrollBar className="example" tracksize="12px">
                                    <div className="inner">{List}{List}{List}{List}{List}{List}{List}</div>
                                </FreeScrollBar>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h4>Auto hide, and the starting position is on the "bottom right".</h4>
                            <div className="auto-hide">
                                <FreeScrollBar className="example" autohide={true} fixed={true} start={'bottom right'}>
                                    <div className="inner">{Text}</div>
                                </FreeScrollBar>
                            </div>
                        </div>
                    </div>

                    
                    
                    <h3></h3>
                    <a href="https://github.com/fuermosi777/react-free-scrollbar" className="btn btn-lg btn-primary"><span className="fui-github"></span> Documentation on Github</a>
                    <p className="footer">&copy; 2016 Hao Liu</p>
                </div>
            </div>
        );
    }
})

ReactDOM.render(
    <Root/>, document.getElementById('app')
);