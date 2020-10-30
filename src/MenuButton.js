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
  renderButton: React.Element,
  opened: boolean,
  onKeyPress: (e: KeyboardEvent) => void,
  onMouseDown: (e: MouseEvent) => void,
  onContextMenu: (e: MouseEvent) => void,
  menu: React.Element,
  popperElement: any,
  setPopperElement: (el: any) => void,
};

export type Props = {
  type?: 'normal' | 'context',

  positionOptions: string, // popper option

  renderButton: React.ReactElement,

  children?: React.ReactElement,
  disabled?: boolean,

  menu: React.ReactElement,
  onWillOpen?: () => void,
  onDidOpen?: () => void,
  onWillClose?: () => void,
  onDidClose?: () => void,
};

export default class MenuButton extends React.Component<Props, State> {
  static defaultProps = {
    type: 'normal',
    positionOptions: {position: 'bottom', hAlign: 'left'},
  };

  state: State = {
    opened: false,
    popperEl: undefined,
  };

  _onClose: Bus<void> = kefirBus();

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

        const popper = this.state.popperEl;

        if (!popper) throw new Error('missing popper element');

        return !popper.contains(e.target);
      }),
      Kefir.fromEvents(window, 'keydown')
        .filter(e => (e.key ? e.key === 'Escape' : e.which === 27))
        .map(e => {
          e.preventDefault();
          e.stopPropagation();
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
    if (this.props.onWillClose) this.props.onWillClose();
    this.setState({opened: false, popperEl: undefined}, () => {
      if (this.props.onDidClose) this.props.onDidClose();
    });
    this._onClose.emit();
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
    if (this.props.disabled) return;

    if (this.props.type === 'context') {
      e.preventDefault();

      this.toggle();
    }
  };

  _onMouseDown = (e: MouseEvent) => {
    if (this.props.disabled) return;

    if (e.button !== 0) {
      return;
    }

    if (this.props.type === 'normal') {
      e.preventDefault();

      this.toggle();
    }
  };

  _onKeyPress = (e: KeyboardEvent) => {
    if (this.props.disabled) return;

    if (this.props.type === 'normal') {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggle();
      }
    }
  };

  componentWillUnmount() {
    this._onClose.emit();
  }

  setPopperEl = popperEl => {
    this.setState({popperEl});
  };

  render() {
    const {menu, positionOptions, children} = this.props;
    const {opened} = this.state;

    if (this.props.type === 'normal') {
      return (
        <TriggerNormal
          positionOptions={positionOptions}
          renderButton={children}
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
        />
      );
    } else {
      return (
        <TriggerContext
          positionOptions={positionOptions}
          renderButton={children}
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
        />
      );
    }
  }
}

const TriggerNormal = ({
  positionOptions,
  renderButton,
  opened,
  onKeyPress,
  onMouseDown,
  onContextMenu,
  menu,
  popperElement,
  setPopperElement,
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
      >
        {renderButton}
      </div>

      <Bg active={opened} />

      {opened ? (
        <Portal>
          <div
            ref={setPopperElement}
            style={styles.popper}
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
  opened,
  onKeyPress,
  onMouseDown,
  onContextMenu,
  menu,
  popperElement,
  setPopperElement,
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
      >
        {renderButton}
      </div>

      <Bg active={opened} />

      {opened ? (
        <Portal>
          <div
            ref={setPopperElement}
            style={styles.popper}
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

const Bg = ({active}: {active: boolean}) => (
  <div
    style={{
      display: active ? 'block' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}
  />
);
