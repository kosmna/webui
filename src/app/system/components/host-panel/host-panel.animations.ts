
import {
    animate,
    trigger,
    transition,
    style,
    keyframes
  } from '@angular/animations';
/**
 * Animations for host-panel
 */
export const Host_Panel_Animations = [
    trigger('editPanel', [
        transition('0 => 1', animate('150ms ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-20%) scaleY(.5)' }),
            style({opacity: 1, transform: 'translateY(0) scaleY(1)' })
          ]))),

        transition('1 => 0', animate('150ms ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(20%) scaleY(.5)'}),
            style({opacity: 1, transform: 'translateY(0) scaleY(1)' })
          ])))
    ])

];
