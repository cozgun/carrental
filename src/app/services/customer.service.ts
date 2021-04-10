import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:44332/api/"

  constructor(private httpClient : HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl + 'customers/getcustomerdetail';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  getCustomerByUserId(userId : number) : Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl + 'customers/getcustomerdetailbyuserid?userId=' + userId;
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  updateCustomer(customer:Customer):Observable<ResponseModel>{
    let newPath=this.apiUrl+"customers/update";
   return this.httpClient.post<ResponseModel>(newPath,customer)
   }
}