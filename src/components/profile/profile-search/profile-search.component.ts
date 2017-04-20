import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'profile-search-cmp',
  templateUrl: 'profile-search.component.html'
})
export class ProfileSearchComponent {
  @Input() query: string;
  @Output() emitOnInput: EventEmitter<string> = new EventEmitter<string>();
  @Output() emitOnFocus = new EventEmitter();

  onInput(e) {
    this.emitOnInput.emit(e.target.value);
  }

  onFocus() {
    this.emitOnFocus.emit()
  }
}