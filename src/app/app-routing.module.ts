import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/carDetail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';


const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/detail/:carId",component:CarDetailComponent},
  {path:"cardetail/:carId",component:CarDetailComponent},
  {path:"cars/filter/:brandId:colorId", component:CarComponent},
  {path:"rental/:carId", component:RentalComponent, canActivate:[LoginGuard]},
  {path:"payment/:rental",component:PaymentComponent},
  {path:"brands/add",component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"colors/add",component:ColorAddComponent, canActivate:[LoginGuard]},
  {path:"cars/add",component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"brands/update/:brandId",component:BrandUpdateComponent},
  {path:"colors/update/:colorId",component:ColorUpdateComponent},
  {path:"cars/update/:carId",component:CarUpdateComponent},
  {path:"login", component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profileUpdate",component:ProfileUpdateComponent},
  { path: '', pathMatch:"full",component: CarComponent },
  { path: '**', component: CarComponent }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
