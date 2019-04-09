# React-free-scrollbar

[![npm version](https://badge.fury.io/js/react-free-scrollbar.svg)](https://badge.fury.io/js/react-free-scrollbar)

A react module for creating customizable scroll area.

Visit [http://fuermosi777.github.io/react-free-scrollbar/](http://fuermosi777.github.io/react-free-scrollbar/) to see [demo](http://fuermosi777.github.io/react-free-scrollbar/).

## Install

    $ npm install --save react-free-scrollbar
    $ yarn add react-free-scrollbar

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

### `browserOffset: String`

The browser scroll bar width. Default: "17px". [It should fit for most browsers](https://codepen.io/sambible/post/browser-scrollbar-widths).

### `onScrollbarScroll: Function` optional

Fired when the scrollbar is scrolled.

### `onScrollbarScrollTimeout: Number` optional

This timeout adds a throttle for `onScrollbarScroll`. Default is `300`. Set to `0` to remove throttle.

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

`$ yarn dev`

Before publish: make sure run `yarn demo-build` and `yarn dist`.

Go to `http://localhost:8080`.
