import { getDisboursments } from "../business.js";
import assert from "assert";

describe('calculate disboursment amount for merchant\'s orders', () => {
    it("should be the same disbourment sum", async () => {
        const input = [{
          "id":"3",
          "merchant_id":"7",
          "shopper_id":"125",
          "amount":"445.5",
          "created_at":"01/01/2018 02:51:00",
          "completed_at":"01/07/2018 02:51:00"
          },
          {
          "id":"26",
          "merchant_id":"7",
          "shopper_id":"87",
          "amount":"59.03",
          "created_at":"01/01/2018 00:46:00",
          "completed_at":"01/05/2018 00:46:00"
          }

        ]
    
        const output = new Map().set("7",504.53);
        const disboursment = await getDisboursments(input, "01/02/2018", "01/08/2018");
        assert.equal(disboursment.get("7"), output.get("7"));
    
      });
    });


    describe('calculate disboursment amount for different merchants\' orders', () => {
      it("should be the same disbourment sum", async () => {
          const input = [{
            "id":"3",
            "merchant_id":"9",
            "shopper_id":"125",
            "amount":"445.5",
            "created_at":"01/01/2018 02:51:00",
            "completed_at":"01/07/2018 02:51:00"
            },
            {
            "id":"26",
            "merchant_id":"7",
            "shopper_id":"87",
            "amount":"59.03",
            "created_at":"01/01/2018 00:46:00",
            "completed_at":"01/05/2018 00:46:00"
            },
            {
              "id":"3",
              "merchant_id":"9",
              "shopper_id":"125",
              "amount":"55.5",
              "created_at":"01/01/2018 02:51:00",
              "completed_at":"01/04/2018 02:51:00"
              },
              {
              "id":"62",
              "merchant_id":"7",
              "shopper_id":"87",
              "amount":"44.44",
              "created_at":"01/01/2018 00:46:00",
              "completed_at":"01/04/2018 00:46:00"
              },
              {
                "id":"26",
                "merchant_id":"7",
                "shopper_id":"87",
                "amount":"44.44",
                "created_at":"01/01/2018 00:46:00",
                "completed_at":"01/09/2018 00:46:00"
                }
  
          ]
      
          const output = new Map().set("7",103.47).set("9",501);
          
          const disboursment = await getDisboursments(input, "01/02/2018", "01/08/2018");
          assert.equal(disboursment.get("7"), output.get("7"));
          assert.equal(disboursment.get("9"), output.get("9"));
      
        });
      });