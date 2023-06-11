import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export class Docs {
  private static apiKey: SecuritySchemeObject = {
    in: "Headers",
    name: "ApiKey",
    type: "apiKey",
    description: "Example: af03sa181asq12u2s78620gh57181881c15<br /><br />"
  };

  private static token: SecuritySchemeObject = {
    type: "http",
    scheme: "Bearer",
    bearerFormat: "JWT",
    description: "Example: Bearer " +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlM2FmN2VhNy1jZDBkLTQ0ZTktYTA1OC02ZDk1ZjYz" +
      "N2Q0NDIiLCJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbS5iciIsImlhdCI6MTY4NjE2OTA0NCwiZXhwIjoxNjg2MTcyN" +
      "jQ0fQ.OvyT25ot4GKehrFz9KxE4T0NRUuaKzCSyPZZoSL-vgM<br /><br />"
  };

  static useSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle("WishlistApi")
      .setDescription("LuizaLabs/Magalu products wishlist")
      .setVersion("0.0.1")
      .addApiKey(this.apiKey, "ApiKey")
      .addBearerAuth(this.token, "Authorization")
      .build();

    const document: OpenAPIObject =
      SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("docs", app, document);
  }
}
