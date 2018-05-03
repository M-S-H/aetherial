import {
  Component,
  Input,
  Renderer2,
  ElementRef,
  HostBinding,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  ComponentRef,
  EmbeddedViewRef,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { SvSelectOverlayComponent } from './select-overlay';
import { AvBase } from '../shared/base';

@Component({
  selector: 'av-select',
  templateUrl: 'select.html',
  host: { 'class': 'av-select' }
})
export class AvSelectComponent extends AvBase {
  // Whether the list contains objects
  objectList = false;

  // Options to be displayed
  private _items: Array<any>;
  @Input()
  get items() { return this._items; }
  set items(list: Array<any>) {
    this.objectList = typeof list[0] === 'object';
    this._items = list;
  }

  // Items filtered by search term
  private filteredItems: Array<any>;

  // Option to make passed in items searchable
  @Input() searchable = false;

  // Text to be displayed when nothing is selected
  @Input() placeholder = 'Select One';

  // Reference to the select options template
  @ViewChild('options') options: TemplateRef<any>;
  @ViewChild('search') searchField;

  @ViewChild('display') display: TemplateRef<any>;

  // If items contains objects, display attribute with this key
  @Input() displayKey = 'display';

  // Search term
  searchKey = '';

  // Reference to the overlay component
  private overlayRef: ComponentRef<SvSelectOverlayComponent>;

  // Positing information for the overlay
  overlayStyles = {};

  // Controls the select open / close state
  private _open = false;
  get open() { return this._open; }
  set open(newValue: boolean) {

    if (newValue) {
      this.openOverlay();
      this.filteredItems = this.items;
    } else {
      this.removeOverlay();
    }

    this.searchKey = '';

    this._open = newValue;

    if (this.open && this.searchable) {
      setTimeout(() => {
        // this.searchField.nativeElement.focus();
      }, 0);
    }
  }

  // The selected value
  private _selected: any;
  get selected() { return this._selected; }
  set selected(newValue: any) {
    this._selected = newValue;
  }

  constructor(
    renderer: Renderer2,
    element: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {
    super(renderer, element);
  }

  // Creates and appends the overlay component to the DOM
  openOverlay() {
    // Calculate position and width of overlay
    const boundingRect = this._element.nativeElement.getBoundingClientRect();
    this.overlayStyles = {};
    this.overlayStyles['width'] = boundingRect.width + 'px';
    this.overlayStyles['left'] = boundingRect.left + 'px';

    if (boundingRect.top + boundingRect.height + 200 < window.innerHeight) {
      this.overlayStyles['top'] = boundingRect.top + boundingRect.height + 5 + 'px';
    } else {
      this.overlayStyles['bottom'] = window.innerHeight - boundingRect.top + 5 + 'px';
    }

    this.overlayRef = this.componentFactoryResolver.resolveComponentFactory(SvSelectOverlayComponent)
      .create(this.injector);
    this.appRef.attachView(this.overlayRef.hostView);
    const domElem = (this.overlayRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this.overlayRef.instance.optionsTemplate = this.options;
    this.overlayRef.instance.displayTemplate = this.display;
    this.overlayRef.instance.parent = this;
  }

  // Removes the overlay component from the DOM
  removeOverlay() {
    this.appRef.detachView(this.overlayRef.hostView);
    this.overlayRef.destroy();
    this.overlayRef = null;
  }

  // Changes selected value
  makeSelection(i) {
    this.selected = i;
    this.open = false;
  }

  // Filter the list of items to matched those that match the search term
  filterItems() {
    if (this.searchKey !== '') {
      this.filteredItems = this.items.filter(option => {
        if (this.objectList) {
          return option[this.displayKey].toLowerCase().includes(this.searchKey.toLocaleLowerCase());
        } else {
          return option.toLowerCase().includes(this.searchKey.toLocaleLowerCase());
        }
      });
    } else {
      this.filteredItems = this.items;
    }
  }

  itemDisplay(item) {
    if (item) {
      return this.objectList ? item[this.displayKey] : item;
    } else {
      return null;
    }
  }
}
