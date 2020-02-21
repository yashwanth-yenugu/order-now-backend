import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
    name: 'Users',
})
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    UserId: number;

    @Column()
    Name: string;
    @Column()
    Location: string;
    @Column()
    Mobile:number;
    @Column()
    Type:number;
}