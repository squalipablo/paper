Readme
Installing last version of Node.js from https://nodejs.org/en/download/

Download the project from GIT https://github.com/squalipablo/paper

Install the project
run
_npm i_

run the Json Server 
_json-server --watch ./assets/data/database.json -p 3200_

Json Server is reading and writing from /assets/data/database.js
the db contains the Orders.js file provided.

run the application
_npm start_

you should see Sequra test interview server running on port 3000!

the feature is responding at GET calculateDisboursments

needs two query parameters URL encoded, ex. for the 15th January 2018 insert 01%2F15%2F2018 which is the same of (01/15/2018)
(N.B. input validation is to be done)

params:

	-fromDate initial period from which calculate the amounts
  
	-toDate	 end of period
	
	

go to http://localhost:3000/calculateDisboursments?fromDate=01%2F01%2F2018&toDate=01%2F15%2F2018 if you want to get all the disboursments for all the merchants
in a range from 1st Jan 2018 to 15th Jan 2018, after it will persist them to the DB.

Nb. after it you should restart Json Server in order to make a new request, is a issue with this db.

to query for a specific merchant use URL param /merchantId

for asking the disboursment for the same period above but only for merchant id 7 thi is the URL

http://localhost:3000/calculateDisboursments/7?fromDate=01%2F01%2F2018&toDate=01%2F15%2F2018

run tests
_npm test_
