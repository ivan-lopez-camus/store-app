import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product [] = [];
  limit = '10';
  offset = '0';
  constructor(
    private productService : ProductsService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts()
    .subscribe(data=>{
      //console.log(data);
      this.products=data;
    });
  }

}
