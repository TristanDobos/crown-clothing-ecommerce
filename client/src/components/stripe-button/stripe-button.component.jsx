import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51IFkvDAWITpHJDwfPQCiRVXfwiXGS9FGprbPDRvoCVQZVBaOoTs7JNkxTrp2SH8WcD581TAiAiIbU2S59jtx1Gce00Spf18wDh';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token: token
      }
    })
      .then(response => {
        alert('Platba prebehla úspešne!');

      })
      .catch(error => {
        console.log('Platobná chyba: ', JSON.parse(error));
        alert(
          'Pri zpracovávaní platby nastala chyba. Skúste znova.'
        );
      });
  };

  return (
    <StripeCheckout
      label='Zaplatiť teraz kartou'
      name='Oblečenie koruna'
      currency="eur"
      billingAddress
      shippingAddress
      image='https://i.ibb.co/0QTybd5/crwn-192x192.png'
      description={`Cena k úhrade je ${price}€`}
      amount={priceForStripe}
      panelLabel='Zaplatiť teraz'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
