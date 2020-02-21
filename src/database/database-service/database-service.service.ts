import { Injectable, OnModuleInit } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { exec } from 'child_process';
import { Restaurants } from '../entity/Restaurants';
import { Orders } from '../entity/Orders';
import { Tables } from '../entity/Tables';
import { Menu } from '../entity/Menu';
import { Users } from '../entity/Users';
// import { CacheService } from 'src/cache-service/cache-service.service';
@Injectable()
export class DatabaseServiceService implements OnModuleInit {
    constructor(){
    }
    async onModuleInit() {
    //     await createConnection({
    //         type: 'mysql',
    //         host: 'shvy-food.c1ybx38vsid7.ap-south-1.rds.amazonaws.com',
    //         port: 3306,
    //         username: 'admin',
    //         password: 'ReachHigh123',
    //         database: 'devdb',
    //         synchronize: false,
    //         logging: false,
    //         entities: [
    //             Restaurants,Orders,Tables,Menu,Users
    //         ],
    // }).then(connectionEstablished => {
    //     console.log('database connected')
    //     }).catch(async connectionError => {
    //             console.log('Error while connection to DB',connectionError)
    //     });
    }
}
