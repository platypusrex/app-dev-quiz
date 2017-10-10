import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-bar-cmp',
  templateUrl: 'progress-bar.component.html'
})
export class ProgressBarComponent {
  @Input() progress: number;
  @Input() startingNumber: number;
  @Input() isPercentage: boolean;

  getProgressBarPercentage(progress: number) {
    return 100 / (this.startingNumber / this.progress);
  }
}