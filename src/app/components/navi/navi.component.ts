import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  email = localStorage.getItem('email');
  user : User;
  //user:User;
  firstName: string;
  userIdToCheck: any;
  check: boolean;
  isAdmin:boolean;

  constructor(
    private toastrService: ToastrService,
    private userService: UserService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.check = this.authService.isAuthenticated();
    this.checkToEmail();
    this.getByEmail();
    this.checkAdmin();

    // //let email = localStorage.getItem('email');
    // console.log(this.email);
    // this.firstName = this.authService.firstName;
    // if (this.checkToLogin()) {
    //   //console.log(email)
    //   this.getByEmail(email == null ? (email = 'a') : email.toString());
    // }
    // //console.log(this.firstName)
    // this.check = this.authService.isAuthenticated();
    // this.checkIfAdmin();

  }

  checkToEmail(){
    if(localStorage.getItem('email')){
      return true;
    }else{
      return false;
    }
  }
  checkAdmin(){
    if(localStorage.getItem('yetki')){
      return true;
    }else{
      return false;
    }
  }

  checkToLogin() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }

  checkIfAdmin() {
     if(localStorage.getItem("yetki")){
      return true;
    }else{
      return false;  
    }
  }

  logOut() {
    this.localStorageService.clearAll();
    this.toastrService.success('Başarıyla Çıkış Yapıldı');
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
    //window.location.reload();
  }

  getByEmail(){
    if(this.email){
      this.userService.getByEmail(this.email).subscribe(response=>{
        this.user = response.data[0];
        this.userService.getClaims(this.user.id).subscribe(response=>{
          if(response.data.length>0){
            this.localStorageService.set('yetki','var')
            this.localStorageService.set('id',this.user.id.toString())
          }
        })
      })
    }
  }


  // getByEmail(email: string) {
  //   this.userService.getByEmail(email).subscribe((response) => {
  //     this.user = response.data[0];
  //     console.log(this.user);
  //     console.log(this.user.id);
  //     this.authService.getClaims(this.user.id).subscribe(response=>{
  //       if(response.data.length>0){
  //         this.localStorageService.set('yetki','var')
  //         this.localStorageService.set('id',this.user.id.toString())
       

  //     console.log("this.check:" + this.check);
  //     console.log("this.isAdmin:" + this.isAdmin);
  
  //   });
  // }
}

