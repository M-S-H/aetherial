import { Directive, Input, ElementRef } from '@angular/core';

class RippleMaker {
  // The container that holds the ripple elements
  private _container: HTMLElement;

  constructor(container: HTMLElement) {
    this._container = container;
  }

  ripple(x, y) {
    const ripple = document.createElement('div');
    ripple.classList.add('av-ripple-enter');

    // Determine click position relative to the container element
    const rect = this._container.getBoundingClientRect();
    const xPos = x - rect.left;
    const yPos = y - rect.top;

    // Determine distance to farthest corner
    const corners = [[0, 0], [0, rect.height], [rect.width, 0], [rect.width, rect.height]];
    const maxDistance = Math.max(...corners.map(c => {
      return Math.sqrt(((c[0] - xPos) ** 2) + ((c[1] - yPos) ** 2));
    }));

    // Set ripple styles
    this._container.appendChild(ripple);
    ripple.style.width = maxDistance + 'px';
    ripple.style.height = maxDistance + 'px';
    ripple.style.left = (xPos - (maxDistance / 2)) + 'px';
    ripple.style.top = (yPos - (maxDistance / 2)) + 'px';

    // Add active class to begin animation
    setTimeout(() => {
      ripple.classList.add('av-ripple-active');
    }, 0);

    // Add leave class to fade out
    setTimeout(() => {
      ripple.classList.add('av-ripple-leave');

      // Remove the ripple element
      setTimeout(() => {
        this._container.removeChild(ripple);
      }, 450);
    }, 300);
  }
}

@Directive({
  selector: '[avRipple]',
  host: { 'class': 'av-ripple' }
})
export class AvRippleDirective {
  // Element to trigger ripple on mouseup event
  // Defaults to the host element
  private _trigger: HTMLElement;

  // Element that serves as the container for the ripple
  // private _container: HTMLElement;
  private _rippler: RippleMaker;

  // Getter and setter for the trigger element
  @Input()
  get trigger() { return this._trigger; }
  set trigger(newElement: HTMLElement) {
    // Remove event listener from old trigger
    if (this._trigger !== undefined) {
      this._trigger.removeEventListener('mouseup', (e: MouseEvent) => { this._rippler.ripple(e.clientX, e.clientY); });
    }

    // Add event listener to new trigger
    if (newElement !== undefined) {
      this._trigger = newElement;
      this._trigger.addEventListener('mouseup', (e: MouseEvent) => { this._rippler.ripple(e.clientX, e.clientY); });
    }
  }

  constructor(public elementRef: ElementRef) {
    this._rippler = new RippleMaker(elementRef.nativeElement);
    this.trigger = elementRef.nativeElement;
  }
}
