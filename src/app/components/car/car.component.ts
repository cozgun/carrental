import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars : Car[] = [];
  imageBasePath  = environment.imageUrl;
  filterText = "";
  filterTextColor = "";
  brandIdFilter:number;
  brands:Brand[];
  colors:Color[];
  dataLoaded=false;
  colorId:number;
  brandId:number;
    
  constructor(private carService: CarService, 
    private activatedRoute: ActivatedRoute, 
    private toastrService: ToastrService, 
    private cartService:CartService,    
    private brandService:BrandService,
    private colorService:ColorService) { }

  ngOnInit(): void {

      this.activatedRoute.params
        .subscribe((params) => {
          if(params["brandId"] && params["colorId"])
          {
            this.getCarsByFilter(params["brandId"],params["colorId"])
          }
          if(params["brandId"]){
            this.getCarsByBrand(params["brandId"]);
          }
          else if(params["colorId"]){
            this.getCarsByColor(params["colorId"]);
          }
          else{
            this.getCars();
          }
          this.getColors();
          this.getBrands();
        });
  }

  getSelectedBrand(brandId:number){
    if(this.brandId==brandId){
      return true;
    }
    else{
      return false;
    }
  }
  
  getSelectedColor(id:number){
    if (this.colorId == id) 
    {
      return true;
    } 
    else 
    {
      return false;
    }
  }
  
  getCars(){
    this.carService.getCars()
      .subscribe(response => {
        this.cars = response.data;
      });
  }

  getCarsByBrand(brandId: number){
    this.carService.getCarsByBrand(brandId)
      .subscribe((response) => {
        this.cars = response.data;
      });
  }

  getCarsByColor(colorId: number){
    this.carService.getCarsByColor(colorId)
      .subscribe((response) => {
        this.cars = response.data;
      });
  }

  getCarImage(car:Car){

    if(car.imagePath){
      return car.imagePath
    }
    else{
      return 'default.jpg'
    }
  }

  addToCart(car:Car){
    this.toastrService.success("Sepete eklendi", car.carName)
    this.cartService.addToCart(car);
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }
  
  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }
  getCarsByFilter(brandId:number,colorId:number){
    this.carService.getCarsByFilter(brandId,colorId).subscribe(response=>{
      this.cars=response.data;
    });
  }

}

