# The Supermarket Checkout Kata in Typescript
This is a variation of a popular kata described in
http://codekata.com/kata/kata01-supermarket-pricing.
The aim of the exercise is to build an automated checkout that can scan products to produce a receipt.

The supermarket has a catalogue with different types of products (rice, apples, milk, toothbrushes,...).
Each product has a price, and the total price of the shopping cart is the total of all the prices.

But the supermarket also runs special deals, for example:
- Buy two toothbrushes, get one free
- 10% discount on rice
- 20% discount on apples if you buy more than 10
- Bags of 1 kg of oranges £4 instead of £5.

These are just examples: the actual special deals change each week, so need to be easily configurable.

### The Goal

The goal of the exercise is to implement a `Checkout` that can handle the following scenarios (and more - use your imagination!):

- The checkout should be able to handle a shopping cart with no special deals
- The client should get a receipt with the list of purchases and the total price.
- The teller should be able to handle the following special deals:
    - Buy 2 get one free
    - Buy 4 get one free
    - 10% discount on a certain product (e.g. 10% discount on 1kg packets of rice)
    - 20% discount on a certain product if you buy more than 10 (e.g 20% discount on apples for 11 or more apples)
    - Fixed discounts (e.g. bag of 1kg of oranges costs £4 instead of £5).
- The system can be configured with multiple different special deals,
  so the teller should be able to correctly detect and apply all the special deals applicable to a given shopping cart.
  To keep things simple you can assume that there will be up to one deal per product category.

There is a simple failing test in `src/checkout.spec.ts` to get you started.

### Running the tests

The tests that you'll find follow the naming convention `*.spec.ts` and are written using [Jest](https://jestjs.io/).

- to run the tests, run the following command:
```
npm test
```
#   t s - s h o p p i n g - c a r t - k a t a  
 