import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-error',
  templateUrl: './payment-error.component.html',
  styleUrls: ['./payment-error.component.scss']
})
export class PaymentErrorComponent implements OnInit{
  constructor(
    private router: Router){

  }

  ngOnInit(): void {
  }

  onClick(){
    this.router.navigate(['/'])
  }

}
