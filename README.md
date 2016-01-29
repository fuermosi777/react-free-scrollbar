# React-free-scrollbar

[![npm version](https://badge.fury.io/js/react-free-scrollbar.svg)](https://badge.fury.io/js/react-free-scrollbar)

A highly customizable react component that creates custom scrollbar with the scrolling boxes for web app.

Visit [http://fuermosi777.github.io/react-free-scrollbar/](http://fuermosi777.github.io/react-free-scrollbar/) to see [demo](http://fuermosi777.github.io/react-free-scrollbar/).

## Install

    $ npm install --save-dev react-free-scrollbar

## Usage

### Step 1: JSX

    import FreeScrollBar from 'react-free-scrollbar';

    // must have a outter container with both width and height
    <div style={{width: '300px', height: '100px'}}>
        <FreeScrollBar>
            <h1>The title</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </FreeScrollBar>
    </div>

### Step 2: add styles

    .FreeScrollbar-scrollbar {
        width: 8px;
    }
    .FreeScrollbar-handler {
        background-color: rgba(0, 0, 0, 0.5);
        width: 8px;
        border-radius: 4px;
        cursor: default;
    }

## Props

- `autoHide: Bool`: hide scrollbar when mouse leaves and show upon hovering
- `hideHandler: Bool`: hide scrollbar completely

## Customization

    /* the following code snippet is using Less */
    /* the track */
    .FreeScrollbar-scrollbar {
        width: 8px;
        &:before {
            content: '';
            position: absolute;
            background: #ABABAB;
            box-shadow: inset 0 0 1px #000000;
            left: 0px;
            width: 6px;
            top: 2px;
            bottom: 2px;
            border-radius: 4px;
        }
    }

    /* the thumb */
    .FreeScrollbar-handler {
        background-color: #f7f7f7;
        width: 8px;
        left: -1px;
        border-radius: 4px;
        transition: background-color 0.2s;
        box-shadow: 0 0 1px #A1A1A1;
        &.hide {
            background-color: rgba(0, 0, 0, 0);
        }
        &:hover {
            background-color: #f6f6f6;
        }
        &:active,
        &:focus {
            cursor: default;
        }
    }

For more examples, go to [http://fuermosi777.github.io/react-free-scrollbar/](http://fuermosi777.github.io/react-free-scrollbar/).

## License

MIT &copy; [Hao Liu](http://liuhao.im)