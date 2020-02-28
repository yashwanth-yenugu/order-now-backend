import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity({
    name: 'Tables',
})
export class Tables extends BaseEntity {
    @PrimaryGeneratedColumn()
    TableId: number;
    @Column()
    TableNo: number;
    @Column()
    RestaurantId: number;
    @Column()
    Size: number;
    @Column()
    Status: string;
    @Column()
    Time:string;

}