import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars : Car[] = [];
  imageBasePath  = environment.imageUrl;
  filterText = "";
  
  constructor(private carService: CarService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

      this.activatedRoute.params
        .subscribe((params) => {
          if(params["brandId"]){
            this.getCarsByBrand(params["brandId"]);
          }
          else if(params["colorId"]){
            this.getCarsByColor(params["colorId"]);
          }
          else{
            this.getCars();
          }
        });
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


}



// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Car } from 'src/app/models/car';
// import { CarDetail } from 'src/app/models/carDetail';
// import { CarImage } from 'src/app/models/carImage';
// import { CarImageService } from 'src/app/services/carimage.service';
// import { CarService } from 'src/app/services/car.service';
// import { environment } from 'src/environments/environment';

// @Component({
//   selector: 'app-car',
//   templateUrl: './car.component.html',
//   styleUrls: ['./car.component.css']
// })
// export class CarComponent implements OnInit {
//   cars : Car[] = [];
//   carImages : CarImage[] = [];
//   carDetail : CarDetail[] = [];
//   currentCar : Car;
//   basePath= environment.baseURL;
//   imageBasePath  = environment.imageUrl;
  
//   //private - sadece bu class'da geçerli
//   constructor(private carService : CarService,
//     private carImageService: CarImageService,
//     private activatedRoute : ActivatedRoute) { }

//   ngOnInit(): void {
//     console.log(this.imageBasePath )
//     this.activatedRoute.params.subscribe(params=>{
//       if(params["brandId"] && params["colorId"]){
//         this.getCarDetails(params["brandId"],params["colorId"])}
//       else if(params["brandId"]){
//         this.getCarsByBrand(params["brandId"])
        
//       }
//       else if(params["colorId"]){
//         this.getCarsByColor(params["colorId"])
//       }
//       else{
//         this.getCars();
//       }
//     })
    
    
  
//   }
  
//   getCars(){
//     this.carService.getCars().subscribe(response=>{
//       this.cars = response.data 
//     })
//   }
//   getCarsByBrand(brandId:number){
//     this.carService.getCarsByBrand(brandId).subscribe(response=>{
//       this.cars = response.data 
//     })
//   }
//   getCarsByColor(colorId:number){
//     this.carService.getCarsByColor(colorId).subscribe(response=>{
//       this.cars = response.data
//     })
//   }
//   getCarClass(car:Car){
//     if(car == this.currentCar){
//       return "table-info cursorPointer"
//     }else{
//       return "cursorPointer"
//     }
//   }
//   setCurrentCar(car:Car){
//     this.currentCar=car;

//   }
//   setPreviewImages(cars:CarDetail[]){
//     cars.forEach(car=>{
//       this.carImageService.getCarImagesByCarId(car.carId).subscribe((response) =>{
//         car.imagePath = "https://localhost:44332/" + response.data[0].imagePath;
//       })
//     })
//   }
//   getCarDetails(brandId:number,colorId:number){
//     this.carService.getCarDetails(brandId,colorId).subscribe((response) => {
//       this.carDetail = response.data;
//       this.setPreviewImages(this.carDetail)
//     });
//   }
//   getAllCarDetails() {
//     this.carService.getAllCarDetails().subscribe((response) => {
//       this.carDetail = response.data;
//       this.setPreviewImages(this.carDetail)
//     });
//   }

//     getCarImage(car:Car){
//     if(car.imagePath){
//       return car.imagePath
//     }
//     else{
//       return 'sirketlogo.jpg'
//     }
//   }
// }

