import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product } from '../../models/product.model';
import { switchMap } from 'rxjs/operators';
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
  // today = new Date();
  // date = new Date(2021,1,21);
  showProductDetail = false;
  productChosen : Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description :'',
    category: {
      id: '',
      name: '',
    },

  };
  limit = '10';
  offset = '0';
  statusDetail : 'loading'  | 'success'  | 'error'  | 'init' ='init';

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

  toogleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
      this.statusDetail = 'loading';
      this.productService.getProduct(id)
      .subscribe(data=>{
       this.toogleProductDetail()
        this.productChosen = data;
        this.statusDetail='success';
      }, errorMsg =>{
        window.alert(errorMsg);
        this.statusDetail = 'error';
      })
  }

  readAndUpdate(id: string) {
    this.productService.getProduct(id)
    .pipe(
      switchMap((product) => this.productService.update(product.id, {title: 'change'})),
    )
    .subscribe(data => {
      console.log(data);
    });
    this.productService.fetchReadAndUpdate(id, {title: 'change'})
    .subscribe(response => {
      const read = response[0];
      const update = response[1];
    })
  }

  createNewProduct(){
    const product: CreateProductDTO = {
      title:'Nuevo producto',
      description: 'Es oferta',
      price: 1200,
      images: ['https://placeimg.com/640/480/any?random=${Math.random()}'],
      categoryId: 2,

    }
    this.productService.create(product)
    .subscribe(data =>{
      console.log('created',data);
      this.products.unshift(data);
    })
  }

  updateProduct(){
    const changes = {
      title:' nuevo titulo',
    }

    const id = this.productChosen.id;

    this.productService.update(id,changes)
    .subscribe(data => {
      console.log('Updated:', data);
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    })
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productService.delete(id)
    .subscribe(() =>{
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex,1);
      this.showProductDetail = false;
    })
  }

}
