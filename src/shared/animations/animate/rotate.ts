import {
  style,
  state,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { AnimationMetadata } from '@angular/core';

export const rotate = (timing:string) => [
  state('rotateOut', style({
    display: 'none'
  })),
  state('rotateOutDownLeft', style({
    display: 'none'
  })),
  state('rotateOutDownRight', style({
    display: 'none'
  })),
  state('rotateOutUpLeft', style({
    display: 'none'
  })),
  state('rotateOutUpRight', style({
    display: 'none'
  })),
  transition('* => rotateIn', [
    animate(timing, keyframes([
      style({opacity: 0, transformOrigin: 'center', transform: 'rotate3d(0, 0, 1, -200deg)', offset: 0}),
      style({opacity: 1, transformOrigin: 'center', transform: 'rotate3d(0, 0, 1, 0deg)', offset: 1})
    ]))
  ]),
  transition('rotateIn => void, * => rotateOut', [
    animate(timing, keyframes([
      style({opacity: 1, transformOrigin: 'center', transform: 'rotate3d(0, 0, 1, 0deg)', offset: 0}),
      style({opacity: 0, transformOrigin: 'center', transform: 'rotate3d(0, 0, 1, 200deg)', offset: 1})
    ]))
  ]),
  transition('* => rotateInDown', [
    animate(timing, keyframes([
      style({opacity: 0, transformOrigin: 'left bottom', transform: 'rotate3d(0, 0, 1, -45deg)', offset: 0}),
      style({opacity: 1, transformOrigin: 'left bottom', transform: 'rotate3d(0, 0, 1, 0deg)', offset: 1})
    ]))
  ]),
  transition('rotateInDown => void, * => rotateOutDownLeft', [
    animate(timing, keyframes([
      style({opacity: 1, transformOrigin: 'left bottom', transform: 'rotate3d(0, 0, 1, 0deg)', offset: 0}),
      style({opacity: 0, transformOrigin: 'left bottom', transform: 'rotate3d(0, 0, 1, 45deg)', offset: 1})
    ]))
  ]),
  transition('* => rotateInRight', [
    animate(timing, keyframes([
      style({opacity: 0, transformOrigin: 'right bottom', transform: 'rotate3d(0, 0, 1, 45deg)', offset: 0}),
      style({opacity: 1, transformOrigin: 'right bottom', transform: 'rotate3d(0, 0, 1, 0deg)', offset: 1})
    ]))
  ]),
  transition('rotateInRight => void, * => rotateOutDownRight', [
    animate(timing, keyframes([
      style({opacity: 1, transformOrigin: 'right bottom', transform: 'rotate3d(0, 0, 1, 0deg)', offset: 0}),
      style({opacity: 0, transformOrigin: 'right bottom', transform: 'rotate3d(0, 0, 1, -45deg)', offset: 1})
    ]))
  ]),
  transition('* => rotateInLeft', [
    animate(timing, keyframes([
      style({opacity: 0, transformOrigin: 'left bottom', transform: 'rotate3d(0, 0, 1, 45deg)', offset: 0}),
      style({opacity: 1, transformOrigin: 'left bottom', transform: 'rotate3d(0, 0, 1, 0deg)', offset: 1})
    ]))
  ]),
  transition('rotateInLeft => void, * => rotateOutUpLeft', [
    animate(timing, keyframes([
      style({opacity: 1, transformOrigin: 'left bottom', transform: 'rotate3d(0, 0, 1, 0deg)', offset: 0}),
      style({opacity: 0, transformOrigin: 'left bottom', transform: 'rotate3d(0, 0, 1, -45deg)', offset: 1})
    ]))
  ]),
  transition('* => rotateInUp', [
    animate(timing, keyframes([
      style({opacity: 0, transformOrigin: 'right bottom', transform: 'rotate3d(0, 0, 1, -45deg)', offset: 0}),
      style({opacity: 1, transformOrigin: 'right bottom', transform: 'rotate3d(0, 0, 1, 0deg)', offset: 1})
    ]))
  ]),
  transition('rotateInUp => void, * => rotateOutUpRight', [
    animate(timing, keyframes([
      style({opacity: 1, transformOrigin: 'right bottom', transform: 'rotate3d(0, 0, 1, 0deg)', offset: 0}),
      style({opacity: 0, transformOrigin: 'right bottom', transform: 'rotate3d(0, 0, 1, 45deg)', offset: 1})
    ]))
  ])
];