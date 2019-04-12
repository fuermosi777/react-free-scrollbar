import * as React from 'react';

enum Direction {
  Vertical,
  Horizontal,
}

export type Pos = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};

const styles = {
  main: {
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
  },
  container: {
    position: 'absolute',
    top: '0',
    left: '0',
    overflow: 'scroll',
    boxSizing: 'border-box',
  },
  track: {
    vertical: {
      position: 'absolute',
      top: '0',
      right: '0',
    },
    verticalCustomize: {
      width: '10px',
      backgroundColor: '#FAFAFA',
      borderLeft: '1px solid #E8E8E8',
      transition: 'opacity 0.3s',
    },
    horizontal: {
      position: 'absolute',
      left: '0',
      bottom: '0',
    },
    horizontalCustomize: {
      height: '10px',
      backgroundColor: '#FAFAFA',
      borderTop: '1px solid #E8E8E8',
      transition: 'opacity 0.3s',
    },
  },
  handler: {
    vertical: {
      position: 'absolute',
    },
    verticalCustomize: {
      width: '100%',
      backgroundColor: '#C1C1C1',
      borderRadius: '5px',
      transition: 'opacity 0.3s',
    },
    horizontal: {
      position: 'absolute',
    },
    horizontalCustomize: {
      height: '100%',
      backgroundColor: '#C1C1C1',
      borderRadius: '5px',
      transition: 'opacity 0.3s',
    },
  },
  square: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
};

interface State {
  showVeriticalTrack: boolean;
  showHorizontalTrack: boolean;
  noselect: boolean;
  handlerPos: Pos;
  hideHandler: boolean;
}

export type StartOption = '' | 'bottom' | 'right' | 'bottom right' | { top: number; left: number };

export interface Props {
  className?: string;
  style?: object;
  fixed?: boolean;
  autohide?: boolean;
  timeout?: number;
  tracksize?: string;
  // Initial scroll bar position.
  start?: StartOption;
  browserOffset?: string;
  onScrollbarScroll?: () => void;
  onScrollbarScrollTimeout?: number;
}

export default class FreeScrollbar extends React.PureComponent<Props, State> {
  protected static displayName = 'FreeScrollbar';

  public static defaultProps: Props = {
    className: '',
    style: {
      width: '100%',
      height: '100%',
    },
    fixed: false,
    autohide: false,
    timeout: 2000,
    tracksize: '10px',
    start: '',
    browserOffset: '17px',
    onScrollbarScroll: null,
    onScrollbarScrollTimeout: 300,
  };

  private el: HTMLDivElement = null;
  private offsetHeight = 0;
  private offsetWidth = 0;
  private lastScrollHeight = 0;
  private lastScrollWidth = 0;
  private activeHandler: Direction = null;
  private lastMousePos: { top: number; left: number } = null;
  private lastContainerScrollTop = 0;
  private lastContainerScrollLeft = 0;
  private handlerHider: number = null;

  public constructor(props: Props) {
    super(props);

    this.state = {
      showVeriticalTrack: false,
      showHorizontalTrack: false,
      noselect: false,
      handlerPos: {
        // Vertical handler.
        top: 0,
        bottom: 0,
        // Horizontal handler.
        left: 0,
        right: 0,
      },
      hideHandler: props.autohide,
    };
  }

  private throttle = (func: (args?: any) => void, timeout: number) => {
    if (!func) return null;

    let canRun = true;

    return function(...args: any) {
      if (canRun) {
        canRun = false;
        func(...args);

        setTimeout(() => {
          canRun = true;
        }, timeout);
      }
    };
  };

  public scrollbarScrollThrottle =
    this.props.onScrollbarScrollTimeout > 0
      ? this.throttle(this.props.onScrollbarScroll, this.props.onScrollbarScrollTimeout)
      : this.props.onScrollbarScroll;

  public componentDidMount() {
    window.addEventListener('resize', this.prepareScrollbar);
    document.addEventListener('mousemove', this.handleHandlerMouseMove);
    document.addEventListener('mouseup', this.handleHandlerMouseUp);
    document.addEventListener('readystatechange', this.handleReadyStateChange);

    this.prepareScrollbar();
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.prepareScrollbar);
    document.removeEventListener('mousemove', this.handleHandlerMouseMove);
    document.removeEventListener('mouseup', this.handleHandlerMouseUp);
    document.removeEventListener('readystatechange', this.handleReadyStateChange);

    clearTimeout(this.handlerHider);
  }

  public componentDidUpdate() {
    this.updateTrackVisibilities();
  }

  private handleReadyStateChange = () => {
    if (document.readyState === 'complete') {
      this.prepareScrollbar();
      this.prepareScrollbarStartPos();
    }
  };

  private prepareScrollbar = () => {
    this.collectInfo();
    this.updateTrackVisibilities();

    // Trigger auto hider.
    this.handlerContainerScroll();
  };

  private prepareScrollbarStartPos = () => {
    const { start } = this.props;
    if (typeof start === 'string') {
      if (start.includes('bottom')) {
        this.el.scrollTop = this.el.scrollHeight;
      }
      if (start.includes('right')) {
        this.el.scrollLeft = this.el.scrollWidth;
      }
    } else if (typeof start === 'object') {
      this.el.scrollTop = start.top;
      this.el.scrollLeft = start.left;
    }
  }

  private collectInfo = () => {
    this.offsetWidth = this.el.offsetWidth;
    this.offsetHeight = this.el.offsetHeight;
  };

  private updateTrackVisibilities = () => {
    let { el } = this;
    let { scrollHeight, scrollWidth } = el;

    if (scrollHeight === this.lastScrollHeight && scrollWidth === this.lastScrollWidth) return;
    this.setState({
      showVeriticalTrack: scrollHeight > this.offsetHeight,
      showHorizontalTrack: scrollWidth > this.offsetWidth,
    });
    this.lastScrollWidth = scrollWidth;
    this.lastScrollHeight = scrollHeight;
  };

  private resetHandlerHider = () => {
    if (this.props.autohide) {
      clearTimeout(this.handlerHider);
      this.setState({ hideHandler: false });
      this.handlerHider = setTimeout(() => {
        this.setState({ hideHandler: true });
      }, this.props.timeout);
    }
  };

  private handlerContainerScroll = () => {
    this.resetHandlerHider();

    let el = this.el;
    let top =
      (el.scrollTop / (el.scrollHeight - this.offsetHeight)) *
      (1 - this.offsetHeight / this.lastScrollHeight) *
      100;
    let bottom =
      (1 -
        ((el.scrollTop + this.offsetHeight) / (el.scrollHeight - this.offsetHeight)) *
          (1 - this.offsetHeight / this.lastScrollHeight)) *
      100;
    if (bottom < 0) bottom = 0;
    let left =
      (el.scrollLeft / (el.scrollWidth - this.offsetWidth)) *
      (1 - this.offsetWidth / this.lastScrollWidth) *
      100;
    let right =
      (1 -
        ((el.scrollLeft + this.offsetWidth) / (el.scrollWidth - this.offsetWidth)) *
          (1 - this.offsetWidth / this.lastScrollWidth)) *
      100;
    if (right < 0) right = 0;
    let pos = {
      top: top,
      bottom: bottom,
      left: left,
      right: right,
    };
    this.setState({ handlerPos: pos });

    if (this.scrollbarScrollThrottle) {
      this.scrollbarScrollThrottle();
    }
  };

  private handleHandlerMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    d: Direction
  ) => {
    this.resetHandlerHider();
    this.lastContainerScrollTop = this.el.scrollTop;
    this.lastContainerScrollLeft = this.el.scrollLeft;

    this.activeHandler = d;
    this.lastMousePos = {
      top: e.clientY,
      left: e.clientX,
    };
    this.setState({ noselect: true });
  };

  private handleHandlerMouseMove = (event: MouseEvent) => {
    if (this.activeHandler === Direction.Vertical) {
      let delY = event.clientY - this.lastMousePos.top;
      this.el.scrollTop =
        this.lastContainerScrollTop + (delY / this.offsetHeight) * this.lastScrollHeight;
    }
    if (this.activeHandler === Direction.Horizontal) {
      let delX = event.clientX - this.lastMousePos.left;
      this.el.scrollLeft =
        this.lastContainerScrollLeft + (delX / this.offsetWidth) * this.lastScrollWidth;
    }
  };

  private handleHandlerMouseUp = () => {
    this.lastMousePos = null;
    this.activeHandler = null;
    this.setState({ noselect: false });
  };

  /**
   * Set the scrolling position manually.
   */
  public setPosition = (pos: {top?: number, left?: number}) => {
    if (pos.top) {
    this.el.scrollTop = pos.top;
    }
    if (pos.left) {
    this.el.scrollLeft = pos.left;
    }
  }

  public render() {
    // Dynamic styles
    let containerStyles: React.CSSProperties = {
      paddingRight: this.props.fixed
        ? 0
        : this.state.showHorizontalTrack
        ? this.props.tracksize
        : 0,
      paddingBottom: this.props.fixed
        ? 0
        : this.state.showVeriticalTrack
        ? this.props.tracksize
        : 0,
      right: `-${this.props.browserOffset}`,
      bottom: `-${this.props.browserOffset}`,
    };
    if (this.state.noselect) {
      containerStyles.userSelect = 'none';
      containerStyles.MozUserSelect = 'none';
      containerStyles.WebkitUserSelect = 'none';
      containerStyles.msUserSelect = 'none';
    }
    let verticalTrackStyles = {
      bottom: this.state.showHorizontalTrack ? this.props.tracksize : '0',
      opacity: this.state.hideHandler ? 0 : 1,
    };
    let horizontalTrackStyles = {
      right: this.state.showVeriticalTrack ? this.props.tracksize : '0',
      opacity: this.state.hideHandler ? 0 : 1,
    };
    let verticalHandlerStyles = {
      top: this.state.handlerPos.top + '%',
      bottom: this.state.handlerPos.bottom + '%',
      opacity: this.state.hideHandler ? 0 : 1,
    };
    let horizontalHandlerStyles = {
      left: this.state.handlerPos.left + '%',
      right: this.state.handlerPos.right + '%',
      opacity: this.state.hideHandler ? 0 : 1,
    };

    

    return (
      <div
        className={`FreeScrollbar ${this.props.className}`}
        style={{ ...this.props.style, ...(styles.main as React.CSSProperties) }}>
        <div
          className="FreeScrollbar-container"
          style={{ ...containerStyles, ...(styles.container as React.CSSProperties) }}
          ref={(container) => (this.el = container)}
          onScroll={this.handlerContainerScroll}>
          {this.props.children}
        </div>
        {this.state.showVeriticalTrack ? (
          <div
            className={`FreeScrollbar-vertical-track ${
              this.props.className ? this.props.className + '-vertical-track' : ''
            }`}
            style={
              this.props.className
                ? Object.assign(verticalTrackStyles, styles.track.vertical)
                : Object.assign(
                    verticalTrackStyles,
                    styles.track.vertical,
                    styles.track.verticalCustomize
                  )
            }>
            <div
              className={`FreeScrollbar-vertical-handler ${
                this.props.className ? this.props.className + '-vertical-handler' : ''
              }`}
              onMouseDown={(event) => {
                this.handleHandlerMouseDown(event, Direction.Vertical);
              }}
              style={
                this.props.className
                  ? Object.assign(verticalHandlerStyles, styles.handler.vertical)
                  : Object.assign(
                      verticalHandlerStyles,
                      styles.handler.vertical,
                      styles.handler.verticalCustomize
                    )
              }
            />
          </div>
        ) : null}
        {this.state.showHorizontalTrack ? (
          <div
            className={`FreeScrollbar-horizontal-track ${
              this.props.className ? this.props.className + '-horizontal-track' : ''
            }`}
            style={
              this.props.className
                ? Object.assign(horizontalTrackStyles, styles.track.horizontal)
                : Object.assign(
                    horizontalTrackStyles,
                    styles.track.horizontal,
                    styles.track.horizontalCustomize
                  )
            }>
            <div
              className={`FreeScrollbar-horizontal-handler ${
                this.props.className ? this.props.className + '-horizontal-handler' : ''
              }`}
              onMouseDown={(event) => {
                this.handleHandlerMouseDown(event, Direction.Horizontal);
              }}
              style={
                this.props.className
                  ? Object.assign(horizontalHandlerStyles, styles.handler.horizontal)
                  : Object.assign(
                      horizontalHandlerStyles,
                      styles.handler.horizontal,
                      styles.handler.horizontalCustomize
                    )
              }
            />
          </div>
        ) : null}
        {this.state.showHorizontalTrack && this.state.showVeriticalTrack && !this.props.fixed ? (
          <div
            className={`FreeScrollbar-square ${
              this.props.className ? this.props.className + '-square' : ''
            }`}
            style={styles.square as React.CSSProperties}
          />
        ) : null}
      </div>
    );
  }
}
