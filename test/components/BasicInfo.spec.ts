import { render, fireEvent } from "@testing-library/vue";
import BasicInfo from "@/components/Submit/BasicInfo.vue";

describe("BasicInfo", () => {
  test("emits on data change", async () => {
    const { getByText, getByTestId, emitted } = render(BasicInfo);

    getByText("Basic Information");
  });
});
