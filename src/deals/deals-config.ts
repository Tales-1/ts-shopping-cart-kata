import { OfferRule, TriggerRule } from "./rules"

interface DealConfigObject {
    category: string,
    triggerConfig:  TriggerConfig
    offerConfig: OfferConfig,
}

interface OfferConfig {
    offerRule: OfferRule,
    offerVariable?: number,
}

interface TriggerConfig {
    triggerRule: TriggerRule,
    triggerVariable?: number,
}

interface DealOptions {
    category: string,
    triggerRule: TriggerRule,
    offerRule: OfferRule,
    triggerVariable?: number,
    offerVariable?: number
}

// Adding a deal is as simple as creating a new DealInit object and adding to this array.
const deals:DealOptions[] = [
    {
        category:"toothbrush",
        triggerRule:TriggerRule.BUY_X_QUANTITY,
        triggerVariable:2,
        offerRule:OfferRule.FREE_ITEM,
        offerVariable:1
    },
    {
        category:"oranges",
        triggerRule:TriggerRule.ITEM,
        triggerVariable:null,
        offerRule:OfferRule.FIXED_DISCOUNT,
        offerVariable:1
    },
    {
        category:"rice",
        triggerRule: TriggerRule.ITEM,
        triggerVariable:null,
        offerRule: OfferRule.PERCENTAGE_DISCOUNT,
        offerVariable: 10
    },
    {
        category:"apple",
        triggerRule: TriggerRule.BUY_MORE_THAN_X,
        triggerVariable:10,
        offerRule: OfferRule.PERCENTAGE_DISCOUNT,
        offerVariable: 10
    }
]

function createDeal(deal: DealOptions){
    return {
        category: deal.category,
        triggerConfig:{
            triggerRule: deal.triggerRule,
            triggerVariable: deal.triggerVariable,
        },
        offerConfig:{
            offerRule: deal.offerRule,
            offerVariable: deal.offerVariable
        }
    } as DealConfigObject
}

export { DealConfigObject, OfferConfig, TriggerConfig, deals, createDeal}