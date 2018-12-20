import * as md5 from 'md5';
import * as chroma from 'chroma-js';

export type ColorPalette =  'primary' | 'secondary' | 'success' | 'warning' | 'error' |
                            'dark-gray' | 'medium-gray' | 'light-gray' | 'white' | 'black';

export enum ColorPaletteValues {
  primary     = 'primary',
  secondary   = 'secondary',
  success     = 'success',
  warning     = 'warning',
  error       = 'error',
  darkGray    = 'dark-gray',
  mediumGray  = 'medium-gray',
  lightGray   = 'light-gray',
  white       = 'white',
  black       = 'black'
}

export function randomColor(string = null): string {
  let randomSeed;

  if (string) {
    randomSeed = md5(string);
  } else {
    randomSeed = String(Math.random());
  }

  const hex = randomSeed.substr(5, 6);
  const hsl = chroma(hex).hsl();

  hsl[1] = Math.max(0.5, hsl[1]);
  hsl[2] = Math.min(0.6, hsl[2]);
  hsl[2] = Math.max(0.1, hsl[2]);

  return chroma(hsl, 'hsl').hex();
}
