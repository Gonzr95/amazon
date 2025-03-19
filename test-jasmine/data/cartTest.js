import { addToCart, cart} from '../../data/cart.js';

describe('test suite: addToCart', () => {
   it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            //we are overwriting the original with this Fx
            return JSON.stringify([]);//acordate qe localStorage solo soporta string
        });
        console.log(localStorage.getItem('cart'));

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.lenght).toEqual(1);
    });
   it('adds an existing product to the cart', () => {
        expect();
    });  
});