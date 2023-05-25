import "reflect-metadata";
import db from "./db";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import { CountryResolver } from "./resolver/CountryResolver";

export interface ContextType {
    req: any;
    res: any;
}

async function start(): Promise<void> {
    await db.initialize();
    const app = express();
    const httpServer = http.createServer(app);

    const schema = await buildSchema({
        resolvers: [CountryResolver],
    });

    const server = new ApolloServer<ContextType>({
        schema,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    app.use(
        ["/", "/graphql"],
        express.json(),
        expressMiddleware(server, {
            context: async ({ req, res }) => ({ req, res }),
        })
    );

    const port = 4000;
    httpServer.listen({ port }, () =>
        console.log(`🚀 Hello the server is ready at http://localhost:${port}`)
    );
}

start().catch(console.error);