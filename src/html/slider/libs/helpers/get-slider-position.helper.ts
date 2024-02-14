function getSliderPosition(slider: HTMLDivElement) {
  const sliderTranslate = window
    .getComputedStyle(slider)
    .getPropertyValue("--slider-translate");

  return Number.parseInt(sliderTranslate);
}

export { getSliderPosition };
