# React-free-scrollbar

[![npm version](https://badge.fury.io/js/react-free-scrollbar.svg)](https://badge.fury.io/js/react-free-scrollbar)

A react module for creating customizable scroll area

Visit [http://fuermosi777.github.io/react-free-scrollbar/](http://fuermosi777.github.io/react-free-scrollbar/) to see [demo](http://fuermosi777.github.io/react-free-scrollbar/).

## Install

    $ npm install --save react-free-scrollbar

Assums you are using NPM package manager and module bundler such as Webpack.

## Usage

### Quick start

    import FreeScrollBar from 'react-free-scrollbar';

    // must have a wrapper with a certain size

    <div style={{width: '300px', height: '100px'}}>
        <FreeScrollBar>
            <h1>The title</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </FreeScrollBar>
    </div>

## Props

### `className: String` optional

Add custom class to the scroller. If you add a custom className to the component, all default styles will not working. You have to also add the following styles in your CSS files:

    // if you add "demo" as the custom class
    .demo {} // optional
    .demo-vertical-track {} // required
    .demo-horizontal-track {} // required
    .demo-vertical-handler {} // required
    .demo-horizontal-handler {} // required

### `style: Object` optional

If you just want to add some simple styles, you can pass this prop to the component.

Example:

    <FreeScrollerBar style={{width: "100%", height: "100%"}}></FreeScrollerBar>

### `fixed: Bool` optional

You can pass `fixed` to decide if handler's position: fixed or static. If `fixed` equals `true`, then the handler will overlap the content inside the scroller.

### `autohide: Bool` optional

Set `true` if you want a macOS style auto-hide scroller.

### `timeout: Integer` optional

The time length of the handler disappears. Default: 2000

### `tracksize: String`

The width of the vertical handler or the height of the horizontal handler. Default: 10px

### `start: String`

The starting position of the scroll area. Default: "top left".

Options: "bottom", "bottom right", "top right", "right"

## Customization

Adding a custom className to the component will give you power to customize the scrollbar's track and handler. Here is an example:

    /* the following code snippet is using Less */
    .example-vertical-track {
        background-color: transparent;
        width: 10px;
        transition: opacity 0.3s;
    }

    .example-horizontal-track {
        background-color: transparent;
        height: 10px;
        transition: opacity 0.3s;
    }

    .example-vertical-handler {
        width: 8px;
        right: 1px;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s;
        &:hover {
            background-color: rgba(0, 0, 0, 0.8);
        }
    }

    .example-horizontal-handler {
        height: 8px;
        bottom: 1px;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s;
        &:hover {
            background-color: rgba(0, 0, 0, 0.8);
        }
    }

For more examples, go to [http://fuermosi777.github.io/react-free-scrollbar/](http://fuermosi777.github.io/react-free-scrollbar/).

## Develop

`$ npm run demo-dev`

Go to `http://localhost:8080/demo/dev/`.

## License

MIT License

Copyright (c) 2015-2016 Hao Liu http://liuhao.im

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.