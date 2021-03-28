const AWS = require('aws-sdk');
import axios from "axios";

const DocumentClient = new AWS.DynamoDB.DocumentClient();

async function getCurrent(zipcode: String) {
    try{
        // code to get current weather, and store in DynamoDB
            // get weather using zipcode
            let result: any;
        

            const getweather = await axios.get(`https://api.weatherapi.com/v1/current.json?key=03c6f672b8c64399851185215212703&q=${zipcode}&aqi=no`)
            .then(function (response) {
            console.log("weather", response.data);
            result = response.data
     

        });

//  removed year******************************03c6f672b8c64399851185215212703https://api.weatherapi.com/v1/current.json?key=03c6f672b8c64399851185215212703&q=20001&aqi=no
if(result && result.current.temp_c != undefined ){
    let today: any = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
// params object for Dynamo1DB
const params = {
TableName: process.env.dynamoDBTable,
Key: {
   id: `${zipcode}` // zipcode as unique id
},
ExpressionAttributeNames: { "#city": `${today.toString()}` },
ExpressionAttributeValues: { ":city": `${result.current.temp_c }` },
UpdateExpression: "set #city = :city",
ReturnValues: "UPDATED_NEW"
};
// add to dynamoDB
const todos = await DocumentClient.update(params).promise();
// return the weather
return `${result.current.temp_c}°C`;
}else if(result.current.temp_c == undefined){
    return `Weather not availabe for ${zipcode} (${result.location.name})`
}

return JSON.stringify(getweather);
}
        catch (e) {
            console.log("ERROR", e);
            return `${e.response.data.error.message}`;
        }
}

export default getCurrent;

//  Sir Adils API key: ceb639c0aa8d427b90c203617212703