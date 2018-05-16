import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class AvCheckboxGroupService {
  // Holds the checked values
  private _selected = [];

  // Subject to watch
  private _selectedValues = new Subject<Array<any>>();

  // Observable
  selectedValues$: Observable<any> = this._selectedValues.asObservable();

  // Sets the entire array of values
  setValues(values: Array<any>) {
    if (values) {
      this._selected = values;
      this._selectedValues.next(this._selected);
    }
  }

  // Adds a value to the array
  addValue(value: any) {
    this._selected.push(value);
    this._selectedValues.next(this._selected);
  }

  // Removes a value from the array
  removeValue(value: any) {
    const i = this._selected.indexOf(value);
    this._selected.splice(i, 1);
    this._selectedValues.next(this._selected);
  }
}
