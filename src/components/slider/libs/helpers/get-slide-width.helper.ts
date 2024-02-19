import { getPropertyValue } from "~/libs/helpers/helpers.js";

function getSlideWidth() {
  const slide = document.querySelector(".slide") as HTMLDivElement;
  return Number.parseInt(getPropertyValue<HTMLElement>(slide, "--slide-width"));
}

export { getSlideWidth };
