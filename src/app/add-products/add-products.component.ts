import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ProductData } from '../product';

@Component({
  selector: 'app-add-products',
  standalone:true,
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css',
  imports: [
    FormsModule
  ],
})
export class AddProductsComponent {

  constructor(private http:HttpClient){
  }


  onProductCreate(productdata:{ProductName:string, Quantity:number}){
    const newProductData: ProductData = {
      ...productdata,
      IsActive: false,
      ProductId: '3fa85f64-5717-4562-b3fc-2c963f66afa6' 
    };


    this.http.post('https://uiexercise.theproindia.com/api/Product/AddProduct',newProductData)
    .subscribe((res)=>{
      console.log(res);
      alert("Product Added")
    });
  }
}
