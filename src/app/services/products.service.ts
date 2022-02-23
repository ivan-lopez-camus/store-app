import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http'
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { throwError, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api'
  constructor(
    private http: HttpClient
  ) { }

  getByCategory(categoryId: String,limit?: string, offset?: string){
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, { params })
  }
  getAllProducts(limit?: string, offset?: string) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params })
    .pipe(retry(3));
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    );
  }

  getProduct(id: string){
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
        .pipe(
          catchError((error : HttpErrorResponse) => {
            if(error.status === 500){
              return throwError('Algo esta fallando en el server');
            }
            if(error.status === 404){
              return throwError('El producto no existe');
            }
            if(error.status === 401){
              return throwError('No estas permitido para ingresar');
            }
            return throwError('Ups algo salió mal');
          })
        )
  }

  getProductsByPage(limit: string, offset: string) {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      params: { limit,offset }
    })
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(`${this.apiUrl}/products` , dto);
  }

  update(id:String, dto: UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/products/${id}` , dto);
  }
  delete(id:String){
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
