import {
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

export const DiskAnimations = [
  trigger('sidebarAnimation', [
    transition('void => *', [
      style({transform: 'translateY(-100%)',
             opacity: 0}),
      animate("300ms ease-out")
    ])
  ]),
]
