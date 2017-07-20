import {
  style,
  state,
  transition,
  animate,
  keyframes,
  trigger
} from '@angular/animations';
import { AnimationEntryMetadata } from '@angular/core';
export const fadeInOut: AnimationEntryMetadata = trigger('fadeInOut', [
  state('in', style({opacity: 1})),
  transition('* => in', [
    animate(250, keyframes([
      style({
        opacity: 0,
        offset: 0
      }),
      style({
        opacity: 1,
        offset: 1
      })
    ]))
  ]),
  state('out', style({opacity: 0})),
  transition('in => out', [
    animate(250, keyframes([
      style({
        opacity: 1,
        offset: 1
      }),
      style({
        opacity: 0,
        offset: 0
      })
    ]))
  ])
]);

export const fadeInOutOnEnterLeave:AnimationEntryMetadata = trigger('fadeInOutOnEnterLeave', [
  transition(':enter', [
    animate(300, keyframes([
      style({opacity: 0, offset: 0}),
      style({opacity: 1, offset: 1})
    ]))
  ]),
  transition(':leave', [
    animate(200, keyframes([
      style({opacity: 1, offset: 0}),
      style({opacity: 0, offset: 1})
    ]))
  ])
]);

export const zoomInOut: AnimationEntryMetadata = trigger('zoomInOut', [
  transition(':enter', [
    animate(500, keyframes([
      style({
        opacity: 0,
        offset: 0
      }),
      style({
        opacity: 0,
        transform: 'scale3d(0.3, 0.3, 0.3)',
        '-webkit-transform': 'scale3d(0.3, 0.3, 0.3)',
        offset: 0.5
      }),
      style({
        opacity: 1,
        offset: 1
      })
    ]))
  ]),
  transition(':leave', [
    animate(500, keyframes([
      style({
        opacity: 1,
        offset: 0
      }),
      style({
        opacity: 0,
        transform: 'scale3d(0.3, 0.3, 0.3)',
        '-webkit-transform': 'scale3d(0.3, 0.3, 0.3)',
        offset: 0.5
      }),
      style({
        opacity: 0,
        offset: 1
      })
    ]))
  ])
]);

export const rollInOut: AnimationEntryMetadata = trigger('rollInOut', [
  transition(':enter', [
    animate(500, keyframes([
      style({
        opacity: 0,
        '-webkit-transform': 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)',
        transform: 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)',
        offset: 0
      }),
      style({
        opacity: 1,
        '-webkit-transform': 'none',
        transform: 'none',
        offset: 1
      })
    ]))
  ]),
  transition(':leave', [
    animate(500, keyframes([
      style({
        opacity: 1,
        offset: 0
      }),
      style({
        opacity: 0,
        '-webkit-transform': 'translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)',
        transform: 'translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)',
        offset: 1
      })
    ]))
  ])
]);

export const bounceInOut: AnimationEntryMetadata = trigger('bounceInOut', [
  transition(':enter', [
    animate(350, keyframes([
      style({
        opacity: 0,
        '-webkit-transform': 'translate3d(-750px, 0, 0)' ,
        transform: 'translate3d(-750px, 0, 0)',
        offset: 0
      }),
      style({
        opacity: 1,
        '-webkit-transform':
          'translate3d(25px, 0, 0)',
        transform: 'translate3d(25px, 0, 0)',
        offset: 0.6
      }),
      style({
        '-webkit-transform': 'translate3d(-10px, 0, 0)',
        transform: 'translate3d(-10px, 0, 0)',
        offset: 0.75
      }),
      style({
        '-webkit-transform': 'translate3d(5px, 0, 0)',
        transform: 'translate3d(5px, 0, 0)',
        offset: 0.9
      }),
      style({
        '-webkit-transform': 'none',
        transform: 'none',
        offset: 1
      })
    ]))
  ]),
  transition(':leave', [
    animate(350, keyframes([
      style({
        opacity: 1,
        '-webkit-transform': 'translate3d(20px, 0, 0)',
        transform: 'translate3d(20px, 0, 0)',
        offset: 0.2
      }),
      style({
        opacity: 0,
        '-webkit-transform': 'translate3d(-2000px, 0, 0)',
        transform: 'translate3d(-2000px, 0, 0)',
        offset: 1
      })
    ]))
  ])
]);

export const fadeInRightOutLeft: AnimationEntryMetadata = trigger('fadeInRightOutLeft', [
  transition(':enter', [
    animate(350, keyframes([
      style({
        opacity: 0,
        '-webkit-transform': 'translate3d(-2000px, 0, 0)',
        transform: 'translate3d(-2000px, 0, 0)',
        offset: 0
      }),
      style({
        opacity: 1,
        'webkit-transform': 'none',
        transform: 'none',
        offset: 1
      })
    ]))
  ]),
  transition(':leave', [
    animate(350, keyframes([
      style({
        opacity: 1,
        offset: 0
      }),
      style({
        opacity: 0,
        'webkit-transform': 'translate3d(-2000px, 0, 0)',
        transform: 'translate3d(-2000px, 0, 0)',
        offset: 1
      })
    ]))
  ])
]);

export const slideInDownOutUp: AnimationEntryMetadata = trigger('slideInDownOutUp', [
  transition(':enter', [
    animate(350, keyframes([
      style({
        '-webkit-transform': 'translate3d(0, -100%, 0)',
        transform: 'translate3d(0, -100%, 0)',
        opacity: 0,
        offset: 0
      }),
      style({
        opacity: 0,
        offset: .75
      }),
      style({
        '-webkit-transform': 'none',
        transform: 'none',
        opacity: 1,
        offset: 1
      })
    ]))
  ]),
  transition(':leave', [
    animate(350, keyframes([
      style({
        '-webkit-transform': 'translate3d(0, 0, 0)',
        transform: 'translate3d(0, 0, 0)',
        opacity: 1,
        offset: 0
      }),
      style({
        opacity: 0,
        offset: 0.15
      }),
      style({
        opacity: 0,
        '-webkit-transform': 'translate3d(0, -100%, 0)',
        transform: 'translate3d(0, -100%, 0)',
        offset: 1
      })
    ]))
  ])
]);

export const slideInDown:AnimationEntryMetadata = trigger('slideInDown', [
  transition(':enter', [
    animate(350, keyframes([
      style({
        '-webkit-transform': 'translate3d(0, -100%, 0)',
        transform: 'translate3d(0, -100%, 0)',
        opacity: 0,
        offset: 0
      }),
      style({
        opacity: 0,
        offset: .75
      }),
      style({
        '-webkit-transform': 'none',
        transform: 'none',
        opacity: 1,
        offset: 1
      })
    ]))
  ])
]);
