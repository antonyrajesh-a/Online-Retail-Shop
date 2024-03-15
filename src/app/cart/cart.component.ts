import { Component, Input,OnInit} from '@angular/core';
import { ProductData } from '../product';
import { HttpClient } from '@angular/common/http';
import { CustomerData } from '../customer';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone:true,
  imports:[NgFor,NgIf]
})
export class CartComponent implements OnInit {
   cart: ProductData[]=[];

  selectedCustomer: CustomerData = {
    CustomerId: "475d0498-8186-43ba-aa1b-08f216e60a87",
    CustomerName: "ABC",
    EmailID: "abc@gmail.com",
    Mobile: "9959845375" };

  constructor(private http: HttpClient,private cartService: CartService) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
    this.cart = this.cartService.getCart(); 
  }

  placeOrderC() {
    this.cartService.placeOrder();
  }
    
}
