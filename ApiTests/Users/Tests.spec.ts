import { CreateV1 } from "./Accounts/v1/Create";
import { DeleteByV1 } from "./Accounts/v1/DeleteBy";
import { RetrieveByV1 } from "./Accounts/v1/RetrieveBy";
import { UpdateByV1 } from "./Accounts/v1/UpdateBy";
import { AuthenticateV1 } from "./Authentications/v1/Authenticate";
import { WishlistCreateV1 } from "./Wishlists/v1/Create";
import { WishlistDeleteV1 } from "./Wishlists/v1/DeleteBy";
import { WishlistRetrieveV1 } from "./Wishlists/v1/Retrieve";

describe("Users", () => {
  describe("Accounts", () => {
    describe("v1", () => {
      CreateV1();
      RetrieveByV1();
      UpdateByV1();
      DeleteByV1();
    });
  });
  describe("Authentications", () => {
    describe("v1", () => {
      AuthenticateV1();
    });
  });
  describe("Wishlists", () => {
    describe("v1", () => {
      WishlistCreateV1();
      WishlistRetrieveV1();
      WishlistDeleteV1();
    });
  });
});
