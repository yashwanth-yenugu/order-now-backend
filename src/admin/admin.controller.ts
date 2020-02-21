import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { Restaurants } from './../database/entity/Restaurants';
import { Orders } from './../database/entity/Orders';
import { Tables } from './../database/entity/Tables';
import { Menu } from './../database/entity/Menu';
import { createQueryBuilder, Table } from 'typeorm';
import {
  ApiImplicitBody,
  ApiImplicitParam,
  ApiImplicitQuery,
} from '@nestjs/swagger';
import { Users } from './../database/entity/Users';
import Axios from 'axios';

@Controller('admin')
export class AdminController {
  starters: any = [];
  maincourse: any = [];
  beverages: any = [];
  others: any = [];
  @Get()
  getAll() {
    return Restaurants.find();
  }
  @Get('order/:orderId')
  @ApiImplicitParam({ name: 'orderId', description: 'number', required: true })
  async getOrders(@Param() orderId) {
    const order = await Orders.findOne({ UserId: orderId.orderId });
    const restaurant = await Restaurants.findOne({
      RestaurantId: order.RestaurantId,
    });
    const table = await Tables.findOne({ TableId: order.TableId });
    const menu = await createQueryBuilder()
      .select()
      .from(Menu, 'M')
      .where('MenuId In (:...id)', { id: JSON.parse(order.MenuId) })
      .execute();
    return { order, restaurant, table, menu };
  }
  @Post('booking')
  @ApiImplicitBody({ name: 'bookingInput', type: Orders })
  async booktable(@Body() bookingInput) {
    bookingInput.MenuId =
      bookingInput.MenuId.length > 0 ? bookingInput.MenuId : null;
    return await Orders.save(bookingInput);
  }

  @Get('menu')
  async getMenu() {
    return await Menu.find();
  }
  @Get('tables')
  async getTables() {
    return await Tables.find();
  }
  @Post('menu')
  @ApiImplicitBody({ name: 'menuInput', type: Menu })
  async createMenu(@Body() menuInput) {
    return await Menu.save(menuInput);
  }

  @Post('tables')
  @ApiImplicitBody({ name: 'tableInput', type: Tables })
  async createTable(@Body() tableInput) {
    return await Tables.save(tableInput);
  }
  @Delete('menu/:id')
  @ApiImplicitParam({ name: 'id', description: 'number', required: true })
  async deleteMenu(@Param() menuId) {
    return await Menu.delete(menuId.id);
  }
  @Delete('tables/:id')
  @ApiImplicitParam({ name: 'id', description: 'number', required: true })
  async deleteTable(@Param() tableId) {
    return await Tables.delete(tableId.id);
  }
  @Get('getTablesByResId')
  @ApiImplicitQuery({
    name: 'restaurantId',
    description: 'number',
    required: true,
  })
  async getRestaurant(@Query() restaurantId) {
    return await Tables.find({ RestaurantId: restaurantId });
  }
  @Get('getMenu')
  @ApiImplicitQuery({
    name: 'restaurantId',
    description: 'number',
    required: true,
  })
  async getMenubyRestaurant(@Query() restaurantId) {
    const items = await Menu.find({ RestaurantId: restaurantId });
    return items.reduce((r, a) => {
      r[a.CategoryId] = [...(r[a.CategoryId] || []), a];
      return r;
    }, {});
  }

  @Post('login')
  @ApiImplicitBody({ name: 'input', type: Users })
  async login(@Body() input) {
    try {
      const saveRes = await Users.save(input);
      const otpRes = await this.sendOTP({
        phoneNumber: '+91' + input.Mobile.slice(-10),
      });
      return { UserId: saveRes.UserId, ...otpRes };
    } catch (error) {
      return error;
    }
  }

  async sendOTP(input) {
    try {
      const axiosRes = await Axios.post(
        'https://o3ml8d8b59.execute-api.ap-south-1.amazonaws.com/dev/get-otp',
        input,
      );
      return axiosRes.data;
    } catch (error) {
      return error;
    }
  }
  @Get('orferByResId/:ResId')
  @ApiImplicitParam({ name: 'ResId', description: 'number', required: true })
  async getOrdersRes(@Param() ResId) {
    const order = await Orders.findOne({ RestaurantId: ResId.ResId });
    const menu = await createQueryBuilder()
      .select()
      .from(Menu, 'M')
      .where('MenuId In (:...id)', { id: JSON.parse(order.MenuId) })
      .execute();
    return { order, menu };
  }
  @Get('getRestaurants')
  async getRestaurants() {
    return [
      {
        name: 'Healthie',
        img:
          'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/ybhio4j6yvkqpvxd2qfa',
        variety:
          'Healthy Food, Keto, Thalis, Snacks, Salads, European, Italian, American, Mediterranean, Lebanese, Combo, Beverages, Juices, Desserts',
        rating: '3.5',
        time: '28 MINS',
        price: '350 For Two',
      },
      {
        name: 'Burger King',
        img:
          'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/k48r08to3ajzf87wuc2h',
        variety: 'American, Fast Food',
        rating: '4.5',
        time: '30 MINS',
        price: '300 For Two',
      },
      {
        name: 'Starbucks Coffee',
        img:
          'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/fr2uftw7ckt0yz8pzac8',
        variety: 'Beverages',
        rating: '3.0',
        time: '20 MINS',
        price: '250 For Two',
      },
      {
        name: 'McDonald\'s',
        img:
          'https://assets.change.org/photos/9/hx/al/QDHxALaPfWMZJqm-800x450-noPad.jpg?1530231560',
        variety: 'Fast Food',
        rating: '3.5',
        time: '30 MINS',
        price: '200 For Two',
      },
      {
        name: 'Barista',
        img:
          'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/bzmtkqrx0bveiqfovnk8',
        variety: 'Beverages, Cafe, Snacks',
        rating: '4.0',
        time: '45 MINS',
        price: '320 For Two',
      },
      {
        name: 'The Bake Factory',
        img:
          'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/bzmtkqrx0bveiqfovnk8',
        variety: 'Continental',
        rating: '3.5',
        time: '28 MINS',
        price: '310 For Two',
      },
      {
        name: 'Lunch Box',
        img:
          'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/mqpguy2mj4zzyhgacglt',
        variety: 'North Indian, Desserts, Biryani',
        rating: '4.5',
        time: '24 MINS',
        price: '280 For Two',
      },
      {
        name: 'Blue Fox',
        img:
          'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/vnaolrjc5fjjiorwto9r',
        variety: 'North Indian, Chinese, Biryani',
        rating: '3.7',
        time: '32 MINS',
        price: '300 For Two',
      },
    ];
  }
}
