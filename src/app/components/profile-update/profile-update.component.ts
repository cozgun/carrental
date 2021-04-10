import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {
  userId:number;

  customer:Customer;
  user:User;
  userUpdateForm:FormGroup;
  customerUpdateForm:FormGroup;
  passwordUpdateForm:FormGroup;
  controlNumber:number=0;
  firstName: any;

  constructor(
    private toastrService:ToastrService,
    private customerService:CustomerService,
    private authService:AuthService,
    private userService:UserService,
    private formBuilder:FormBuilder

  ) { }

  ngOnInit(): void {
    let email = localStorage.getItem("email");
    this.authService.userDetailFromToken()
    this.userId=this.authService.userId;
    console.log("this.userId " + this.userId)
    this.firstName=this.authService.firstName;
    //console.log("this.userId " + this.userId)
    this.getCustomerDetails();
    this.getUserDetails(email == null ? email = "a" : email.toString());
    this.createCustomerUpdateForm();
    this.createUserUpdateForm();
    this.createPasswordUpdateForm();

  }

 getCustomerDetails(){
  this.customerService.getCustomerByUserId(this.userId)
  .subscribe(response => {
    console.log(this.customer = response.data[0]);
    //console.log("this.customer " + this.customer)
    this.customerUpdateForm.setValue({
      id:this.customer.id,
      userId:this.customer.userId,
      companyName:this.customer.companyName,
    })
  });
 }
 getUserDetails(email:string){
   this.userService.getByEmail(email).subscribe(response=>{
    this.user=response.data[0];
    //console.log("this.user" + this.user)
    this.userUpdateForm.setValue({
      id:this.user.id,
      firstName:this.user.firstName,
      lastName:this.user.lastName,
      email:this.user.email,
      passwordHash:this.user.passwordHash,
      passwordSalt:this.user.passwordSalt,
      //findexScore:this.user.findexScore,
      status:this.user.status

    })
   })
 }

 createUserUpdateForm(){
  this.userUpdateForm=this.formBuilder.group({
    id:[this.userId],
    firstName:[ "",Validators.required],
    lastName:["",Validators.required],
    email:["",Validators.required],
    passwordHash:["", Validators.required],
    passwordSalt:["",Validators.required],
    status:["",Validators.required],
    //findexScore:["",Validators.required]

  })
}
createCustomerUpdateForm(){
  this.customerUpdateForm=this.formBuilder.group({
    id:["",Validators.required],
    userId:[this.userId],
    //id:["",Validators.required],
    companyName:["",Validators.required],
    
  })
}
createPasswordUpdateForm(){
  this.passwordUpdateForm=this.formBuilder.group({
    userId:[this.userId,Validators.required],
    oldPassword:["",Validators.required],
    newPassword:["",Validators.required],
  })
}

userUpdate(){
  if(this.userUpdateForm.valid){
    let userModel=Object.assign({},this.userUpdateForm.value); 
    //console.log("userUpdate()" + userModel.value);
    this.userService.update(userModel).subscribe(response=>{
      return this.toastrService.success(response.message, "Güncelleme başarılı")
    },
    responseError=>{
      //console.log(responseError);
      this.toastrService.error(responseError);
      this.toastrService.error(responseError.error,"Hatalı İşlem");
    }
    )
  }
}

customerUpdate(){
  if(this.customerUpdateForm.valid){
    let customerModel=Object.assign({},this.customerUpdateForm.value);

    console.log(customerModel)
    this.customerService.updateCustomer(customerModel).subscribe(response=>{
      return this.toastrService.success(response.message,"Başarılı");
    },responseError=>{
      this.toastrService.error("Hatalı İşlem");
    })
  }else{
    this.toastrService.info("Form Eksik")
  }
}

passwordUpdate(){

  if(this.passwordUpdateForm.valid){
    let passwordChangeModel=Object.assign({},this.passwordUpdateForm.value);

    //console.log(passwordChangeModel)
    this.authService.changePassword(passwordChangeModel).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı");
    },responseError=>{
//      console.log(responseError);
      this.toastrService.error(responseError.error.message);
    }



    )
  }
}

} 