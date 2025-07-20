import { OfferRule, TriggerRule } from "./rules"

interface DealConfigObject {
    productName: string,
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

export { DealConfigObject, OfferConfig, TriggerConfig }