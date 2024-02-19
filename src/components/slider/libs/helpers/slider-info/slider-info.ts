import { SliderInfo } from "./slider-info.helper.js";

const slider = document.querySelector(".slider") as HTMLDivElement;
const sliderInfo = new SliderInfo(slider);

export { sliderInfo };
