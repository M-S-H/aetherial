import { Component, ViewChild, ViewContainerRef, Input, TemplateRef, HostBinding, HostListener, ElementRef } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'av-select-overlay',
  template: `<ng-container #container></ng-container>`,
  host: { 'class': 'av-select-overlay' },
  animations: [
    trigger('slideDown', [
      state('in', style({ opacity: 1, 'transform': 'translateY(0)' })),
      transition(':enter', [
        style({ opacity: 0, 'transform': 'translateY(-5px)' }),
        animate('150ms ease-out')
      ]),
      transition(':leave', [
        animate('150ms ease-out', style({ opacity: 0, 'transform': 'translateY(-5px)' }))
      ])
    ]),
  ]
})
export class SvSelectOverlayComponent {
  // Reference to the ng-container where the select options will be injected
  @ViewChild('container', { read: ViewContainerRef }) container;

  @HostBinding('@slideDown') true;

  @Input() parent: any;

  // The select options template to be injected in the view
  private _optionsTemplate: TemplateRef<any>;
  @Input()
  get optionsTemplate() { return this._optionsTemplate; }
  set optionsTemplate(template: TemplateRef<any>) {
    if (template) {
      this._optionsTemplate = template;
      setTimeout(() => {
        this.container.createEmbeddedView(this._optionsTemplate);
      }, 0);
    }
  }

  constructor(private _elementRef: ElementRef) {}

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && !targetElement.classList.contains('av-selected-display')) {
      this.parent.open = false;
    }
  }

  @HostListener('document:keyup', ['$event'])
  public checkForEscape(event) {
    if (event.keyCode === 27) {
      this.parent.open = false;
    }
  }
}
