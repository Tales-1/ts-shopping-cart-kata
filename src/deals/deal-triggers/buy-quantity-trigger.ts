import { ReceiptItem } from "../../receipt";
import { TriggerBase } from "./base-trigger";

class BuyQuantityTrigger extends TriggerBase {
    private readonly _triggerVariable:number;

    constructor(category: string, triggerVariable: number) {
        super(category);
        this._triggerVariable = triggerVariable;
    }

    validate(receiptItem: ReceiptItem){
        return receiptItem.quantity >= this._triggerVariable;
    }
}

export { BuyQuantityTrigger }