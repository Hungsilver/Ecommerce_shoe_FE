import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProductDetailService } from '../../product-detail/services/product.service';

@Component({
  selector: 'app-newproduct',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent  implements OnInit {


  new_product: any = {};
  type: any;
  ngOnInit(): void {

  }

  // constructor(
  //   @Inject(MAT_DIALOG_DATA) public data: any,
  //   private productDetailService : ProductDetailService,
  //   private dialog: MatDialog,
  // ) {
  //   this.type = data.type;
  //   this.new_product = data.new_product;
  // }
  // addProduct() {
  //   this.productDetailService.createProduct(this.new_product).then(res => {
  //     console.log('data created', res.content);
  //     if (res) {
  //       this.dialog.closeAll();
  //     }
  //   })
  // }
  // updateProduct() {
  //   this.productDetailService.updateProduct(this.new_product, this.new_product.id).then(res => {
  //     if (res) {
  //       this.dialog.closeAll();
  //     }
  //     console.log('data updated', res.content);
  //   })
  // }
  // deleteProduct() {
  //   this.productDetailService.deleteProduct(this.new_product.id);
  //   this.dialog.closeAll()
  // }

}