import { Component, Input, Output, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const cb = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

@Component({
  selector: 'input-cmp',
  templateUrl: 'input.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() _value: string|number;
  @Input() label: string;
  @Input() labelType: string;
  @Input() labelHelper: string;
  @Input() type: string;
  @Input() color: string;
  @Input() isTextArea: boolean;
  @Input() charMax: number;
  @Input() error: any;
  @Output() clearError = new EventEmitter();
  charsLeft: number;
  onChange: (_: any) => void = cb;
  onTouched: () => void = cb;

  ngOnInit() {
    this.charsLeft = this.charMax;
  }

  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.onChange(this._value);
    this.onTouched();
  }

  onFocus() {
    if(this.error && Object.keys(this.error).length) {
      this.clearError.emit();
    }
  }

  onKeyup(e) {
    if(this.charMax) {
      this.charsLeft = this.charMax - e.target.value.length;
    }
  }

  writeValue(value: any) {
    if(value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}