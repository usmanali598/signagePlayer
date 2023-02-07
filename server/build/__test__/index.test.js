"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
describe("Testing playlist route", () => {
    test("Fashion route should response the GET method", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get("/playlist");
        expect(response.statusCode).toBe(200);
    });
});
