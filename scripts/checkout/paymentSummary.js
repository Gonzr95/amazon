import { cart } from '../../data/cart.js';
import { formatCurrency } from '../utils/money.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';

export function renderPaymentSummary(){
    let subTotal = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);

        let itemsQuantity = 0;
        itemsQuantity += cartItem.quantity;

        subTotal += product.priceCents * cartItem.quantity;
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents

    });

    const totalBeforeTaxes = shippingPriceCents + subTotal;
    const taxes = totalBeforeTaxes * 0.10;
    const totalCents = totalBeforeTaxes + taxes + shippingPriceCents;

    //view 
    const paymentSummaryHTML =
    `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (${cart.length}):</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxes)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxes)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxes)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = 
        paymentSummaryHTML;
    
    
}