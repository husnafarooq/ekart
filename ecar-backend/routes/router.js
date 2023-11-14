// to define routes for client requests

//1 import express
const express = require('express');
//4 import product controller
const productController = require('../controllers/productController')
const wishlistController = require('../controllers/wishlistController')
const cartController = require('../controllers/cartController')

//2 Using express create object for Router class inorder to setup path
const router = new express.Router()

//3 use router object to resolve client request
    //get all products api request

router.get('/products/all-products',productController.getAllProducts)

//get a particular product details
router.get('/products/view-product/:id',productController.viewProduct)

//add a new product to thewishlist
router.post('/wishlists/add-to-wishlist',wishlistController.addToWishlist)

//view all wishlist items
router.get('/wishlists/view-all-wishlists',wishlistController.getWishlistItems)

//delete a particular wishlist item
router.delete('/wishlists/delete-wishlist-product/:id',wishlistController.deleteProduct)

//add to cart
router.post('/carts/add-to-cart',cartController.addToCart)

//get cart products
router.get('/carts/get-cart',cartController.getCart)

//delete a particular cart item
router.delete('/carts/delete-product/:id',cartController.deleteCartProduct)

//increment cart quantity
router.get('/carts/increment-product/:id',cartController.incrementProductCount)

//decrement 
router.get('/carts/decrement-product/:id',cartController.decrementCartProductCount)

//5 export routes
module.exports=router
