import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import {
  selectCartItems,
  selectCartTotal
} from '../../redux/cart/cart.selectors';

import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  WarningContainer
} from './checkout.styles';

export const CheckoutPage = ({ cartItems, total }) => (
  <CheckoutPageContainer>
    <CheckoutHeaderContainer>
      <HeaderBlockContainer>
        <span>Produkt</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Popis</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Množstvo</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Cena</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Odobrať</span>
      </HeaderBlockContainer>
    </CheckoutHeaderContainer>
    {cartItems.map(cartItem => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <TotalContainer>CELKOM: {total}€</TotalContainer>
    <WarningContainer>
      *Prosím použite nasledovné údaje platobnej karty:*
      <br />
      4242 4242 4242 4242 - Exp: 01/22 - CVV: 123
    </WarningContainer>
    <StripeCheckoutButton price={total} />
  </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
