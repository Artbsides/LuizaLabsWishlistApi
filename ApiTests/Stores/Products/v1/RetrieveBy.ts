import { HttpService } from "@nestjs/axios";
import { HttpStatus } from "@nestjs/common";
import { of } from "rxjs";
import { randomUUID } from "crypto";
import { App } from "ApiTests/App";
import { requests } from "ApiTests/Data/v1/Requests";
import { products } from "ApiTests/Data/v1/Products";
import { headers } from "ApiTests/Data/v1/Headers";

export const RetrieveByV1 = () => describe("RetrieveBy", () => {
  const app = new App;
  const id: string = randomUUID();

  const mockAxiosResponse = { ...requests.response,
    data: products.data[0]
  };

  let httpService: HttpService;

  beforeAll(async () => {
    const module = await app
      .create();

    httpService = module.get<HttpService>(HttpService);
  });

  describe("GET store/products/:id", () => {
    it("Should return not found", async () => {
      await app.server.inject({ method: "GET", url: `/store/products/${id}`}).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
        expect(response.payload).not.toBeNull();
      });

      await app.server.inject({ method: "GET", url: `/store/products/${id}`,
        headers: { ApiKey: headers.ApiKey }}).then(response => {
          expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
          expect(response.payload).not.toBeNull();
      });
    });

    it("Should return unauthorized", async () => {
      await app.server.inject({ method: "GET", url: `/store/products/${id}`,
        headers: { ApiVersion: headers.ApiVersion }}).then(response => {
          expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
          expect(response.payload).not.toBeNull();
      });
    });

    it("Should return bad request", async () => {
      await app.server.inject({ method: "GET", url: `/store/products/1`, headers }).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(response.payload).not.toBeNull();
      });
    });

    it("Should return ok", async () => {
      jest.spyOn(httpService, "get")
        .mockImplementationOnce(() => of(mockAxiosResponse));

      await app.server.inject({ method: "GET", url: `/store/products/${id}`, headers }).then(response => {
        expect(response.statusCode).toEqual(HttpStatus.OK);
        expect(response.payload).not.toBeNull();
      });
    });
  });

  afterAll(async () => await app.server.close());
});
