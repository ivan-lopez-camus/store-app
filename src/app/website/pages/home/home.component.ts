import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import {ActivatedRoute} from '@angular/router'
import {ProductsService} from '../../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product [] = [];
  limit = '10';
  offset = '0';
  productId: string | null = null;
  constructor(
    private productService : ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts()
    .subscribe(data=>{
      //console.log(data);
      this.products=data;
    });
    this.route.queryParamMap.subscribe(params =>{
      this.productId = params.get('product');
      console.log(this.productId);
    })
  }

}
