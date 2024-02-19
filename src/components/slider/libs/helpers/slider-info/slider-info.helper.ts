import { getPropertyValue } from "~/libs/helpers/helpers.js";
import { getSlideWidth } from "../get-slide-width.helper.js";
import { windowBreakpoint } from "~/libs/enums/enums.js";
import { visibleSlidesCount } from "../../enums/enums.js";

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

  getShift() {
    const slideWidth = getSlideWidth();
    const sliderGapWidth = this.getGapWidth();
    return slideWidth + sliderGapWidth;
  }

  getPosition() {
    const sliderTranslate = getPropertyValue<HTMLDivElement>(
      this.slider,
      "--slider-translate"
    );

    return Number.parseInt(sliderTranslate);
  }

  getVisibleSlidesCount(windowWidth: number) {
    switch (true) {
      case windowWidth >= windowBreakpoint.EXTRA_LARGE: {
        return visibleSlidesCount.FOUR;
      }
      case windowWidth < windowBreakpoint.EXTRA_LARGE &&
        windowWidth >= windowBreakpoint.LARGE: {
        return visibleSlidesCount.THREE;
      }
      case windowWidth < windowBreakpoint.EXTRA_LARGE &&
        windowWidth >= windowBreakpoint.SMALL: {
        return visibleSlidesCount.TWO;
      }
      case windowWidth < windowBreakpoint.SMALL: {
        return visibleSlidesCount.ONE;
      }
    }
  }
}

export { SliderInfo };
