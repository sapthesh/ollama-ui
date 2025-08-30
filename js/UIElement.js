import { DOM } from './Dom.js';

export class UIElement {
  constructor(element) {
    this.element = element;
  }

  show() {
    DOM.showElement(this.element);
  }

  hide() {
    DOM.hideElement(this.element);
  }
}
