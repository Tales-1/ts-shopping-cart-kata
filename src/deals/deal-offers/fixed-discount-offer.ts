import { ReceiptItem } from "../../receipt";
import { OfferBase } from "./base-offer";

class FixedDiscountOffer extends OfferBase {
    private readonly _offerVariable;
    
    constructor(offerVariable: number){
        super()
        this._offerVariable = offerVariable;
    }

    apply(receiptItem: ReceiptItem) : number {
        const fixedDiscount = this._offerVariable;
        const currentPrice = fixedDiscount * receiptItem.quantity;
        return currentPrice;
    }
}

export { FixedDiscountOffer }