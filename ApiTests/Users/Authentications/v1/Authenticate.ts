import { HttpStatus } from "@nestjs/common";
import { App } from "ApiTests/App";
import { payload } from "ApiTests/Data/v1/Data";
import { headers } from "ApiTests/Data/v1/Headers";

export const AuthenticateV1 = () => describe("Authenticate", () => {
  const app = new App;

  beforeAll(async () => {
    await app.create();

    await app.server
      .inject({method: "POST", url: "/users/account", headers, payload });
  });

  describe("POST users/authentication", () => {
    it("Should return not found", async () => {
      await app.server.inject({ method: "POST", url: "/users/authentication"}).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
        expect(response.payload).not.toBeNull();
      });

      await app.server.inject({ method: "POST", url: "/users/authentication",
        headers: { ApiKey: headers.ApiKey }}).then(response => {
          expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
          expect(response.payload).not.toBeNull();
      });
    });

    it("Should return unauthorized", async () => {
      await app.server.inject({ method: "POST", url: "/users/authentication",
        headers: { ApiVersion: headers.ApiVersion }}).then(response => {
          expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
          expect(response.payload).not.toBeNull();
      });
    });

    it("Should return forbidden", async () => {
      await app.server.inject({ method: "POST", url: "/users/authentication",
        headers, payload: { ...payload, email: "email@emailtwo.com" } }).then(response => {
          expect(response.statusCode).toEqual(HttpStatus.FORBIDDEN);
          expect(response.payload).not.toBeNull();
      });
    });

    it("Should return created", async () => {
      await app.server.inject({ method: "POST", url: "/users/authentication",
        headers, payload: { email: payload.email }}).then(response => {
          expect(response.statusCode).toEqual(HttpStatus.CREATED);
          expect(response.payload).not.toBeNull();
          expect(response.headers["access-token"]).not.toBeNull();
      });
    });
  });

  afterAll(async () => await app.server.close());
});
