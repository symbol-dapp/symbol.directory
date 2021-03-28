import { render, fireEvent } from "@testing-library/vue";
import SocialMedia from "@/components/Submit/SocialMedia.vue";

describe("SocialMedia", () => {
  test("emits on data change", async () => {
    const { getByText, getByTestId, emitted } = render(SocialMedia);

    getByText("Social Media");

    const gitHubInput = getByTestId("github");
    const twitterInput = getByTestId("twitter");
    const facebookInput = getByTestId("facebook");
    const redditInput = getByTestId("reddit");
    const telegramInput = getByTestId("telegram");

    await fireEvent.update(
      gitHubInput,
      "https://github.com/aleixmorgadas/symbol.directory"
    );
    await fireEvent.update(twitterInput, "https://twitter.com/nemtech");
    await fireEvent.update(facebookInput, "https://www.facebook.com/ourNEM/");
    await fireEvent.update(redditInput, "https://www.reddit.com/r/nem/");
    await fireEvent.update(telegramInput, "https://t.me/symbolfromnem");

    expect(emitted().socialMedia).toBeTruthy();
    expect(emitted().socialMedia[0][0]).toStrictEqual({
      github: "https://github.com/aleixmorgadas/symbol.directory",
      reddit: "https://www.reddit.com/r/nem/",
      telegram: "https://t.me/symbolfromnem",
      facebook: "https://www.facebook.com/ourNEM/",
      twitter: "https://twitter.com/nemtech"
    });
  });
});
