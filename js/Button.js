export class Button {
  constructor(element) {
    this.element = element;
    this.element.addEventListener('click', this.onClick.bind(this));
  }

  onClick() {
    alert('Button clicked!');
  }
}
