import { Deal } from './deals/deal';
import {  DealConfigObject } from './deals/deals-config';
import { Product } from './product';
import { Receipt, ReceiptItem } from './receipt';

// My approach:
// Implement strategy pattern. Break down deal into trigger and offer algorithms.
// Isolating these algorithms grants us complete flexibility in creating deals
// Separate trigger from offer
// Combine the two to create a deal

export class Checkout {
    private _products : Array<Product> = [];
    private _deals: DealConfigObject[] = []

   public assignDeals(deals: DealConfigObject[]){
     this._deals = deals;
   }

    public scanItem(product: Product): void {
        this._products.push(product);
    }

    public generateReceipt(): Receipt {
        const receiptItems = this._products.reduce(
            (
                productsSoFar: ReceiptItem[],
                product,
            ) => {

            const existing = productsSoFar?.find(psf => psf.product.name == product.name);   
            
            if(existing) {
               existing.quantity++
               return productsSoFar;
            } 

            productsSoFar.push({ product, quantity: 1 });

            return productsSoFar;
            }, []
        );

        const totalPrice = receiptItems?.reduce((acc, item) => { 
            const dealConfig = this._deals.find(deal => deal.productName.toLowerCase() == item.product.name.toLowerCase());

            if(dealConfig == null)
                return acc + item.product.price * item.quantity;

            const deal = new Deal(dealConfig);

            const dealPrice = deal.getFinalPrice(item);

            return acc + dealPrice;
        }, 0) 

        return new Receipt(receiptItems, totalPrice);
    }
}