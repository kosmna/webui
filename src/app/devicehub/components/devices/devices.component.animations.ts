import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const Component_Animations =  [
    trigger('scaleInOut', [
      state('in', style({opacity: 1, transform: 'scale(1)'})),
      transition('void => created', [
        animate(300, keyframes([
          style({opacity: 0, transform: 'scale(0)', offset: 0}),
          style({opacity: 1, transform: 'scale(1.1)',  offset: 0.3}),
          style({opacity: 1, transform: 'scale(1)',     offset: 1.0})
        ]))
      ]),
      transition('destroyed => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'scale(1)', offset: 0}),
          style({opacity: 1, transform: 'scale(1.1)',  offset: 0.3}),
          style({opacity: 0, transform: 'scale(0)',     offset: 1.0})
        ]))
      ])
    ])
  ];
