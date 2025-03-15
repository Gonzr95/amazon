

export const cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
},{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

export function addToCart(productId){
    let matchingProduct;
    cart.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingProduct = cartItem;
      }
    });
    if(matchingProduct){
      matchingProduct.quantity += 1;
    }
    else{
      cart.push({
        productId: productId,
        quantity: 1
      });
    }
    console.log(cart);
}

export function removeItemFromCart(productId){
    cart.forEach((cartItem, index) => {
      if(productId === cartItem.productId){
        cart.splice(index, 1);
      }
    });
    console.log(cart);
}