import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart} from '../../data/cart.js';

describe ('Test suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    beforeEach(() => {
        spyOn(localStorage, 'setItem')
        //renderOrderSummary toma el carro y lo muestra. Pero lo hace a traves de localStorage asi que hay que mockear
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
                },{
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '3'
             }]);
        });
        /*
        el contenido que se genera en esta Fx se muestra en un div, como no queremos intervernir con el div real creamos un contenedor en el html jasmin de test
        para poder seleccionar desde el dom le tengo que dar una nueva clase .js para que no interfiera con la de la rama principal
        */
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>`;
            loadFromStorage();
            renderOrderSummary();
    });


    it('Displays the cart', () => {
        //chequear si se han creado 2 cotainer para C/U de los productos en el carro
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
        //to contain chekea si x valor contiene ('este string')
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
    

        document.querySelector('.js-test-container').innerHTML = '';
    });

    
    it('Removes a product', () => {
        document.querySelector(`.js-delete-link-${productId1}`).click();
        /*
        Aca no funcionaria porque en el codigo de order summary cuando elimino un producto tambien estoy llamando a renderizar la orden. y como esa orden Payment no la tengo aca me tira null y tambien debo traer el div para que lo renderice. Ya lo hice en el beforeEach()
        */

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-container-${productId1}`)).toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2)
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);

        document.querySelector('.js-test-container').innerHTML = '';
    });
});