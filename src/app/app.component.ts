import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title: 'Productos';
  imgParent = '';
  //url imagen: https://www.w3schools.com/howto/img_avatar.png
  showImage = true;
  token = '';
  imgRta = '';

  constructor(
    private authService : AuthService,
    private tokenService : TokenService,
    private fileService : FilesService
  ){

  }

  ngOnInit() {
    const token = this.tokenService.getToken();
    if(token){
      this.authService.getProfile()
      .subscribe()
    }
  }

  toogleImg(){
    this.showImage = !this.showImage;
  }

  downloadPdf(){
    this.fileService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }

  onUpload(event : Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.fileService.uploadFile(file)
      .subscribe(rta =>{
      this.imgRta = rta.location;
    })
    }

  }
}
