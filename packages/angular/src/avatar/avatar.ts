import { Component, Input, ViewEncapsulation } from '@angular/core';
import { avatarColors } from './avatar-colors';

@Component({
  selector: 'av-avatar',
  templateUrl: 'avatar.html',
  host: { 'class': 'av-avatar' },
  encapsulation: ViewEncapsulation.None
})

export class AvAvatarComponent {
  // Image
  @Input() image = '';

  // Will force the avatar to the passed in color
  @Input() forceColor = null;

  // The users name
  private _name = '';
  @Input()
  get name() { return this._name; }
  set name(n: string) {
    this._name = n;
    this.constructInitials();
  }

  // Avatar initials based on name
  private _initials = '';
  get initials() { return this._initials; }
  set initials(i: string) {
    this._initials = i;
    this.color = avatarColors[i.toUpperCase().charCodeAt(0) - 65];
  }

  // Hex color for background
  color: string;

  // The avatar's size (diameter)
  @Input() size = '40';

  sizeInt() {
    return Number(this.size);
  }

  constructInitials() {
    if (this.name !== '') {
      const splitNames = this.name.split(' ');

      if (splitNames.length > 1) {
        this.initials = splitNames[0][0] + splitNames[splitNames.length - 1][0];
      } else {
        this.initials = splitNames[0];
      }
    }
  }
}
