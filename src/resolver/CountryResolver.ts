import {Query, Resolver} from "type-graphql";
import Country from "../entity/Country";
import datasource from "../db";

@Resolver(Country)
export class CountryResolver {
    @Query(() => [Country])
    async countries(): Promise<Country[]> {
        return await datasource
            .getRepository(Country)
            .find()
    }
}
