import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';

// @Injectable({
//   providedIn: 'root'
// })
// export class BrandService {
//   apiUrl = 'https://localhost:44332/api/brands/getall';
//   constructor(private httpClient: HttpClient) { }

//   getBrands():Observable<ListResponseModel<Brand>> {
//     return this.httpClient
//       .get<ListResponseModel<Brand>>(this.apiUrl)
//       };
      
//   }
  @Injectable({
    providedIn: 'root'
  })
  export class BrandService {
  
    apiUrl = environment.apiURL +'brands/';;
  
  
    constructor(private httpClient:HttpClient) { }
  
    getBrands():Observable<ListResponseModel<Brand>>{
      let newPath = this.apiUrl + "getall";
      return this.httpClient.get<ListResponseModel<Brand>>(newPath);
    }
  }