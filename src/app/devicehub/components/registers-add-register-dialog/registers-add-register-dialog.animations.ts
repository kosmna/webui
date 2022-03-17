import { animate, state, trigger, transition, style, query, keyframes } from '@angular/animations';

export const Component_Animations = [
    trigger('hint', [
      state('void', style({
        'transform': 'translateY(-100%)',
        opacity: 0
      })),
      transition('* => *', animate(350))
    ]),
    trigger('table', [
      transition('* =>  void', [
          animate('100ms ease-in', keyframes([
            style({opacity: 1}),
            style({opacity: .75}),
            style({opacity: 0}),
          ]))
      ]),
      transition('void =>  *', [
        animate('100ms ease-in', keyframes([
          style({opacity: 0}),
          style({opacity: .75}),
          style({opacity: 1}),
        ]))
      ])
    ])
  ];
