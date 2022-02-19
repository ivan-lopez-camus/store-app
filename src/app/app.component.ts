import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  //url imagen: https://www.w3schools.com/howto/img_avatar.png
  showImage = true;
  token = '';

  constructor(
    private authService : AuthService,
  ){

  }

  toogleImg(){
    this.showImage = !this.showImage;
  }



}
