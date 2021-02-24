/* @flow */

import MenuEvent from './MenuEvent';

export default class ChosenEvent extends MenuEvent {
  byKeyboard: boolean;

  withMeta: boolean;
  withAlt: boolean;
  withCtrl: boolean;
  withShift: boolean;
  button: ?number;

  constructor(
    type: string,
    byKeyboard: boolean,
    modifiers: {|
      withMeta: boolean,
      withAlt: boolean,
      withCtrl: boolean,
      withShift: boolean,
      button: boolean,
    |}
  ) {
    super(type);
    this.byKeyboard = byKeyboard;

    this.withMeta = modifiers.withMeta;
    this.withAlt = modifiers.withAlt;
    this.withCtrl = modifiers.withCtrl;
    this.withShift = modifiers.withShift;
    this.button = modifiers.button;
  }
}
