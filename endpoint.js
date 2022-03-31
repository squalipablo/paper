import express from 'express';
import { getDisboursmentsToShowAndPersist, getDisboursmentsToShowByMerchantAndPersist } from './business.js';


const app = express();

const port = 3000;

app.get('/calculateDisboursments', async (req, res) => {
    
    let disbourments = await getDisboursmentsToShowAndPersist(req.query.fromDate || null, req.query.toDate || null);
    res.send(disbourments || 'Loading all the disboursments...');
    });
        
app.get('/calculateDisboursments/:merchantId', async (req, res) => {
    
    let disboursments = await getDisboursmentsToShowByMerchantAndPersist(req.params.merchantId, req.query.fromDate || null, req.query.toDate || null);
    res.send(disboursments || 'Loading the disboursments for merchant id ' 
        + req.params.merchantId + '...');
});




app.listen(port, () => console.log(`Sequra test interview server running on port ${port}!`));

