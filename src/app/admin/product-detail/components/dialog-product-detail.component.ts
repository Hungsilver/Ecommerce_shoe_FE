import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-product-detail',
    templateUrl: './dialog-product-detail.component.html',
    styleUrls: ['./dialog-product-detail.component.scss']
  })
  export class NewProductDetailComponent implements OnInit {
    newProduct: IProductDetail;
    SanPhams: IProduct[] = [];
    chatLieuGiays: IMaterial[] = [];
    kichCos: ISize[] = [];
    mauSacs: IColor[] = [];
    chatLieuDeGiays: IMaterialSoles[] = [];