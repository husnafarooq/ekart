import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  discountStatus:boolean=false;

  offerClick:boolean=false;

  proceedToPaymentStatus:boolean=false;

  name:string=''
  houseNumber:string=''
  streetName:string=''
  state:string=''
  pincode:string=''
  mobileNumber:string=''

  cartTotalPrice=0
  allCart:any=[] //to hold cart products
  constructor(private api:ApiService, private cartfb:FormBuilder){}
  ngOnInit(): void {
    this.api.getCart().subscribe((result:any)=>{
      console.log(result); //array of product
      this.allCart=result;
      this.getCartTotal()
    },
    (result:any)=>{
      console.log(result.error)
    }
    )
  }
  deleteCartProduct(id:any){
    this.api.deleteProduct(id).subscribe((result:any)=>{
      //result? remaining products
      this.allCart=result;
      this.api.cartCount() //update cart count
      this.getCartTotal()
    },
    (result:any)=>{
      alert(result.error)
    }
    )
  }
  //get cart total
  getCartTotal(){
    let total=0
    this.allCart.forEach((item:any)=>{
      total += item.grandTotal
      this.cartTotalPrice=Math.ceil(total)
    })
  }
  incrementCartProduct(id:any){
    this.api.incrementProduct(id).subscribe((result:any)=>{
      this.allCart=result
      this.getCartTotal()
    },
    (result:any)=>{
      alert(result.error)
    }
    )
  }
  //address form
  addressForm=this.cartfb.group({
    name:[''],
    houseNumber:[''],
    streetName:[''],
    state:[''],
    pinNumber:[''],
    mobileNumber:[''],
  })
  submitForm(){
    // alert('Please enter')
    if(this.addressForm.valid){
      this.proceedToPaymentStatus=true;
      this.name=this.addressForm.value.name||''
      this.houseNumber=this.addressForm.value.houseNumber||''
      this.streetName=this.addressForm.value.streetName||''
      this.state=this.addressForm.value.state||''
      this.pincode=this.addressForm.value.pinNumber||''
      this.mobileNumber=this.addressForm.value.mobileNumber||''

    }
    else(
      alert("please enter valid details")
    )
  }
  offerClicked(){
    this.offerClick=true
    // alert('offer')
  }
  discountCalculate(value:any){
    this.discountStatus=true
    this.cartTotalPrice=this.cartTotalPrice*(100-value)/100
  }
}
