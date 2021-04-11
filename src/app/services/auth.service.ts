import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/loginModel';
import { PasswordChange } from '../models/passwordChange';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Claims } from '../models/claims';
import { ListResponseModel } from '../models/listResponseModel';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  name: string = "";
  surname:string="";
  role:any;
  roles: any[] = [];
  token: any;
  isLoggedIn: boolean = false;
  userId: number;
  email:string;
  apiUrl = environment.apiURL +'auth/';
  firstName: any;
  lastName: any;
  //apiUrl = "https://localhost:44332/api/auth/";
  constructor(
    private httpClient:HttpClient,
    private localStorageService:LocalStorageService,
    private jwtHelper:JwtHelperService,
    
    ) { }

login(loginModel:LoginModel){
  return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
}

isAuthenticated(){
  if(localStorage.getItem("token")){
    return true;
  }
  else{
    return false;
  }
}

register(registerModel:RegisterModel){
  let newPath = this.apiUrl+"register";
  return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
}

logout(){
  this.localStorageService.removeToken()
}

changePassword(passwordToChange:PasswordChange){
  let newPath=this.apiUrl+"changepassword";
  return this.httpClient.post<SingleResponseModel<PasswordChange>>(newPath,passwordToChange);
}
userDetailFromToken(){
  this.token = this.localStorageService.get("token");
  let decodedToken = this.jwtHelper.decodeToken(this.token);
  let firstName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  this.firstName = firstName.split(' ')[0];
  let lastName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  this.lastName = lastName.split(' ')[1];
  this.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  this.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  this.userId =parseInt(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
  this.email=decodedToken["email"];
  //console.log(this.lastName)
}

// getClaims(id:number):Observable<Claims>{
//   return this.httpClient.get<Claims>('https://localhost:44332/api/user/getclaims?id='+id)
  
// }
  
}

