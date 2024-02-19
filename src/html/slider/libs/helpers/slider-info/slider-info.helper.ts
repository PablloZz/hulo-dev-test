import { getPropertyValue } from "~/libs/helpers/helpers.js";

class SliderInfo {
  slider: HTMLDivElement;

  public constructor(slider: HTMLDivElement) {
    this.slider = slider;
  }

  getGapWidth() {
    const sliderGapWidth = getPropertyValue<HTMLElement>(
      this.slider,
      "--slider-gap-width"
    );
    return Number.parseInt(sliderGapWidth);
  }
}

export { SliderInfo };
