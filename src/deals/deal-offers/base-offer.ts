import { ReceiptItem } from "../../receipt";

class OfferBase { 
    apply(receiptItem: ReceiptItem): number {
        return receiptItem.product.price * receiptItem.quantity;
    }
}

export { OfferBase }


