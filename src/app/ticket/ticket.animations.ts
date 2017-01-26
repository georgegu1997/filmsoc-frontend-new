import {
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';


export const TicketAnimations = [
  trigger('ticketLabel', [
    transition('void => *', [
      style({transform: 'translateX(-100%)',
             opacity: 0}),
      animate("400ms ease-out")
    ])
  ]),
  trigger('sidebarAnimation', [
    transition('void => *', [
      style({transform: 'translateY(-100%)',
             opacity: 0}),
      animate("400ms ease-out")
    ])
  ]),
  trigger('contentAnimation', [
    transition('void => *', [
      style({transform: 'translateY(100%)',
             opacity: 0}),
      animate("400ms ease-out")
    ])
  ])
];
