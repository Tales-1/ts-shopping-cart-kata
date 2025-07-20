import { Product } from './product';
import { Receipt, ReceiptItem } from './receipt';


export class Checkout {
    private products : Array<Product> = [];

    public scanItem(product: Product): void {
        this.products.push(product);
    }

    public generateReceipt(): Receipt {
        // Receipt item
        // Product - name & price + quantity.
        const receiptItems = this.products.reduce(
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

        const totalPrice = receiptItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0) 

        // Apply special offers?

        // Special offer
        // CallBack
        return new Receipt(receiptItems, totalPrice);
    }
}






const specialOffersKeys = {
    PERCENTAGE_DISCOUNT: "PercentageDiscount",
    FIXED_DISCOUNT: "FixedDiscount",
    FREE_ITEM: "FreeItem",
}

const triggers = {
    DEFAULT: "default",
    BUY_X_QUANTITY: "BuyXQuantity"
}

interface SpecialOffer {
    offerKey: string,
    trigger: string,
}


const specialOffers: SpecialOffer[] = [
    {
        offerKey: specialOffersKeys.PERCENTAGE_DISCOUNT,
        trigger:triggers.BUY_X_QUANTITY,

    },
]
    // Separate trigger from offer
    // Combine the two to create a deal!

    // OFFER
        // Discount
            // Percentage
            // Fixed discount 
        // Free item

    // TRIGGERS
        // Item itself
        // Buy X quantity

