import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'game-start-countdown-cmp',
  templateUrl: 'game-start-countdown.component.html'
})
export class GameStartCountdownComponent implements OnInit {
  startNumber: number = 6;
  startText: string;
  timerInterval: any;
  isCountdownHidden: boolean = false;

  constructor(private renderer: Renderer2, private ref: ElementRef) {}

  ngOnInit() {
    this.timerInterval = setInterval(() => {
      this.animateTimer()
    },1000);
    this.animateTimer();
  }

  addClassDelayed(time: number) {
    const countdownEl = this.ref.nativeElement.firstElementChild;
    setTimeout(() => {
      this.renderer.addClass(countdownEl, 'puffer');
    }, time);
  }

  animateTimer() {
    const countdownEl = this.ref.nativeElement.firstElementChild;
    this.addClassDelayed(500);
    if (this.startNumber === 1) {
      this.startText = 'Go!';
    }

    if (this.startNumber < 1) {
      clearInterval(this.timerInterval);
      setTimeout(() => {
        this.isCountdownHidden = true;
      }, 0);
    } else {
      this.startNumber--;
    }

    this.renderer.removeClass(countdownEl, 'puffer');
  }
}