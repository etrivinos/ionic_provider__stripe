import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { stripeConfig } from './stripe.config';

declare var Stripe;

@Injectable()
export class StripeProvider {
	stripe = Stripe(stripeConfig.pk);
  card: any;

  constructor(
    private http: Http
  ) {}

  /**
  * @method setupStripe
  * @description Setup Stripe Elements 
  * @return void
  */
  setupStripe(callback){
  	this.initCard();
  	this.setForm(callback);
  }

  /**
  * Init the stripe card
  * @method initCard
  * @return void
  */
  initCard() {
    this.card = this.stripe.elements().create('card', { style: stripeConfig.style });
    this.card.mount('#card-element');
    this.addChangeEventListener();
  }

  /**
  * Add the change event listener to capture the card elements errors
  * @method addChangeEventListener
  * @return void
  */
  addChangeEventListener() {
  	this.card.addEventListener('change', event => {
      let displayError = document.getElementById('card-errors');

      if (event.error) {
        displayError.textContent = event.error.message;
      } 
      else {
        displayError.textContent = '';
      }
    });
  }

  /**
  * Set the form to handle the submit to get the token
  * @method setForm
  * @return void
  */
  setForm(callback) {
    let form = document.getElementById('payment-form');
    
    form.addEventListener('submit', event => {
      event.preventDefault();

      this.stripe.createToken(this.card)
        .then(result => {
          if (result.error) {
            let errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
          } else {
            this.card.clear();
            callback(result);
          }
        }).
        catch( error => {
        	callback(null, error);
        });
    });
  }

  /**
  * Send the stripe request
  * @method sendStripeRequest
  * @param {Object} Data to send.
    Example: 
        {
          token_id: '<stripe_token_id>',
          amount:   50,
        }
  * @return Observable
  */
  sendStripeRequest(data) {
  	var headers = new Headers();
    var dataToSend = 'stripetoken=' + data.token_id + '&amount=' + data.amount;
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(
	    stripeConfig.api, 
      dataToSend,
      { headers: headers }
    );
  }
}
