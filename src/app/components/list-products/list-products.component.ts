import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  myShoppingCart : Product[] = [];
  total=0;
  products: Product [] = [];
  today = new Date();
  date = new Date(2021,1,21);

  constructor(
    private storeService: StoreService,
    private productService: ProductsService,
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productService.getAllProducts()
    .subscribe(data=>{
      //console.log(data);
      this.products=data;
    });
  }

  onAddShoppingCart(product: Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}
