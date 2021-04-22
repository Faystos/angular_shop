import { Product } from 'src/app/shared/interface';
export interface FbResponse {
  name: string
}

export interface User {
  email: string,
  password: string,
  returnSecureToken: boolean
}

export interface ResponseUser {
  email: string,
  expiresIn: string,
  idToken: string,
}

export interface Product {
  id?: string,
  date: Date,
  type: string
  title: string,
  photo: string,
  info: string,
  price: string,
}

export interface Order {
  name: string,
  phone: string,
  address: string,
  payment: string,
  order: Product[],
  id?:string,
  date?: Date
}