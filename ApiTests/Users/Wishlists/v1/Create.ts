import { HttpStatus } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { of, throwError } from "rxjs";
import { App } from "ApiTests/App";
import { requests } from "ApiTests/Data/v1/Requests";
import { products } from "ApiTests/Data/v1/Products";
import { headers } from "ApiTests/Data/v1/Headers";

export const WishlistCreateV1 = () => describe("Create", () => {
  let app = new App;
  let token: string;
  let httpService: HttpService;

  const mockAxiosResponse = { ...requests.response,
    data: products.data[0]
  };

  const payload: any = {
    name: "Name",
    email: "email@email.com"
  };

  beforeAll(async () => {
    const module = await app
      .create();

    httpService = module.get<HttpService>(HttpService);

    await app.server.inject({ method: "POST", url: "/users/account", headers, payload }).then(response =>
      token = `Bearer ${response.headers["access-token"]}`);
  });

  describe("POST users/wishlist", () => {
    it("Should return not found", async () => {
      await app.server.inject({ method: "POST", url: "/users/wishlist"}).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
        expect(response.payload).not.toBeNull();
      });

      await app.server.inject({ method: "POST", url: "/users/wishlist", headers: { ApiKey: headers.ApiKey }}).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
        expect(response.payload).not.toBeNull();
      });
    });

    it("Should return unauthorized", async () => {
      await app.server.inject({ method: "POST", url: "/users/wishlist", headers: { ApiVersion: headers.ApiVersion }}).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
        expect(response.payload).not.toBeNull();
      });
    });

    it("Should return forbidden", async () => {
      await app.server.inject({ method: "POST", url: "/users/wishlist", headers }).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.FORBIDDEN);
        expect(response.payload).not.toBeNull();
      });
    });

    it("Should return not found", async () => {
      headers.authorization = token;

      jest.spyOn(httpService, "get")
        .mockImplementationOnce(() => throwError(() => { return { ...requests.error, response: { status: HttpStatus.NOT_FOUND } }}));

      const payload: any = {
        id: mockAxiosResponse.data.id
      };

      await app.server.inject({ method: "POST", url: "/users/wishlist", headers, payload }).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
        expect(response.payload).not.toBeNull();
      });
    });

    it("Should return bad request", async () => {
      await app.server.inject({ method: "POST", url: "/users/wishlist", headers, payload }).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(response.payload).not.toBeNull();
      });
    });

    it("Should return created", async () => {
      jest.spyOn(httpService, "get")
        .mockImplementationOnce(() => of(mockAxiosResponse));

      const payload: any = {
        id: mockAxiosResponse.data.id
      };

      await app.server.inject({ method: "POST", url: "/users/wishlist", headers, payload }).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.CREATED);
        expect(response.payload).not.toBeNull();
      });
    });

    it("Should return conflit", async () => {
      const payload: any = {
        id: mockAxiosResponse.data.id
      };

      await app.server.inject({ method: "POST", url: "/users/wishlist", headers, payload }).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.CONFLICT);
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
