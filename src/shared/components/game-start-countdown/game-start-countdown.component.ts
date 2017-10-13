import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'game-start-countdown-cmp',
  templateUrl: 'game-start-countdown.component.html'
})
export class GameStartCountdownComponent implements OnInit {
  startNum: number;
  currentNum: number;
  startText: string;
  timerInterval: any;

  constructor(private renderer: Renderer2, private ref: ElementRef) {
    this.startNum = 6;
    this.currentNum = this.startNum;
  }

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
    if (this.currentNum === 1) {
      this.startText = 'Go!';
      clearInterval(this.timerInterval);
    } else {
      this.currentNum--;
    }
    this.renderer.removeClass(countdownEl, 'puffer');
  }
}