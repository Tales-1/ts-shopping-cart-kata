import { ReceiptItem } from "../../receipt";
import { OfferBase } from "./base-offer";

class PercentageDiscountOffer extends OfferBase {
    private readonly _offerVariable: number;

    constructor(offerVariable: number){
        super()
        this._offerVariable = offerVariable;
    }

    apply(receiptItem: ReceiptItem) : number{
        const percentageDiscount = this._offerVariable;

        const currentPrice = receiptItem.product.price * receiptItem.quantity;

        const discounted = currentPrice - (currentPrice / percentageDiscount);

        return discounted;
    }
}

export { PercentageDiscountOffer}