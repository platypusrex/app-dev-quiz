import { Directive, Input, Renderer, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[float-label]',
  host: {
    '(focus)': 'onInputEvent($event, true)',
    '(blur)': 'onInputEvent($event, false)'
  }
})
export class FloatLabelDirective implements OnChanges {
  @Input() isFloating: boolean;
  @Input() error: string;
  @Input() hasValue: any;

  constructor(private ref: ElementRef, private renderer: Renderer) {}

  ngOnChanges() {
    if(this.isFloating && this.hasValue) {
      this.setActiveClass(true);
    }
  }

  onInputEvent(e, addClass: boolean) {
    if(this.isFloating) {

      if(e.target.value.length > 0) {
        addClass = true;
      }

      this.setActiveClass(addClass);
    } else {
      e.preventDefault();
    }
  }

  setActiveClass(addClass: boolean) {
    let label = this.ref.nativeElement.parentNode.firstElementChild;
    this.renderer.setElementClass(label, 'active-input', addClass);
  }
}