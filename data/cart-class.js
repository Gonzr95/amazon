class Cart {
    cartItems;
    #localStorageKey; //private

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    
        if(!this.cartItems) {
          this.cartItems = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
            },{
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '3'
            }];
        }
    }
    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }
    addToCart(productId){
        let matchingProduct;
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId){
            matchingProduct = cartItem;
            }
        }); 
        if(matchingProduct){
            matchingProduct.quantity += 1;
        }
        else{
            this.cartItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'

            });
        }
        this.saveToStorage();
    }
    removeItemFromCart(productId){
        this.cartItems.forEach((cartItem, index) => {
          if(productId === cartItem.productId){
            cart.splice(index, 1);
          }
        });
        this.saveToStorage();
    }
    updateDeliveryOption(productId, deliveryOptionId){
        let matchingProduct;
        this.cartItems.forEach((cartItem) => {
          if(productId === cartItem.productId){
            matchingProduct = cartItem;
          }
        });
        matchingProduct.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}

    const cart = new Cart('cart-oop');
    const businessCart = new Cart('businessCart');

    businessCart.addToCart('5968897c-4d27-4872-89f6-5bcb052746d7');

    console.log(cart);
    console.log(businessCart);

    console.log(businessCart instanceof(Cart));