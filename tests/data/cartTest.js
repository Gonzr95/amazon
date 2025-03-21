import { addToCart, cart, loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => {

    it('adds a NEW product to the cart', () => {
        spyOn(localStorage, 'setItem').and.callFake(() => {
            
        });

        //1ro el obj que queremos mockear, 2do el metodo que queremos mockear
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);//aca hacemos que get item nos devuelva un string vacio para simular que el carro esta vacio
            //todo este paso es el setup para hacer el mock asi que lo siguiente es llamar al mock a traves de load from storage y hacer la prueba
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);//expect nos devuelve un obj con metodos. Este sirve para ver si se ha llamado a la Fx
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });

    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'setItem');
    
        spyOn(localStorage, 'getItem').and.callFake(() => {
          return JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
          }]);
        });
        loadFromStorage();
    
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
      });

 
});