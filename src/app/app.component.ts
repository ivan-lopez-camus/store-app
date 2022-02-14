import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  //url imagen: https://www.w3schools.com/howto/img_avatar.png

  onLoaded(img:string){
    console.log('load en el padre', img)
  }
}
