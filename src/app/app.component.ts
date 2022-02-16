import { Component } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  //url imagen: https://www.w3schools.com/howto/img_avatar.png
  showImage = true;

  onLoaded(img:string){
    console.log('load en el padre', img)
  }

  toogleImg(){
    this.showImage = !this.showImage;
  }
}
