import * as React from 'react';
export declare type Pos = {
    top: number;
    left: number;
    bottom: number;
    right: number;
};
interface State {
    showVeriticalTrack: boolean;
    showHorizontalTrack: boolean;
    noselect: boolean;
    handlerPos: Pos;
    hideHandler: boolean;
}
export declare type StartOption = '' | 'bottom' | 'right' | 'bottom right' | {
    top: number;
    left: number;
};
export interface Props {
    className?: string;
    style?: object;
    fixed?: boolean;
    autohide?: boolean;
    timeout?: number;
    tracksize?: string;
    start?: StartOption;
    browserOffset?: string;
    onScrollbarScroll?: () => void;
    onScrollbarScrollTimeout?: number;
}
export default class FreeScrollbar extends React.PureComponent<Props, State> {
    protected static displayName: string;
    static defaultProps: Props;
    private el;
    private offsetHeight;
    private offsetWidth;
    private lastScrollHeight;
    private lastScrollWidth;
    private activeHandler;
    private lastMousePos;
    private lastContainerScrollTop;
    private lastContainerScrollLeft;
    private handlerHider;
    constructor(props: Props);
    private throttle;
    scrollbarScrollThrottle: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    private handleReadyStateChange;
    private prepareScrollbar;
    private collectInfo;
    private updateTrackVisibilities;
    private resetHandlerHider;
    private handlerContainerScroll;
    private handleHandlerMouseDown;
    private handleHandlerMouseMove;
    private handleHandlerMouseUp;
    /**
     * Set the scrolling position manually.
     */
    setPosition: (pos: {
        top?: number;
        left?: number;
    }) => void;
    render(): JSX.Element;
}
export {};
