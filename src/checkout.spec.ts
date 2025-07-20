import { Checkout } from './checkout';
import { Receipt, ReceiptItem} from './receipt';
import { Product } from './product';
import { DealConfigObject, DealOptions } from './deals/deals-config';
import { TriggerRule, OfferRule } from './deals/rules';

const deals:DealOptions[] = [
    {
        category:"Toothbrush",
        triggerRule:TriggerRule.BUY_X_QUANTITY,
        triggerVariable:2,
        offerRule:OfferRule.FREE_ITEM,
        offerVariable:1
    },
    {
        category:"Orange",
        triggerRule:TriggerRule.BUY_X_QUANTITY,
        triggerVariable:4,
        offerRule:OfferRule.FREE_ITEM,
        offerVariable:1
    },
    {
        category:"Rice",
        triggerRule: TriggerRule.ITEM,
        triggerVariable:null,
        offerRule: OfferRule.PERCENTAGE_DISCOUNT,
        offerVariable: 10
    },
    {
        category:"Apple",
        triggerRule: TriggerRule.BUY_MORE_THAN_X,
        triggerVariable:10,
        offerRule: OfferRule.PERCENTAGE_DISCOUNT,
        offerVariable: 20
    },
    {
        category:"Chocolate",
        triggerRule:TriggerRule.ITEM,
        triggerVariable:null,
        offerRule:OfferRule.FIXED_DISCOUNT,
        offerVariable: 4
    }
]

function createDeal(deal: DealOptions){
    return {
        productName: deal.category,
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

function lookupReceiptItem(receipt: Receipt, id: string): ReceiptItem {
    const item = receipt.items.find((x) => x.product.name === id)
    if (!item) {
        throw new Error(`The receipt does not contain a "${id}" item.`)
    }
    return item;
}

describe('Given a customer is shopping at the supermarket', () => {

    describe('When no items have been scanned', () => {

        let receipt: Receipt;

        beforeEach(() => {
            const checkout = new Checkout();
            receipt = checkout.generateReceipt();
        });

        it('Then the receipt should contain no scanned items', () => {
            expect(receipt.items).toHaveLength(0);
        });

        it('Then the receipt total price should be zero', () => {
            expect(receipt.totalPrice).toEqual(0);
        });

    });

    describe('When an a single "Apple" is scanned and there is no promotion/offer', () => {

        let receipt: Receipt;

        beforeEach(() => {
            const checkout = new Checkout();
            checkout.scanItem(new Product('Apple', 0.3))
            receipt = checkout.generateReceipt();
        });

        it('Then the receipt should contain 1 scanned item', () => {
            expect(receipt.items).toHaveLength(1);
        });

        it('Then the receipt should contain an "Apple" item', () => {
            expect(lookupReceiptItem(receipt, 'Apple')).toBeDefined();
        });

        it('Then the receipt "Apple" item should have the correct quantity', () => {
            expect(lookupReceiptItem(receipt, 'Apple').quantity).toEqual(1);
        });

        it('Then the receipt total price should be calculated correctly', () => {
            expect(receipt.totalPrice).toEqual(0.3);
        });

    });

    describe('When two toothbrushes are scanned, we get one free.', () => {

        let receipt: Receipt;

        beforeEach(() => {
            const checkout = new Checkout();

            checkout.assignDeals(deals.map(deal => createDeal(deal)));
            checkout.scanItem(new Product('Toothbrush', 2))
            checkout.scanItem(new Product('Toothbrush', 2))

            receipt = checkout.generateReceipt();
        });

        it('Then the receipt should contain 1 scanned item', () => {
            expect(receipt.items).toHaveLength(1);
        });

        it('Then the receipt should contain a "Toothbrush" item', () => {
            expect(lookupReceiptItem(receipt, 'Toothbrush')).toBeDefined();
        });

        it('Then the receipt "toothbrush" item should have the correct quantity', () => {
            expect(lookupReceiptItem(receipt, 'Toothbrush').quantity).toEqual(3);
        });

        it('Then the receipt total price should be calculated correctly', () => {
            expect(receipt.totalPrice).toEqual(4);
        });
    });

    describe('When four oranges are scanned, we get one free.', () => {

        let receipt: Receipt;

        const ORANGE_QUANTITY = 4;

        beforeEach(() => {
            const checkout = new Checkout();

            checkout.assignDeals(deals.map(deal => createDeal(deal)));
            Array.from({ length: ORANGE_QUANTITY }).forEach(_ => checkout.scanItem(new Product('Orange', 2)));

            receipt = checkout.generateReceipt();
        });

        it('Then the receipt should contain 1 scanned item', () => {
            expect(receipt.items).toHaveLength(1);
        });

        it('Then the receipt should contain an "Orange" item', () => {
            expect(lookupReceiptItem(receipt, 'Orange')).toBeDefined();
        });

        it('Then the receipt "Orange" item should have the correct quantity', () => {
            expect(lookupReceiptItem(receipt, 'Orange').quantity).toEqual(5);
        });

        it('Then the receipt total price should be calculated correctly', () => {
            expect(receipt.totalPrice).toEqual(8);
        });
    });

    describe('When rice is bought, we get 10% off.', () => {

        let receipt: Receipt;

        beforeEach(() => {
            const checkout = new Checkout();

            checkout.assignDeals(deals.map(deal => createDeal(deal)));
            checkout.scanItem(new Product('Rice', 10));

            receipt = checkout.generateReceipt();
        });

        it('Then the receipt should contain 1 scanned item', () => {
            expect(receipt.items).toHaveLength(1);
        });

        it('Then the receipt should contain an "Rice" item', () => {
            expect(lookupReceiptItem(receipt, 'Rice')).toBeDefined();
        });

        it('Then the receipt "Orange" item should have the correct quantity', () => {
            expect(lookupReceiptItem(receipt, 'Rice').quantity).toEqual(1);
        });

        it('Then the receipt total price should be calculated correctly', () => {
            expect(receipt.totalPrice).toEqual(9);
        });
    });

    describe('When more than 10 "Apples" are scanned, we get 20% off.', () => {

        let receipt: Receipt;

        const APPLE_QUANTITY = 20;

        beforeEach(() => {
            const checkout = new Checkout();
            checkout.assignDeals(deals.map(deal => createDeal(deal)));

            Array.from({ length: APPLE_QUANTITY }).forEach(_ => checkout.scanItem(new Product("Apple", 1)));

            receipt = checkout.generateReceipt();
        });

        it('Then the receipt should contain 1 scanned item', () => {
            expect(receipt.items).toHaveLength(1);
        });

        it('Then the receipt should contain an "Apple" item', () => {
            expect(lookupReceiptItem(receipt, "Apple")).toBeDefined();
        });

        it('Then the receipt "Apple" item should have the correct quantity', () => {
            expect(lookupReceiptItem(receipt, "Apple").quantity).toEqual(20);
        });

        // 20% off would be 16.
        it('Then the receipt total price should be calculated correctly', () => {
            expect(receipt.totalPrice).toEqual(16);
        });
    });

    describe('When Chocolate is bought, it has a fixed discount of £4 instead of £5.', () => {

        let receipt: Receipt;

        beforeEach(() => {
            const checkout = new Checkout();

            checkout.assignDeals(deals.map(deal => createDeal(deal)));
            checkout.scanItem(new Product('Chocolate', 5));

            receipt = checkout.generateReceipt();
        });

        it('Then the receipt should contain 1 scanned item', () => {
            expect(receipt.items).toHaveLength(1);
        });

        it('Then the receipt should contain an "Chocolate" item', () => {
            expect(lookupReceiptItem(receipt, 'Chocolate')).toBeDefined();
        });

        it('Then the receipt "Chocolate" item should have the correct quantity', () => {
            expect(lookupReceiptItem(receipt, 'Chocolate').quantity).toEqual(1);
        });

        it('Then the receipt total price should be calculated correctly', () => {
            expect(receipt.totalPrice).toEqual(4);
        });
    });

    // Combine all deals for a stress test
    describe('When all of the above deals are active, get the correct total price .', () => {
        let receipt: Receipt;

        // Toothbrush * 2 (4) + Orange * 4 (8) + Apple * 20 (with 20% off)(16) + Rice(9) + chocolate (fixed discount of 4)
        const EXPECTED_TOTAL = 41;
        const TOOTHBRUSH_QUANTITY = 2;
        const ORANGE_QUANTITY = 4;
        const APPLE_QUANTITY = 20;

        beforeEach(() => {
            const checkout = new Checkout();
            checkout.assignDeals(deals.map(deal => createDeal(deal)));
            
            Array.from({ length: TOOTHBRUSH_QUANTITY }).forEach(_ => checkout.scanItem(new Product("Toothbrush", 2)));
            Array.from({ length: ORANGE_QUANTITY }).forEach(_ => checkout.scanItem(new Product('Orange', 2)));
            Array.from({ length: APPLE_QUANTITY }).forEach(_ => checkout.scanItem(new Product("Apple", 1)));

            checkout.scanItem(new Product("Chocolate", 5));
            checkout.scanItem(new Product('Rice', 10))


            receipt = checkout.generateReceipt();
        });

        it('Then the receipt should contain 1 scanned item', () => {
            expect(receipt.items).toHaveLength(5);
        });

        it('Then the receipt should contain an "Apple" item', () => {
            expect(lookupReceiptItem(receipt, "Apple")).toBeDefined();
        });

        it('Then the receipt should contain an "Toothbrush" item', () => {
            expect(lookupReceiptItem(receipt, "Toothbrush")).toBeDefined();
        });

         it('Then the receipt should contain an "Orange" item', () => {
            expect(lookupReceiptItem(receipt, "Orange")).toBeDefined();
        });

        it('Then the receipt should contain an "Rice" item', () => {
            expect(lookupReceiptItem(receipt, "Rice")).toBeDefined();
        });

        it('Then the receipt "Apple" item should have the correct quantity', () => {
            expect(lookupReceiptItem(receipt, "Apple").quantity).toEqual(20);
        });

        it('Then the receipt total price should be calculated correctly', () => {
            expect(receipt.totalPrice).toEqual(EXPECTED_TOTAL);
        });
    });
});