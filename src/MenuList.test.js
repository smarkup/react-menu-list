/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import {MenuList, MenuItem} from '.';

afterEach(() => {
  delete window.addEventListener;
  delete window.removeEventListener;
});

test('cursor movement works', () => {
  window.addEventListener = jest.fn(window.addEventListener);
  window.removeEventListener = jest.fn(window.removeEventListener);

  const mountPoint = document.createElement('div');
  const root: MenuList = (ReactDOM.render(
    <MenuList>
      <MenuItem onHighlightChange={jest.fn()}>A</MenuItem>
      <div>
        <MenuItem onHighlightChange={jest.fn()}>B</MenuItem>
      </div>
      <MenuItem onHighlightChange={jest.fn()}>C</MenuItem>
    </MenuList>,
    mountPoint
  ): any);

  const menuListItems = TestUtils.scryRenderedComponentsWithType(
    root,
    MenuItem
  );

  expect(menuListItems.map(c => c.props.children)).toEqual(['A', 'B', 'C']);

  const keydownCaptureHandlers = window.addEventListener.mock.calls
    .filter(args => args[0] === 'keydown' && args[2])
    .map(args => args[1]);
  expect(keydownCaptureHandlers.length).toBe(1);

  expect(menuListItems[0].props.onHighlightChange.mock.calls).toEqual([]);
  expect(menuListItems[1].props.onHighlightChange.mock.calls).toEqual([]);
  expect(menuListItems[2].props.onHighlightChange.mock.calls).toEqual([]);

  keydownCaptureHandlers[0]({
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    key: 'ArrowDown',
    which: 40,
    target: document.body,
  });

  expect(menuListItems[0].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
  ]);
  expect(menuListItems[1].props.onHighlightChange.mock.calls).toEqual([]);
  expect(menuListItems[2].props.onHighlightChange.mock.calls).toEqual([]);

  keydownCaptureHandlers[0]({
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    key: 'ArrowDown',
    which: 40,
    target: document.body,
  });

  expect(menuListItems[0].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
  ]);
  expect(menuListItems[1].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
  ]);
  expect(menuListItems[2].props.onHighlightChange.mock.calls).toEqual([]);

  keydownCaptureHandlers[0]({
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    key: 'ArrowDown',
    which: 40,
    target: document.body,
  });

  expect(menuListItems[0].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
  ]);
  expect(menuListItems[1].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
  ]);
  expect(menuListItems[2].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
  ]);

  keydownCaptureHandlers[0]({
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    key: 'ArrowDown',
    which: 40,
    target: document.body,
  });

  expect(menuListItems[0].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
  ]);
  expect(menuListItems[1].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
  ]);
  expect(menuListItems[2].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
  ]);

  // Up time

  keydownCaptureHandlers[0]({
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    key: 'ArrowUp',
    which: 38,
    target: document.body,
  });

  expect(menuListItems[0].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
  ]);
  expect(menuListItems[1].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
  ]);
  expect(menuListItems[2].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
    [true, {byKeyboard: true, prevCursorLocation: undefined, direction: 'up'}],
  ]);

  keydownCaptureHandlers[0]({
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    key: 'ArrowUp',
    which: 38,
    target: document.body,
  });

  expect(menuListItems[0].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
  ]);
  expect(menuListItems[1].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
    [true, {byKeyboard: true, prevCursorLocation: undefined, direction: 'up'}],
  ]);
  expect(menuListItems[2].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
    [true, {byKeyboard: true, prevCursorLocation: undefined, direction: 'up'}],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
  ]);

  root.moveCursor('up', {top: 5, bottom: 6, left: 7, right: 8});

  expect(menuListItems[0].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
    [
      true,
      {
        byKeyboard: true,
        prevCursorLocation: {top: 5, bottom: 6, left: 7, right: 8},
        direction: 'up',
      },
    ],
  ]);
  expect(menuListItems[1].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
    [true, {byKeyboard: true, prevCursorLocation: undefined, direction: 'up'}],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
  ]);
  expect(menuListItems[2].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
    [true, {byKeyboard: true, prevCursorLocation: undefined, direction: 'up'}],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
  ]);

  ReactDOM.unmountComponentAtNode(mountPoint);
});

test('index prop change is respected', () => {
  const mountPoint = document.createElement('div');
  const root: MenuList = (ReactDOM.render(
    <MenuList>
      <MenuItem onHighlightChange={jest.fn()}>A</MenuItem>
      <div>
        <MenuItem onHighlightChange={jest.fn()}>B</MenuItem>
      </div>
      <MenuItem onHighlightChange={jest.fn()}>C</MenuItem>
    </MenuList>,
    mountPoint
  ): any);

  const menuListItems = TestUtils.scryRenderedComponentsWithType(
    root,
    MenuItem
  );

  expect(menuListItems.map(c => c.props.children)).toEqual(['A', 'B', 'C']);

  expect(menuListItems[0].props.onHighlightChange.mock.calls).toEqual([]);
  expect(menuListItems[1].props.onHighlightChange.mock.calls).toEqual([]);
  expect(menuListItems[2].props.onHighlightChange.mock.calls).toEqual([]);

  root.moveCursor('down');

  expect(menuListItems[0].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
  ]);
  expect(menuListItems[1].props.onHighlightChange.mock.calls).toEqual([]);
  expect(menuListItems[2].props.onHighlightChange.mock.calls).toEqual([]);

  root.moveCursor('down');

  expect(menuListItems[0].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
  ]);
  expect(menuListItems[1].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
  ]);
  expect(menuListItems[2].props.onHighlightChange.mock.calls).toEqual([]);

  ReactDOM.render(
    <MenuList>
      <MenuItem
        index={5}
        onHighlightChange={menuListItems[0].props.onHighlightChange}
      >
        A
      </MenuItem>
      <div>
        <MenuItem
          index={4}
          onHighlightChange={menuListItems[1].props.onHighlightChange}
        >
          B
        </MenuItem>
      </div>
      <MenuItem
        index={3}
        onHighlightChange={menuListItems[2].props.onHighlightChange}
      >
        C
      </MenuItem>
    </MenuList>,
    mountPoint
  );

  root.moveCursor('down');

  expect(menuListItems[0].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
  ]);
  expect(menuListItems[1].props.onHighlightChange.mock.calls).toEqual([
    [
      true,
      {byKeyboard: true, prevCursorLocation: undefined, direction: 'down'},
    ],
    [
      false,
      {
        byKeyboard: undefined,
        prevCursorLocation: undefined,
        direction: undefined,
      },
    ],
  ]);
  expect(menuListItems[2].props.onHighlightChange.mock.calls).toEqual([]);

  ReactDOM.unmountComponentAtNode(mountPoint);
});

test('empty list works', () => {
  const mountPoint = document.createElement('div');
  const root: MenuList = (ReactDOM.render(
    <MenuList></MenuList>,
    mountPoint
  ): any);

  root.moveCursor('up');
  root.moveCursor('down');

  ReactDOM.unmountComponentAtNode(mountPoint);
});
