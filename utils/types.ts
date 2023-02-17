export interface CardTypes {
  location?: string;
  title?: string;
  description?: string;
  id: string;
  updatedAt?: any;
}
export interface ApplyData {
  email: string;
  name: string;
  skills: string;
  id: string;
}
export interface JobApply {
  email: string;
  name: string;
  skills: string;
  id: string;
}
export interface CardType {
  location?: string;
  title?: string;
  description?: string;
  id?: string;
  updatedAt?: any;
  email?: any;
  name?: string;
  skills?: string;
}
export interface FieldCardTypes {
  content?: string;
  placeholder?: string;
  password?: string;
  type: string;
  value?: string;
  onchange: any;
  onBlur?: any;
  pattern?: string;
  error?: boolean;
  required?: boolean;
  children?: any;
}
export interface DescCardTypes {
  content?: string;
  placeholder?: string;
  type: string;
  value?: string;
  onchange?: any;
  onBlur?: any;
  error?: boolean;
  required?: boolean;
}
