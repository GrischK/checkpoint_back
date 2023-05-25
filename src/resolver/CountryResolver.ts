import {Arg, Mutation, Query, Resolver} from "type-graphql";
import Country, {CountryInput} from "../entity/Country";
import datasource from "../db";

@Resolver(Country)
export class CountryResolver {
    @Query(() => [Country])
    async countries(): Promise<Country[]> {
        return await datasource
            .getRepository(Country)
            .find()
    }

    @Query(() => Country)
    async country(@Arg("code") code: string): Promise<Country> {
        const country = await datasource.getRepository(Country).findOne({where: {code}})
        if (country === null) throw new Error("Country not found");
        return country;
    }

    @Mutation(() => Country)
    async createCountry(@Arg("data") data: CountryInput): Promise<Country> {
        return await datasource.getRepository(Country).save(data)
    }
}
