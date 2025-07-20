import { ReceiptItem } from "../../receipt";
import { OfferBase } from "./base-offer";

class PercentageDiscountOffer extends OfferBase {
    private readonly _offerVariable: number;

    constructor(offerVariable: number){
        super()
        this._offerVariable = offerVariable;
    }

    apply(receiptItem: ReceiptItem) : number{
        const percentageAsDecimal = this._offerVariable / 100;

        const currentPrice = receiptItem.product.price * receiptItem.quantity;

        const discounted = currentPrice - (currentPrice * percentageAsDecimal);

        return discounted;
    }
}

export { PercentageDiscountOffer}