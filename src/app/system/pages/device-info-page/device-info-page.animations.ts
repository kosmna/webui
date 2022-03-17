import { transition, trigger, stagger, style, animate , query} from '@angular/animations';

export const Device_Info_Animations = [
    trigger('cardAnimations', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: 'translateX(-30px)' })),
        query(':enter', stagger('100ms', [
          animate('250ms 100ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ])),
      ])
    ])
  ];
