export class Hoverable {
  constructor(element, onMouseoverCallback, onMouseoutCallback) {
    this.element = element;
    this.onMouseoverCallback = onMouseoverCallback;
    this.onMouseoutCallback = onMouseoutCallback;
    element.hoverable = this;
    this.bindEventListeners();
  }

  bindEventListeners() {
    this.element.addEventListener('mouseover', () => {
      this.onMouseover();
      if (this.onMouseoverCallback) {
        this.onMouseoverCallback();
      }
    });
    this.element.addEventListener('mouseout', () => {
      this.onMouseout();
      if (this.onMouseoutCallback) {
        this.onMouseoutCallback();
      }
    });
  }

  onMouseover() {
    this.element.classList.add('hover');
  }

  onMouseout() {
    this.element.classList.remove('hover');
  }
}
