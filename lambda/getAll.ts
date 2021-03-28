const AWS = require('aws-sdk');

const DocumentClient = new AWS.DynamoDB.DocumentClient();

async function getAll( zipcode: any ) {
    // code
    try {

        const params = {
            TableName: process.env.dynamoDBTable,
            Key: {
                id: zipcode
            }
        };
        const todos = await DocumentClient.get(params).promise();
        // format the return type to be an object as per schema
        console.log(todos)
        if(todos.Item){
                let result = [];
        for (const [key, value] of Object.entries(todos.Item)) {
            const data = {
                "date": key,
                "temp": value
            };
            result.push(data);
        }
        //  filter out the id (key, value)
        const res = result.filter((obj) => { return obj.date != 'id'; });
        return res;
        }else{
            return [{
                "date": "n/a",
                "temp": "n/a"
            }]
        }
     
    
    }
    catch (err) {
        console.log("ERRROR", err);
        return err;
    }
}

export default getAll;