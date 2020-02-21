import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity({
    name: 'Orders',
})
export class Orders extends BaseEntity {
    @PrimaryGeneratedColumn({type:'uuid'})
    OrderId: number;
    @Column()
    UserId: number;
    @Column()
    RestaurantId: number;
    @Column()
    TableId: number;
    @Column()
    MenuId: string;
    @Column()
    Amount:string;
    @Column()
    OrderDateTime: string;
}