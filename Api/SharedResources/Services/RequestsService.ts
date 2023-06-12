import { HttpService } from "@nestjs/axios";
import { HttpStatus, Injectable } from "@nestjs/common";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosResponse, AxiosError } from "axios";
import { NotFoundException } from "Api/Exceptions/Throws/NotFoundException";

@Injectable()
export class RequestsService {
  constructor(
    private readonly httpService: HttpService
  ) {}

  async get<T>(uri: string): Promise<AxiosResponse<T>> {
    return await firstValueFrom(this.httpService.get(uri).pipe(
      catchError((error: AxiosError) => {
        if (error.response?.status == HttpStatus.NOT_FOUND)
          throw new NotFoundException();

        throw error;
      }))
    );
  }
}
