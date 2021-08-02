import { Directive, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: '[toggleActive]'
})

export class ToggleActiveDirective {
  @Input() activeClass: string;

  constructor(
    private renderer: Renderer2
  ) {}

  @HostListener('click', ['$event.target']) onToggleActiveElement(evt: Element) {
    const buttons = evt.parentElement.querySelectorAll('.btn');

    if (evt.tagName === 'BUTTON') {
      buttons.forEach(el => {
        this.removeActiveClass(el);
      });

      this.addActiveClass(evt);
    }
  };

  removeActiveClass = (el: Element): void => {
    if (el.classList.contains(`${this.activeClass}`)) {
      el.classList.remove(`${this.activeClass}`);
    }
  };

  addActiveClass = (el: Element): void => {
    if (!el.classList.contains(`${this.activeClass}`)) {
      el.classList.add(`${this.activeClass}`);
    }
  };
}
