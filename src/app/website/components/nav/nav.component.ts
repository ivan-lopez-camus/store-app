import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import {StoreService} from '../../../services/store.service'
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User  | null = null;
  categories : Category[] = [];

  constructor(
    private storeService : StoreService,
    private authService: AuthService,
    private usersService : UsersService,
    private categoriesService : CategoriesService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
        this.counter= products.length ;
    });
    this.getAllCategories();
    this.authService.user$
    .subscribe(data =>{
      this.profile = data;
    })

  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    // this.authService.login('admin@mail.com', '123456')
    // .subscribe(rta => {
    //   this.token = rta.access_token;
    //   console.log(this.token);
    //   this.getProfile();
    // });
    this.authService.loginAndGet('admin@mail.com', 'admin123')
    .subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }

  // createUser(){
  //   this.usersService.create({
  //     name:'Admin1',
  //     email: 'admin1@gmail.com',
  //     password: '1234',
  //     role: 'admin'
  //   })
  //   .subscribe(rta =>{
  //     console.log(rta)
  //   })
  // }

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe(data =>{
      this.categories = data;
    })
  }

  logOut(){
    this.authService.logOut();
    this.profile = null;
    this.router.navigate(['/home']);
  }

}
