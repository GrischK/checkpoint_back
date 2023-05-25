import {Field, InputType, ObjectType} from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {MaxLength, MinLength} from "class-validator";

@Entity()
@ObjectType()
class Country {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    code: string;

    @Field()
    @Column()
    emoji: string;
}

@InputType()
export class CountryInput {
    @Field()
    @MinLength(1)
    @MaxLength(100)
    name: string;

    @Field()
    @MinLength(1)
    @MaxLength(2)
    code: string;

    @Field()
    @MinLength(1)
    @MaxLength(10)
    emoji: string;
}

export default Country;