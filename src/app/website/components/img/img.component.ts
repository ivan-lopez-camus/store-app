import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit{

  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = "./assets/images/default.png";
  //counter = 0;
  //counterFn: number | undefined;

  constructor() {

  }


  ngOnInit(): void {

  }

  imgError(){
    this.img = this.imageDefault;
  }

  imgLoaded(){
    //console.log('loaded en el hijo');
    this.loaded.emit(this.img);
  }

}
