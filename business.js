import currency from "currency.js";
import { persist, getOrders, getOrdersByMerchantId } from './service.js';

export async function getDisboursmentsToShowAndPersist(fromDate, toDate) {
    let orders = await getOrders();
    let disbourments = await getDisboursments(orders, fromDate, toDate);

    persistDisboursments(disbourments, fromDate, toDate);

    return disbourments;
}

export async function getDisboursments(orders, fromDate, toDate) {
    let disbourments = calculateDisboursments(orders, fromDate, toDate);

    return disbourments;
}

export async function getDisboursmentsToShowByMerchantAndPersist(merchantId, fromDate, toDate) {
    let orders = await getOrdersByMerchantId(merchantId);
    let disbourments = await getDisboursments(orders, fromDate, toDate);

    persistDisboursments(disbourments, fromDate, toDate);

    return disbourments;
}

async function persistDisboursments(disboursments, fromDate, toDate) {
    let payload = createPersistPayload(disboursments, fromDate, toDate);
    payload.forEach((item) => {
        persist(item);
    });
}

function createPersistPayload(merchantOrdersMap, fromDate, toDate) {
    let payload = [];
    for (const [key, value] of merchantOrdersMap.entries()) {
        console.log(key, value);

        payload.push({
            "merchantId": key,
            "amount": value,
            "fromDate": fromDate,
            "toDate": toDate
        });
    }

    return payload;

}

function calculateDisboursments(orders, fromDate, toDate) {

    let merchantOrdersMap = new Map();
    let from = Date.parse(fromDate);
    let to = Date.parse(toDate);

    orders.forEach(order => {
        let orderDate = Date.parse(order.completed_at);
        if (orderDate < to && orderDate > from) {
            if (merchantOrdersMap.has(order.merchant_id)) {
                let disboursment = merchantOrdersMap.get(order.merchant_id);
                let amount = currency(disboursment).add(currency(order.amount));
                merchantOrdersMap.set(order.merchant_id, amount.value);
            } else {
                merchantOrdersMap.set(order.merchant_id, order.amount);
            }
        }

    });



    return merchantOrdersMap;


}
