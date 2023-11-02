import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { AddressService } from '../../service/address.service';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent implements OnInit {

  address: any = {};
  type: any;
  ngOnInit(): void {

  }


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private addressService: AddressService,
    private dialog: MatDialog,
  ) {
    this.type = data.type;
    this.address = data.address;
  }
  addAddress() {
    this.addressService.createAddress(this.address).then(res => {
      console.log('data created', res.content);
      if (res) {
        this.dialog.closeAll();
      }
    })
  }
  updateAddress() {
    this.addressService.updateAdress(this.address, this.address.id).then(res => {
      if (res) {
        this.dialog.closeAll();
      }
      console.log('data updated', res.content);
    })
  }
  deleteAddress() {
    this.addressService.deleteAddress(this.address.id);
    this.dialog.closeAll()
  }

}
