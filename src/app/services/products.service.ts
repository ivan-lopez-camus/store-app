import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { CreateProductDTO, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products'
  constructor(
    private hhtp: HttpClient
  ) { }

  getAllProducts(){
    return this.hhtp.get<Product[]>(this.apiUrl);
  }

  getProduct(id: string){
    return this.hhtp.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(data: CreateProductDTO){
    return this.hhtp.post<Product>(this.apiUrl , data);
  }
}
