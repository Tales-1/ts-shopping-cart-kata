import { DealConfigObject, OfferConfig, TriggerConfig } from "./deals-config";
import { ReceiptItem } from "../receipt";
import { OfferBase } from "./deal-offers/base-offer";
import { FixedDiscountOffer } from "./deal-offers/fixed-discount-offer";
import { FreeItemOffer } from "./deal-offers/free-item-offer";
import { PercentageDiscountOffer } from "./deal-offers/percentage-discount-offer";
import { TriggerBase } from "./deal-triggers/base-trigger";
import { BuyQuantityTrigger } from "./deal-triggers/buy-quantity-trigger";
import { OfferRule, TriggerRule } from "./rules";
import { BuyMoreThanTrigger } from "./deal-triggers/buy-more-than-trigger";

class Deal {
    private readonly _offerConfig : OfferConfig;
    private readonly _triggerConfig : TriggerConfig;
    private readonly _category: string;
    
    constructor(deal: DealConfigObject) {
        this._offerConfig = deal.offerConfig;
        this._triggerConfig = deal.triggerConfig;
        this._category = deal.category;
    }

    public getFinalPrice(receiptItem: ReceiptItem) {
        const originalPrice = receiptItem.product.price * receiptItem.quantity;

        if(receiptItem.product.name.toLowerCase() != this._category) 
            return originalPrice;

        if(!this.receiptItemIsEligible(receiptItem)) return originalPrice;

        const totalPrice = this.applyOffer(receiptItem);

        return totalPrice;
    }

    private receiptItemIsEligible(receiptItem:ReceiptItem){
        const trigger = this.initialiseTrigger();
        const isEligible = trigger.validate(receiptItem);
        return isEligible;
    }

    private applyOffer(receiptItem: ReceiptItem){
        const offer = this.initialiseOffer();
        const totalPrice = offer.apply(receiptItem);
        return totalPrice;
    }

    private initialiseTrigger() {
        const rule = this._triggerConfig.triggerRule;
        const variable = this._triggerConfig.triggerVariable;
        const category = this._category;

        switch(rule){
            case(TriggerRule.BUY_X_QUANTITY):
                return new BuyQuantityTrigger(this._category, variable);

            case(TriggerRule.BUY_MORE_THAN_X):
                return new BuyMoreThanTrigger(this._category, variable);
                
            default:
                return new TriggerBase(category);
        }
    }

    private initialiseOffer(){
        const rule = this._offerConfig.offerRule;
        const variable = this._offerConfig.offerVariable;

        switch(rule){
            case(OfferRule.FREE_ITEM):
                return new FreeItemOffer();

            case(OfferRule.PERCENTAGE_DISCOUNT):
                return new PercentageDiscountOffer(variable);

            case(OfferRule.FIXED_DISCOUNT):
                return new FixedDiscountOffer(variable);

            default:
                return new OfferBase();
        }
    }
}

export { Deal }