# Ionic + Stripe

1. Step 1. In the index.html file put inside the header section the next line to import the stripe.js library:

	<script src="https://js.stripe.com/v3/" async></script>

2. Add this folder to the providers folder, and add the "StripeProvider" to the App Module.

3. Inside the Stripe Provider Folder change:
	a. pk. STRIPE ACCOUNT PUBLIC KEY. eg. pk_test_bwg1iKl2WuLgeZBGEqkfoc8g005rcwKN9D
	b. api. URI that handles the stripe charge. eg. "https://stripe-festival-enjambregroup-etrivinos.c9users.io/stripe-payment"
