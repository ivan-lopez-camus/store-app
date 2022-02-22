import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';

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
  imgRta = '';

  constructor(
    private authService : AuthService,
    private fileService : FilesService
  ){

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
