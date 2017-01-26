import {
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

export const ShowAnimations = [
  trigger('mainAnimation', [
    transition("void => *", [
      style({transform: 'translateX(-100%)', opacity: 0}),
      animate('400ms ease-out')
    ]),
    transition("* => void", [
      animate('400ms ease-in', style({
        transform: 'translateX(100%)',
        opacity: 0
      }))
    ])
  ]),
  trigger('routeAnimation', [
    transition("* => void", [
      animate('400ms ease-in', style({
        transform: 'translateX(100%)',
        opacity: 0
      }))
    ])
  ])
]
