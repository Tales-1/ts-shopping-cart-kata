import { ReceiptItem } from "../../receipt";
import { OfferBase } from "./base-offer";

class FreeItemOffer extends OfferBase {
    apply(receiptItem:ReceiptItem) : number {
        const total = receiptItem.product.price * receiptItem.quantity;

        receiptItem.quantity++
        
        return total;
    }
}

export { FreeItemOffer }