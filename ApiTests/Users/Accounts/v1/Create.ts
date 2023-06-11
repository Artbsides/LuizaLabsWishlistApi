import { HttpStatus } from "@nestjs/common";
import { App } from "ApiTests/App";
import { payload } from "ApiTests/Data/v1/Data";
import { headers } from "ApiTests/Data/v1/Headers";

export const CreateV1 = () => describe("Create", () => {
  let app = new App;

  beforeAll(async () => await
    app.create());

  describe("POST users/account", () => {
    it("Should return not found", async () => {
      await app.server.inject({ method: "POST", url: "/users/account"}).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
        expect(response.payload).not.toBeNull();
      });

      await app.server.inject({ method: "POST", url: "/users/account", headers: { ApiKey: headers.ApiKey }}).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
        expect(response.payload).not.toBeNull();
      });
    });

    it("Should return unauthorized", async () => {
      await app.server.inject({ method: "POST", url: "/users/account", headers: { ApiVersion: headers.ApiVersion }}).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
        expect(response.payload).not.toBeNull();
      });
    });

    it("Should return bad request", async () => {
      await app.server.inject({ method: "POST", url: "/users/account", headers }).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(response.payload).not.toBeNull();
      });

      await app.server.inject({ method: "POST", url: "/users/account", headers, payload: { ...payload, email: null }}).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(response.payload).not.toBeNull();
      });

      await app.server.inject({ method: "POST", url: "/users/account", headers, payload: { ...payload, email: "email" } }).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(response.payload).not.toBeNull();
      });
    });

    it("Should return created", async () => {
      await app.server.inject({ method: "POST", url: "/users/account", headers, payload }).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.CREATED);
        expect(response.payload).not.toBeNull();
        expect(response.headers["access-token"]).not.toBeNull();
      });
    });

    it("Should return conflict", async () => {
      await app.server.inject({ method: "POST", url: "/users/account", headers, payload }).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.CONFLICT);
        expect(response.payload).not.toBeNull();
      });
    });
  });

  afterAll(async () => await app.server.close());
});
