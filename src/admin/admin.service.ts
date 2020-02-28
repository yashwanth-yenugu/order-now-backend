import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk";


@Injectable()
export class AdminService {
    constructor() {
        const awsConfig = {
            "region": "us-east-1",
            "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
            "accessKeyId": "AKIAWBVAHP7QIQSNWZOI",
            "secretAccessKey": "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"
        };
        AWS.config.update(awsConfig);
    }

  async  getRestaurants() {
      return new Promise((resolve,reject)=>{    
        const docClient = new AWS.DynamoDB.DocumentClient();
        const params = {
            TableName:"Restaurants",
            Select: "ALL_ATTRIBUTES"
        };
        docClient.scan(params, (err, data) => {
         console.log('err, data------------',err, data);
         if(!err){
         resolve(data.Items);
         }
         reject(err);
        })
    })
    }
}
