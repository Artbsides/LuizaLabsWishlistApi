import { HttpStatus } from "@nestjs/common";
import { App } from "ApiTests/App";
import { payload } from "ApiTests/Data/v1/Data";
import { headers } from "ApiTests/Data/v1/Headers";

export const RetrieveByV1 = () => describe("RetrieveBy", () => {
  const app = new App;
  let token: string;

  beforeAll(async () => {
    await app.create();

    await app.server.inject({ method: "POST", url: "/users/account", headers, payload }).then(response =>
      token = `Bearer ${response.headers["access-token"]}`);
  });

  describe("GET users/accounts", () => {
    it("Should return not found", async () => {
      await app.server.inject({ method: "GET", url: "/users/account"}).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
        expect(response.payload).not.toBeNull();
      });

      await app.server.inject({ method: "GET", url: "/users/account",
        headers: { ApiKey: headers.ApiKey }}).then(response => {
          expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
          expect(response.payload).not.toBeNull();
      });
    });

    it("Should return unauthorized", async () => {
      await app.server.inject({ method: "GET", url: "/users/account",
        headers: { ApiVersion: headers.ApiVersion }}).then(response => {
          expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
          expect(response.payload).not.toBeNull();
      });
    });

    it("Should return forbidden", async () => {
      await app.server.inject({ method: "GET", url: "/users/account", headers }).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.FORBIDDEN);
        expect(response.payload).not.toBeNull();
      });
    });

    it("Should return ok", async () => {
      headers.Authorization = token;

      await app.server.inject({ method: "GET", url: "/users/account", headers }).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.OK);
        expect(response.payload).not.toBeNull();
      });
    });
  });

  afterAll(async () => {
    headers.Authorization = null;

    await app.server
      .close();
  });
});
