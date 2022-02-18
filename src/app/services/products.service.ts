import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http'
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products'
  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: string, offset?: string) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(this.apiUrl, { params })
    .pipe(retry(3));
  }

  getProduct(id: string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsByPage(limit: string, offset: string) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit,offset }
    })
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(this.apiUrl , dto);
  }

  update(id:String, dto: UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/${id}` , dto);
  }
  delete(id:String){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
