import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  cartItemCount=new BehaviorSubject(0) //to hold cart item count
  searchTerm=new BehaviorSubject(''); //to hold search value
  // using BehaviorSubject to pass stream of data from one componen to another

  constructor(private http:HttpClient) {
     this.cartCount() 
    }
  BASE_URL = 'http://localhost:5000'
//api function to get all products from the database
getAllProducts(){
  return this.http.get(`${this.BASE_URL}/products/all-products`)
}
//api function to view paricular product from the database
viewProduct(id:any){
  return this.http.get(`${this.BASE_URL}/products/view-product/${id}`)
}
//api function to  add products to thewishlist
addToWishlist(id:any,title:any,price:any,image:any){
  const body={
    id,
    title,
    price,
    image
  }
  return this.http.post(`${this.BASE_URL}/wishlists/add-to-wishlist`,body)
}
//view wishlist products
viewWishlist(){
  return this.http.get(`${this.BASE_URL}/wishlists/view-all-wishlists`)
}
//delete wishlist products
deleteWishlistProduct(id:any){
  return this.http.delete(`${this.BASE_URL}/wishlists/delete-wishlist-product/${id}`)
}

//add to cart
addToCart(product:any){  //product is an object with properties
//get the product details - id,title,price,image,quantity
const body={
  id:product.id,
  title:product.title,
  price:product.price,
  image:product.image,
  quantity:product.quantity
}
return this.http.post(`${this.BASE_URL}/carts/add-to-cart`,body)
}
//get cart products
getCart(){
  return this.http.get(`${this.BASE_URL}/carts/get-cart`)
}
//to get cart products count
cartCount(){
  this.getCart().subscribe((result:any)=>{
    this.cartItemCount.next(result.length)
  })
}
//delete product
deleteProduct(id:any){
  return this.http.delete(`${this.BASE_URL}/carts/delete-product/${id}`)
}
//increment cart product
incrementProduct(id:any){
  return this.http.get(`${this.BASE_URL}/carts/increment-product/${id}`)
}
 //decrement cart product
 
}

