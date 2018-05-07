import { Time } from '@angular/common';

export type NotificationType = 'success' | 'warning' | 'error' | 'info';

export class Toast {
  id: string;
  timeout: any;
  options: object;

  constructor(
    private type: NotificationType,
    private message: string,
    private messageList: Array<string>,
    options: object
  ) {
    this.options = options;
    this.id = Math.random().toString(36).substr(2, 9);
  }
}
