import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm:FormGroup;
  brand:Brand;
 
  constructor(
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params)=>{
        console.log(params["brandId"])
      if(params["brandId"]){
        this.getBrand(params["brandId"])
        this.createBrandUpdateForm();
      }
    })
   
  }
  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      name:["",Validators.required],
    })
  }
  getBrand(id:number){
    this.brandService.getBrandById(id).subscribe(response=>{
      this.brand=response.data
    })
  }
  update() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({id:this.brand.id}, this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe(
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
      this.toastrService.error('Form is need to be full filled', 'Warning');
    }
  }

}