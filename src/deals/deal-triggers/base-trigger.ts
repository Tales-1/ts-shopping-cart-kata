import { ReceiptItem } from "../../receipt";

class TriggerBase {
    protected readonly _category : string

    constructor(category: string){
        this._category = category;
    }

    validate(receiptItem: ReceiptItem){
        return receiptItem.product.name.toLowerCase() == this._category.toLowerCase();
    }
}

export { TriggerBase }