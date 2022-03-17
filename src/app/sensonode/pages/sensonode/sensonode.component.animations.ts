import { trigger, state, style, transition, animate } from '@angular/animations';

export const Component_Animations = [
    trigger('fadeInOut', [
      state('true', style({opacity: 1})),
      state('false', style({opacity: 0})),
      transition('true => false', animate('150ms')),
      transition('false => true', animate('150ms'))
    ]),
    trigger('sensorList', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        style({ opacity: 1 }),
        animate('150ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('infoPanel', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('200ms', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition('* => void', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('200ms', style({ opacity: 0, transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('commandPanel', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('200ms', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition('* => void', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('200ms', style({ opacity: 0, transform: 'translateX(-100%)' }))
      ])
    ])
  ];
