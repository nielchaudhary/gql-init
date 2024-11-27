"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const app = (0, express_1.default)();
const schemaString = fs_1.default.readFileSync(path.resolve(__dirname, "./schema.gql"), "utf-8");
const schema = (0, graphql_1.buildSchema)(schemaString);
console.log(schema);
const authMiddleware = (req, res, next) => {
    req.authHeader = req.headers.authorization;
    next();
};
const root = {
    getUser: ({ id }, req) => {
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
    createUser: ({ input }, req) => {
        return Object.assign({ id: "2" }, input);
    },
};
app.use("/graphql", authMiddleware, (0, express_graphql_1.graphqlHTTP)({
    schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(8090, () => {
    console.log("yo");
});
