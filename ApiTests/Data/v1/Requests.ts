import { faker } from "@faker-js/faker";
import { HttpStatus } from "@nestjs/common";
import { AxiosResponse, AxiosError, AxiosHeaders } from "axios";

export const requests: Record<string, AxiosResponse> = {
  response: {
    data: null,
    status: HttpStatus.OK,
    statusText: HttpStatus[HttpStatus.OK],
    config: {
      url: "",
      headers: new AxiosHeaders()
    },
    headers: {}
  }
};

export const error = new AxiosError(faker.lorem.text(), AxiosError.ERR_BAD_REQUEST,
  requests.response.config, requests.response);
