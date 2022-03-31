import axios from 'axios';

export async function getOrders() {
    let orders = [];
    console.log("getOrders");

    try {
        await axios.get('http://localhost:3200/orders?completed_at_ne=')
            .then(resp => {
                orders = resp.data;
            }
            );
    } catch (error) {
        console.log("Error getting orders for all merchants: " + error);
    }
    return orders;
}

export async function getOrdersByMerchantId(merchantId) {
    let orders = [];
    console.log("getOrdersByMerchantId");
    try {
        await axios.get('http://localhost:3200/orders?merchant_id=' + merchantId +
            '&completed_at_ne=')
            .then(resp => {
                orders = resp.data;
            }
            );
    } catch (error) {
        console.log("Error getting orders for merchant" + merchantId);
    }

    return orders;
}


export async function persist(payload) {
    try {
        await axios.post('http://localhost:3200/disboursments', payload)
            .then(console.log('Success saving disboursment: ' + payload.merchantId));
    } catch (error) {
        console.log('Error saving disboursment ' + error);
    }

}

