// cart.service.ts
import { Injectable } from '@angular/core';
import { ProductData } from './product';
import { HttpClient } from '@angular/common/http';
import { CustomerData } from './customer';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'cart';
  private cart: ProductData[] = [];
  selectedCustomer: CustomerData = {
    CustomerId: "475d0498-8186-43ba-aa1b-08f216e60a87",
    CustomerName: "ABC",
    EmailID: "abc@gmail.com",
    Mobile: "9959845375" };

  constructor(private http:HttpClient) {

    this.loadCart();
  }

  addToCart(product: ProductData,maxQuantity:number) {

    const existingProductIndex = this.cart.findIndex(item => item.ProductId === product.ProductId);
  
    if (existingProductIndex !== -1) {
      
      this.cart[existingProductIndex].Quantity += product.Quantity;
      if(this.cart[existingProductIndex].Quantity>maxQuantity){
       
        this.cart[existingProductIndex].Quantity=maxQuantity;
      }
    } else {
      
      this.cart.push(product);
    }
  
    this.saveCart();
  }
  

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.saveCart();
  }

  getCart(): ProductData[] {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem(this.CART_STORAGE_KEY);
  }

  private loadCart() {
    const storedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

  private saveCart() {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cart));
  }

  placeOrder() {
    this.loadCart();
    if (this.cart.length === 0) {
      return; 
    }
    console.log(this.cart);

    this.cart.forEach(product => {
      const orderData = {
        CustomerId: this.selectedCustomer.CustomerId,
        ProductId: product.ProductId,
        Quantity: product.Quantity
      };

      this.http.post('https://uiexercise.theproindia.com/api/Order/AddOrder', orderData)
        .subscribe((res) => {
          console.log('Order placed successfully:', res,orderData);
        }, (error) => {
          console.error('Error placing order:', orderData);
        });
    });
    this.clearCart();
    console.log(this.cart);
    
    
    console.log(this.cart);
    window.location.reload();
    alert("cart items are placed");
    
}
}
