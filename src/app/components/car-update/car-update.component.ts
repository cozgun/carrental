import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm:FormGroup;
  car:Car;
 
  constructor(
    private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params)=>{
        console.log(params["carId"])
      if(params["carId"]){
        this.getCar(params["carId"])
        this.createCarUpdateForm();
      }
    })
   
  }
  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      //id:["",Validators.required],
      modelYear:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      description:["",Validators.required],
      dailyPrice:["",Validators.required],
    })
  }
  getCar(id:number){
    this.carService.getCarById(id).subscribe(response=>{
      this.car=response.data
    })
  }
  update() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({id:this.car.id}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Success');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.Errors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Validation Error'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formdaki tüm alanların doldurulması gerekmektedir.', 'Warning');
    }
  }

}