import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claims } from '../models/claims';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="https://localhost:44332/api/user/";
  constructor(private httpClient:HttpClient) { }

  getById(userId:number):Observable<ListResponseModel<User>>{
    let newPath=this.apiUrl+"getuserbyid?userId="+userId;
    return  this.httpClient.get<ListResponseModel<User>>(newPath)
  }
  getByEmail(email:string):Observable<ListResponseModel<User>>{
    let newPath=this.apiUrl+"getuserbyemail?email="+email;
    return this.httpClient.get<ListResponseModel<User>>(newPath)
  }

  update(user:User):Observable<ResponseModel>{
    let newPath=this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath,user);

  }

  getClaims(id:number):Observable<ListResponseModel<Claims>>{
    return this.httpClient.get<ListResponseModel<Claims>>(this.apiUrl + 'getclaims?userId='+id)
  }
  
  checkIfAdmin(userId:number):Observable<ResponseModel>{
    let newPath=this.apiUrl + 'isadmin?userId='+userId;
    return this.httpClient.get<ResponseModel>(newPath);
    
    // if (this.httpClient.get(newPath)){
    //   console.log(this.httpClient.get(newPath))
    //   return true;
    // }else{
    //   return false;
    // }
    

  }
}