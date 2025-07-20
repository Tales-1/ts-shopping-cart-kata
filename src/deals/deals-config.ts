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

interface DealOptions {
    category: string,
    triggerRule: TriggerRule,
    offerRule: OfferRule,
    triggerVariable?: number,
    offerVariable?: number
}

export { DealConfigObject, OfferConfig, TriggerConfig, DealOptions}