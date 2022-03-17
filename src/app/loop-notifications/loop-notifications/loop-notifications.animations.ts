import { animate, state, trigger, transition, style } from '@angular/animations';


export const Component_Animations =  [
    trigger('banner', [
      state('void', style({
        'transform': 'translateY(-100%)',
        opacity: 0
      })),
      transition('* => *', animate(350))
    ])
  ];
