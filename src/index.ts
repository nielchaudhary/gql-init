import express from "express";

import { Request, Response, NextFunction } from "express";

import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import fs from "fs";
import * as path from "path";

const app = express();

const schemaString = fs.readFileSync(
  path.resolve(__dirname, "./schema.gql"),
  "utf-8"
);

const schema = buildSchema(schemaString);
console.log(schema);

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  (req as any).authHeader = req.headers.authorization;
  next();
};

const root = {
  getUser: ({ id }: { id: String }, req: Request) => {
    if (id === "1") {
      return {
        id: "1",
        email: "nc@gmail.com",
        firstname: "neel",
        lastname: "chaudhary",
      };
    }
    return null;
  },
  createUser: ({ input }: { input: any }, req: Request) => {
    return { id: "2", ...input };
  },
};

app.use(
  "/graphql",
  authMiddleware,
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(8090, () => {
  console.log("yo");
});
