import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm:FormGroup;
  color:Color;
 
  constructor(
    private activatedRoute:ActivatedRoute,
    private colorService:ColorService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params)=>{
        console.log(params["colorId"])
      if(params["colorId"]){
        this.getColor(params["colorId"])
        this.createColorUpdateForm();
      }
    })
   
  }
  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      name:["",Validators.required],
    })
  }
  getColor(id:number){
    this.colorService.getColorById(id).subscribe(response=>{
      this.color=response.data
    })
  }
  update() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({id:this.color.id}, this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe(
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