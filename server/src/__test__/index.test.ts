import app from '../app';
import request from 'supertest';

describe("Testing playlist route", () => {
    test("Fashion route should response the GET method", async () => {
        const response = await request(app).get("/playlist");
        expect(response.statusCode).toBe(200);
    });
});