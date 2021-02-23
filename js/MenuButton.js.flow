/* @flow */

import * as React from 'react';
import Kefir from 'kefir';
import kefirBus from 'kefir-bus';
import type {Bus} from 'kefir-bus';
import fromEventsCapture from './lib/fromEventsCapture';
import MenuListInspector from './MenuListInspector';
import {usePopper} from 'react-popper';
import Portal from './Portal';

type State = {
  opened: boolean,
};

type TriggerProps = {
  positionOptions: string,
  children?: React.ReactElement,
  renderButton?: (opened: boolean) => React.ReactElement,
  opened: boolean,
  onKeyPress: (e: KeyboardEvent) => void,
  onMouseDown: (e: MouseEvent) => void,
  onContextMenu: (e: MouseEvent) => void,
  menu: React.Element,
  popperElement: any,
  setPopperElement: (el: any) => void,
  bgRef: (el: any) => void,
  style: any,
  menuZIndex?: number,
};

export type Props = {
  type?: 'normal' | 'context',

  children?: React.ReactElement,
  renderButton?: (opened: boolean) => React.ReactElement,
  menu: React.ReactElement,

  onWillOpen?: () => void,
  onDidOpen?: () => void,
  onWillClose?: () => void,
  onDidClose?: () => void,

  disabled?: boolean,
  positionOptions?: string, // popper option
  style: any,
  menuZIndex?: number,
};

export default class MenuButton extends React.Component<Props, State> {
  static defaultProps = {
    type: 'normal',
  };

  state: State = {
    opened: false,
    popperEl: undefined,
  };

  _onClose: Bus<void> = kefirBus();
  _bgRef = React.createRef<HTMLElement>();

  open = (): Promise<void> => {
    if (this.state.opened) return Promise.resolve();
    if (this.props.onWillOpen) this.props.onWillOpen();

    // Clicking outside of the dropdown or pressing escape should close the
    // dropdown.
    Kefir.merge([
      Kefir.merge([
        fromEventsCapture(window, 'mousedown'),
        fromEventsCapture(window, 'focus'),
      ]).filter(e => {
        if (!e.target) return true;

        if (e.target.nodeType !== 1) return true; // not an element

        if (e.target === this._bgRef.current) {
          e.preventDefault(); // it messes with focus
          return true;
        }

        const popper = this.state.popperEl;
        return !popper.contains(e.target);
      }),
      fromEventsCapture(window, 'keydown').filter(e => {
        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          return true;
        } else {
          return false;
        }
      }),
      Kefir.fromEvents(window, 'blur'),
    ])
      .takeUntilBy(this._onClose)
      .onValue(() => {
        this.close();
      });

    return new Promise(resolve => {
      this.setState({opened: true}, () => {
        if (this.props.onDidOpen) this.props.onDidOpen();
        resolve();
      });
    });
  };

  close = () => {
    if (!this.state.opened) return;

    this._bgRef.current = undefined;
    this._onClose.emit();

    if (this.props.onWillClose) this.props.onWillClose();

    this.setState({opened: false, popperEl: undefined}, () => {
      if (this.props.onDidClose) this.props.onDidClose();
    });
  };

  toggle = () => {
    if (this.state.opened) {
      this.close();
    } else {
      this.open();
    }
  };

  reposition = () => {
    // noop for now
  };

  _onContextMenu = (e: MouseEvent) => {
    if (this.props.disabled || this.props.type !== 'context') return;

    e.preventDefault();
    e.stopPropagation();
    this.toggle();
  };

  _onMouseDown = (e: MouseEvent) => {
    if (this.props.disabled || this.props.type !== 'normal') return;

    if (e.button === 0) {
      e.preventDefault();
      e.stopPropagation();
      this.toggle();
    }
  };

  _onKeyPress = (e: KeyboardEvent) => {
    if (this.props.disabled || this.props.type !== 'normal') return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggle();
    }
  };

  componentWillUnmount() {
    this._onClose.emit();
  }

  setPopperEl = popperEl => {
    this.setState({popperEl});
  };

  render() {
    const {
      menu,
      positionOptions,
      children,
      renderButton,
      style,
      menuZIndex,
    } = this.props;
    const {opened} = this.state;

    const TriggerImpl =
      this.props.type === 'normal' ? TriggerNormal : TriggerContext;

    return (
      <TriggerImpl
        positionOptions={positionOptions}
        renderButton={renderButton}
        opened={opened}
        onKeyPress={this._onKeyPress}
        onMouseDown={this._onMouseDown}
        onContextMenu={this._onContextMenu}
        menu={
          <MenuListInspector onItemChosen={this.close}>
            {menu}
          </MenuListInspector>
        }
        setPopperElement={this.setPopperEl}
        popperElement={this.state.popperEl}
        style={style}
        menuZIndex={menuZIndex}
        bgRef={this._bgRef}
      >
        {children}
      </TriggerImpl>
    );
  }
}

const TriggerNormal = ({
  positionOptions,
  renderButton,
  children,
  opened,
  onKeyPress,
  onMouseDown,
  onContextMenu,
  menu,
  popperElement,
  setPopperElement,
  style,
  menuZIndex,
  bgRef,
}: TriggerProps) => {
  const [referenceElement, setReferenceElement] = React.useState(null);
  const {styles, attributes} = usePopper(
    referenceElement,
    popperElement,
    popperOptions(positionOptions)
  );

  return (
    <>
      <div
        ref={setReferenceElement}
        onKeyPress={onKeyPress}
        onMouseDown={onMouseDown}
        onContextMenu={onContextMenu}
        style={style}
      >
        {renderButton ? renderButton(opened) : children}
      </div>

      {opened ? (
        <Portal>
          <Bg zIndex={menuZIndex} setRef={bgRef} />
          <div
            ref={setPopperElement}
            style={{...styles.popper, zIndex: menuZIndex}}
            {...attributes.popper}
          >
            {menu}
          </div>
        </Portal>
      ) : null}
    </>
  );
};

const TriggerContext = ({
  positionOptions,
  renderButton,
  children,
  opened,
  onKeyPress,
  onMouseDown,
  onContextMenu,
  menu,
  popperElement,
  setPopperElement,
  style,
  menuZIndex,
  bgRef,
}: TriggerProps) => {
  const {styles, attributes, update} = usePopper(
    virtualElement,
    popperElement,
    popperOptions(positionOptions, true)
  );

  return (
    <>
      <div
        onKeyPress={onKeyPress}
        onMouseDown={onMouseDown}
        onContextMenu={e => {
          virtualElement.getBoundingClientRect = generateGetBoundingClientRect(
            e.clientX,
            e.clientY
          );

          if (update) {
            update();
          }

          onContextMenu(e);
        }}
        style={style}
      >
        {renderButton ? renderButton(opened) : children}
      </div>

      {opened ? (
        <Portal>
          <Bg zIndex={menuZIndex} setRef={bgRef} />
          <div
            ref={setPopperElement}
            style={{...styles.popper, zIndex: menuZIndex}}
            {...attributes.popper}
          >
            {menu}
          </div>
        </Portal>
      ) : null}
    </>
  );
};

const popperOptions = (placement, forContextMenu = false) => ({
  placement,
  modifiers: [
    {name: 'offset', options: {offset: forContextMenu ? [0, 2] : []}},
    {name: 'preventOverflow', options: {padding: 5}},
  ],
  strategy: 'fixed',
});

function generateGetBoundingClientRect(x = 0, y = 0) {
  return () => ({
    width: 0,
    height: 0,
    top: y,
    left: x,
    bottom: y,
    right: x,
  });
}

const virtualElement = {
  getBoundingClientRect: generateGetBoundingClientRect(),
};

const Bg = ({setRef, zIndex}: {zIndex?: number, setRef: any}) => (
  <div
    ref={setRef}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex,
      background: 'rgba(255,255,255,0.01)', // mitigate cursor flickering/jumping
    }}
  />
);
