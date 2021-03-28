import Index from "@/pages/index.vue";
import { render } from "@testing-library/vue";


describe("index page", () => {
  test("mounts", async () => {
    const { getByText } = render(Index, { stubs: {
        'Logo': true
    }});

    getByText("symbol.directory");
  });
});
