
import { trigger, state, style, animate, transition} from '@angular/animations';

export const Component_Animations = [
    trigger('hint', [
      state('void', style({
        'transform': 'translateY(-100%)',
        opacity: 0
      })),
      transition('* => *', animate(350))
    ])
  ];
