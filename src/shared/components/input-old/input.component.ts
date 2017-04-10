import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'input-cmp',
  templateUrl: 'input.component.html'
})
export class InputComponent implements OnInit {
  @Input() isTextArea: boolean;
  @Input() label: string;
  @Input() labelHelper: string;
  @Input() characterMax: number;
  @Input() labelType: string;
  @Input() type: string;
  @Input() name: string;
  @Input() required: boolean;
  @Input() color: string;
  @Input() model: string|number;
  @Input() error: any;
  @Output() modelChange: EventEmitter<string|number> = new EventEmitter<string|number>();
  @Output() clearError = new EventEmitter();
  charsLeft: number;

  ngOnInit() {
    this.charsLeft = this.characterMax;
  }

  change(value) {
    this.model = value;
    this.modelChange.emit(value);
  }

  onKeyup(e) {
    if(this.characterMax) {
      this.charsLeft = this.characterMax - e.target.value.length;
    }
  }

  onFocus() {
    if(this.error && Object.keys(this.error).length) {
      this.clearError.emit();
    }
  }
}
