import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, 
    private toastrService:ToastrService,
    private carService:CarService) { }

  ngOnInit(): void {
    this.createCarAddForm();
  }

createCarAddForm(){
  this.carAddForm=this.formBuilder.group({
    modelYear:["",Validators.required],
    dailyPrice:["",Validators.required],
    description:["",Validators.required],
    brandId:["",Validators.required],
    colorId:["",Validators.required],
    // name:["",Validators.required],
    // name:["",Validators.required],


    // public int BrandId { get; set; }
    // public int ColorId { get; set; }
    // public int ModelYear { get; set; }
    // public int DailyPrice { get; set; }
    // public string Description { get; set; }
    
    // carName:string;
    // brandName:string;
    // colorName:string;

    
  })
  }
  
  add(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value)
      this.carService.add(carModel).subscribe(response=>{
      
        this.toastrService.success(response.message, "Başarılı")
  
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"doğrulama hatası")
          }
          
        }  
        
        
      })
      
    }else {this.toastrService.error("Formunuz eksik", "Dikkat")
  
  }

  }
}
