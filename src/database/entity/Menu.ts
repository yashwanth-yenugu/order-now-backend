import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity({
    name: 'Menu',
})
export class Menu extends BaseEntity {
    @PrimaryGeneratedColumn()
    MenuId: number;
    @Column()
    CategoryId: number;
    @Column()
    RestaurantId: number;
    @Column()
    Name: string;
    @Column()
    ImageUrl: string;
    @Column()
    OrderedCount:string;
    @Column()
    Rating: string;
    @Column()
    PreparationTime: number;
    @Column()
    Amount: string;
}