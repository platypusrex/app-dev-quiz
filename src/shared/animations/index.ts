import { trigger } from '@angular/animations';
import { AnimationEntryMetadata } from '@angular/core';

import { attentionSeeker } from './animate/attentionSeeker';
import { bounce } from './animate/bounce';
import { fade } from './animate/fade';
import { flip } from './animate/flip';
import { lightSpeed } from './animate/lightSpeed';
import { rotate } from './animate/rotate';
import { slide } from './animate/slide';
import { special } from './animate/special';
import { zoom } from './animate/zoom';

export const animations = (duration: string|number = 500, delay: string|number = 0, easing: string = 'linear') => {
  let timing: string = [
    typeof(duration) === 'number' ? `${duration}ms` : duration,
    typeof(delay) === 'number' ? `${delay}ms` : delay,
    easing
  ].join(' ');

  return trigger('animate', [
    ...attentionSeeker(timing),
    ...bounce(timing),
    ...fade(timing),
    ...flip(timing),
    ...lightSpeed(timing),
    ...rotate(timing),
    ...slide(timing),
    ...special(timing),
    ...zoom(timing)
  ]);
};