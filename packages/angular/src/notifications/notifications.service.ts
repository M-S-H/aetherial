import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { AvNotificationsOverlayComponent } from './notifications-overlay';
import { NotificationType } from './toast';

@Injectable()
export class AvNotificationsService {

  private notificationOverlay: AvNotificationsOverlayComponent;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {
    // Append notifications overlay component to body
    const componentRef = this.componentFactoryResolver.resolveComponentFactory(AvNotificationsOverlayComponent).create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // Get notications overlay component instance
    this.notificationOverlay = componentRef.instance;
  }

  addToast(type: NotificationType, message: string, options: object = null) {
    this.addListToast(type, message, [], options);
  }

  addListToast(type: NotificationType, message: string, list: Array<string>, options: object = null) {
    this.notificationOverlay.addToast(type, message, list, options);
  }
}