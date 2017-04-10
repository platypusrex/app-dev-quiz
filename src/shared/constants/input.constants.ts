export interface IInputType {
  text?: string;
  number?: string;
  email?: string;
  password?: string;
  tel?: string;
  search?: string;
  date?: string;
  month?: string;
  checkbox?: string;
  radio?: string;
  file?: string;
  url?: string;
  range?: string;
  color?: string;
}

export interface IInputColor {
  primary?: string;
  primaryDark?: string;
  secondary?: string;
  light?: string;
}

export interface IInputLabelType {
  float: string;
}

export const inputType:IInputType = {
  text: 'text',
  number: 'number',
  email: 'email',
  password: 'password',
  tel: 'tel',
  search: 'search',
  date: 'date',
  month: 'month',
  checkbox: 'checkbox',
  radio: 'radio',
  file: 'file',
  url: 'url',
  range: 'range',
  color: 'color'
};

export const inputColor: IInputColor = {
  primary: 'primary',
  primaryDark: 'primary-dark',
  secondary: 'secondary',
  light: 'light'
};

export const inputLabelType: IInputLabelType = {
  float: 'float'
};
