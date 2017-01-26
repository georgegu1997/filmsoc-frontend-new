import {
  Input,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/core';

export const NotificationAnimations = [
  trigger('Notification', [
    transition('void => *', [
      animate(350, keyframes([
        style({opacity:0, transform: "scale(0)", offset:0}),
        style({opacity:1, transform: "scale(1.3)", offset:0.7}),
        style({opacity:1, transform: "scale(1)", offset:1})
      ]))
    ]),
    transition('* => void', [
      animate(300, keyframes([
        style({opacity:0, transform: "scale(0)", offset:1})
      ]))
    ])
  ])
];
