import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
    name: 'Restaurants',
})
export class Restaurants extends BaseEntity {
    @PrimaryGeneratedColumn()
    RestaurantId: number;

    @Column()
    Name: string;
    @Column()
    Place: string;
    @Column()
    ImageUrl:string;
    @Column()
    Description:string;
    @Column()
    Rating:string;
}