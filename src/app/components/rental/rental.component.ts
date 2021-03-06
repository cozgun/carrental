import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers: [DatePipe],
})
export class RentalComponent implements OnInit {

  customers:Customer[];
  customerId:number;
  userId:any;
  rentDate: Date;
  returnDate : Date;
  @Input() car : Car;
  

  minDate: string | any;
  maxDate: string | null;
  maxMinDate: string | null;
  firstDateSelected: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCustomer();
  }
  getRentMinDate() {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.minDate;
  }

  getReturnMinDate() {
    if (this.rentDate != undefined) {
      let stringToDate = new Date(this.rentDate);
      let new_date = new Date();
      new_date.setDate(stringToDate.getDate() + 1);
      return new_date.toISOString().slice(0, 10);
    } else {
      return this.rentDate;
    }
  }
  getReturnMaxDate() {
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
    return this.maxDate;
  }
  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }
  createRental() {
    let MyRental: Rental = {
      carId : this.car.id,
      customerId : this.customerId,
      brandName : this.car.brandName,
      colorName : this.car.colorName,
      carDailyPrice : this.car.dailyPrice,
      carDescription : this.car.description,
      rentDate : this.rentDate,
      returnDate : this.returnDate
      
    };
    if (MyRental.rentDate == undefined) {
     //if (this.customerId == undefined || MyRental.rentDate == undefined) {
      console.log(MyRental)
      this.toastrService.error("Eksik bilgi girdiniz","Bilgilerinizi kontrol edin")
    } else{
      this.router.navigate(['/payment/', JSON.stringify(MyRental)]);
      this.toastrService.info(
        '??deme sayfas??na y??nlendiriliyorsunuz...',
        '??deme ????lemleri'
      );
    }
  }
  setCustomerId(customerId: string) {
    this.customerId = +customerId;
    console.log(this.customerId);
  }
  getCustomer() {
    this.userId = localStorage.getItem('id');
    this.customerService.getCustomerByUserId(this.userId).subscribe((response) => {
      this.customers = response.data;
      console.log(response.data);
    });
  }
}