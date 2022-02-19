import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import {StoreService} from '../../services/store.service'
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User  | null = null;

  constructor(
    private storeService : StoreService,
    private authService: AuthService,
    private usersService : UsersService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
        this.counter= products.length ;
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    // this.authService.login('sebas@mail.com', '123456')
    // .subscribe(rta => {
    //   this.token = rta.access_token;
    //   console.log(this.token);
    //   this.getProfile();
    // });
    this.authService.loginAndGet('sebas@gmail.com', '123456')
    .subscribe(user => {
      this.profile = user;
    });
  }

  createUser(){
    this.usersService.create({
      name:'Sebastian',
      email: 'sebas@gmail.com',
      password: '123456'
    })
    .subscribe(rta =>{
      console.log(rta)
    })
  }

}
