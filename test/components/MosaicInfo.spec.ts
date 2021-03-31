import { render, fireEvent } from "@testing-library/vue";
import MosaicInfo from "@/components/Submit/MosaicInfo.vue";

describe("MosaicInfo", () => {
    test("emits on data change", async () => {
      const { getByText, getByTestId, emitted } = render(MosaicInfo);
  
      getByText("Mosaic Information");
  
      const mosaicToggle = getByTestId("mosaic");
      await fireEvent.click(mosaicToggle);
    
      const mosaicInput = getByTestId("mosaic-id");
  
      await fireEvent.update(mosaicInput, "2CF403E85507F39E");
  
      expect(emitted().mosaicInfo).toBeTruthy();
      expect(emitted().mosaicInfo[0][0]).toStrictEqual({
        mosaic: true,
        mosaicId: '2CF403E85507F39E'
      });
    });
  });
  