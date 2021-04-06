import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/carimage.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { Car } from 'src/app/models/car';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  cars : Car;
  carImages: CarImage[] = []
  carImagePaths: string[] = [];
  dataLoaded = false;
  imageUrl = "https://localhost:44332/";
  constructor(private carService: CarService,
    private carImageService: CarImageService,
    private cartService:CartService, 
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetail(params["carId"])
        this.getCarImages(params["carId"])
      }
    })
  }

  getCarDetail(carId:number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.cars = response.data[0];
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

  
}