import { RetrieveV1 } from "./Products/v1/Retrieve";
import { RetrieveByV1 } from "./Products/v1/RetrieveBy";

describe("Stores", () => {
  describe("Products", () => {
    describe("v1", () => {
      RetrieveV1();
      RetrieveByV1();
    });
  });
});
