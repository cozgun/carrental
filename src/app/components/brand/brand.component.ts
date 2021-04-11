import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  dataLoaded = false;
  currentBrand: Brand;
  nullBrand: Brand;
  filterText = "";
  router: any;
  constructor(private brandService: BrandService, private authService:AuthService) {}

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }
  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }
  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return 'list-group-item ';
//      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getAllBrandsClass() {
    if (!this.currentBrand) {
      return 'list-group-item';
      //return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  currentResetter(nullBrand: Brand) {
    this.currentBrand = nullBrand;
  }

  updateBrand() {
    myId:Number;
    const myId=this.currentBrand.id
    this.router(["/brands/update/" + myId]);

  }
    checkToLogin(){
      if(this.authService.isAuthenticated()){
        return true;
      }else{
        return false;
      }
    }

    
    //.navigate(["/brands/update/" + myId])
};


// import { Component, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { Brand } from 'src/app/models/brand';
// import { Car } from 'src/app/models/car';
// import { BrandService } from 'src/app/services/brand.service';
// import { CartService } from 'src/app/services/cart.service';

// @Component({
//   selector: 'app-brand',
//   templateUrl: './brand.component.html',
//   styleUrls: ['./brand.component.css'],
// })
// export class BrandComponent implements OnInit {
//   brands: Brand[] = [];
//   currentBrand: Brand;
//   filterText = "";
//   dataLoaded=false;
//   nullBrand:Brand;
//   constructor(private brandService: BrandService) {}

//   ngOnInit(): void {
//     this.getBrands();
//   }

//   getBrands() {
//     this.brandService.getBrands().subscribe((response) => {
//       this.brands = response.data;
//     });
//   }

//   setCurrentBrand(brand: Brand) {
//     this.currentBrand = brand;
//   }

//   getCurrentBrandClass(brand: Brand) {
//     if (brand == this.currentBrand) {
//       return 'list-group-item active';
//     } else {
//       return 'list-group-item';
//     }
//   }

//   getAllBrandClass(){
//     if(!this.currentBrand){
//       return "list-group-item active"
//     } else{
//       return "list-group-item"
//     }
//   }

//   currentResetter(nullBrand:Brand){
//     this.currentBrand=nullBrand;
//   }

// }
