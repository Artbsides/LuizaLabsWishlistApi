import { HttpStatus } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { of } from "rxjs";
import { App } from "ApiTests/App";
import { requests } from "ApiTests/Data/v1/Requests";
import { products } from "ApiTests/Data/v1/Products";
import { headers } from "ApiTests/Data/v1/Headers";

export const WishlistRetrieveV1 = () => describe("Retrieve", () => {
  let app = new App;
  let token: string;
  let httpService: HttpService;

  const mockAxiosResponse = { ...requests.response,
    data: products.data[0]
  };

  const payload = {
    name: "Name",
    email: "email@email.com"
  };

  beforeAll(async () => {
    const module = await app
      .create();

    httpService = module.get<HttpService>(HttpService);

    await app.server.inject({ method: "POST", url: "/users/account", headers, payload }).then(response =>
      token = `Bearer ${response.headers["access-token"]}`);

    jest.spyOn(httpService, "get")
      .mockImplementationOnce(() => of(mockAxiosResponse));

    await app.server.inject({method: "POST", url: "/users/wishlist", headers: { ...headers, authorization: token }, payload: { id: mockAxiosResponse.data.id } });
  });

  describe("GET users/wishlist?page=:page", () => {
    it("Should return not found", async () => {
      await app.server.inject({ method: "GET", url: "/users/wishlist"}).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
        expect(response.payload).not.toBeNull();
      });

      await app.server.inject({ method: "GET", url: "/users/wishlist", headers: { ApiKey: headers.ApiKey }}).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
        expect(response.payload).not.toBeNull();
      });
    });

    it("Should return unauthorized", async () => {
      await app.server.inject({ method: "GET", url: "/users/wishlist", headers: { ApiVersion: headers.ApiVersion }}).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
        expect(response.payload).not.toBeNull();
      });
    });

    it("Should return forbidden", async () => {
      await app.server.inject({ method: "GET", url: "/users/wishlist", headers }).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.FORBIDDEN);
        expect(response.payload).not.toBeNull();
      });
    });

    it("Should return ok", async () => {
      headers.authorization = token;

      await app.server.inject({ method: "GET", url: "/users/wishlist", headers }).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.OK);
        expect(response.payload).not.toBeNull();
      });

      await app.server.inject({ method: "GET", url: "/users/wishlist", headers, query: { page: "1" } }).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.OK);
        expect(response.payload).not.toBeNull();
      });
    });
  });

  afterAll(async () => {
    headers.authorization = null;

    await app.server
      .close();
  });
});
