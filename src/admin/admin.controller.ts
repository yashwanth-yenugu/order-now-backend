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
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}
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
    // const restaurants = require('./restaurants.json');
    return this.adminService.getRestaurants();
  }
}
