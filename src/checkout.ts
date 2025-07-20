import { Deal } from './deals/deal';
import { createDeal, DealConfigObject, deals } from './deals/deals-config';
import { Product } from './product';
import { Receipt, ReceiptItem } from './receipt';

// My approach:
// Implement strategy pattern. Break down deal into trigger and offer algorithms.
// Isolating these algorithms grants us complete flexibility in creating deals
// Separate trigger from offer
// Combine the two to create a special deal

export class Checkout {
    private _products : Array<Product> = [];
    private readonly _deals: DealConfigObject[];

    constructor(){
        this._deals = deals.map(deal => createDeal(deal));
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

            const existing = productsSoFar.find(psf => psf.product.name == product.name);   

            if(existing) {
               existing.quantity++
               return; 
            } 

            productsSoFar.push({ product, quantity: 1 });

            return productsSoFar;
            }, []
        );

        const totalPrice = receiptItems.reduce((acc, item) => { 
            const dealConfig = this._deals.find(deal => deal.category.toLowerCase() == item.product.name);

            if(dealConfig == null)
                return acc + item.product.price * item.quantity;

            const deal = new Deal(dealConfig);

            const dealPrice = deal.getFinalPrice(item);

            return dealPrice;
        }, 0) 

        return new Receipt(receiptItems, totalPrice);
    }
}