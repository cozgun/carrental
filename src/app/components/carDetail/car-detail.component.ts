import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/carimage.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { Car } from 'src/app/models/car';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  currentCarFindeks:number
  random:number = Math.floor(Math.random() * 4000) ;
  cars : Car;
  carImages: CarImage[] = []
  carImagePaths: string[] = [];
  dataLoaded = false;
  imageUrl = "https://localhost:44332/";
  constructor(private carService: CarService,
    private carImageService: CarImageService,
    private cartService:CartService, 
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private authService:AuthService) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetail(params["carId"])
        this.getCarImages(params["carId"])
        this.checkToLogin()
        this.getFindeksResult()
        console.log(this.getFindeksResult())
      }
    }) 
  }

  getCarDetail(carId:number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.cars = response.data[0];
      let currentCarFindeks = response.data[0].findeksFloor
      this.dataLoaded = true;
    });
  }
  
  getCarImages(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
  
  getCurrentImageClass(image:CarImage){
    if(image==this.carImages[0]){
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }
  getButtonClass(image:CarImage){
    if(image==this.carImages[0]){
      return "active"
    } else {
      return ""
    }
  }
  
  rentOnClick(){
    this.toastrService.info("Lütfen müşteri ve tarih seçin");
  }

  checkToLogin(){
    if(this.authService.isAuthenticated()){
      return true;
    }else{
      return false;
    }
  }
  
  getFindeksResult() {
     console.log(this.random)
    // console.log("this.cars.findeksFloor " + this.currentCarFindeks)
    // if(this.random > this.cars.findeksFloor){
      if(this.random > 2000){
      return true;
      } else{
        return false;
      }


}
}