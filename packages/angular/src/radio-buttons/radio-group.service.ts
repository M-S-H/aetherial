import { Injectable } from '@angular/core';
import { Subject ,  Observable } from 'rxjs';

@Injectable()
export class AvRadioGroupService {
  // Value to watch
  private _selectedValue = new Subject<string>();

  // The value's observable
  valueSelected$: Observable<string> = this._selectedValue.asObservable();

  // Method to change the selected value
  selectValue(value: string) {
    this._selectedValue.next(value);
  }
}
