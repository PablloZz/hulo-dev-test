import { vimeoApi } from "../../packages/vimeo/vimeo.js";
import { createElement } from "../../libs/helpers/helpers.js";
import {
  START_SLIDER_POSITION,
  SLIDE_WIDTH,
  END_SLIDER_POSITION,
  SLIDES_COUNT,
} from "./libs/constants/constants.js";
import {
  clearDotsActiveState,
  getSliderPosition,
} from "./libs/helpers/helpers.js";

const slider = document.querySelector(".slider") as HTMLDivElement;
const nextSlideButton = document.querySelector(
  ".next-slide"
) as HTMLButtonElement;
const previousSlideButton = document.querySelector(
  ".previous-slide"
) as HTMLButtonElement;
const expandedSlide = document.querySelector(
  ".expanded-slide"
) as HTMLDivElement;
const dots = document.querySelector(".dots") as HTMLDivElement;
let currentPlayer: typeof Vimeo;

function getPreviousSlide() {
  const sliderPosition = getSliderPosition(slider);
  const isStartPosition = sliderPosition === START_SLIDER_POSITION;
  let newSliderPosition: string;

  if (isStartPosition) {
    newSliderPosition = `${END_SLIDER_POSITION}px`;
    slider.style.setProperty("--slider-translate", newSliderPosition);
    return;
  }

  newSliderPosition = `${sliderPosition + SLIDE_WIDTH}px`;
  slider.style.setProperty("--slider-translate", newSliderPosition);
}

function getNextSlide() {
  const sliderPosition = getSliderPosition(slider);
  const isEndPosition = sliderPosition <= END_SLIDER_POSITION;
  let newSliderPosition: string;

  if (isEndPosition) {
    newSliderPosition = `${START_SLIDER_POSITION}px`;
    slider.style.setProperty("--slider-translate", newSliderPosition);
    return;
  }

  newSliderPosition = `${sliderPosition - SLIDE_WIDTH}px`;
  slider.style.setProperty("--slider-translate", newSliderPosition);
}

function closeExpandedSlide(event: MouseEvent) {
  if (event.target === this) {
    expandedSlide.parentElement.classList.toggle("hide");
    clearDotsActiveState(dots);
    currentPlayer.destroy();
  }
}

async function initSlidePreview(slideNumber: number) {
  const slideId = `slide-${slideNumber}`;
  const slide = createElement<HTMLDivElement>("div", ["slide"], {
    id: slideId,
  });

  try {
    const video = await vimeoApi.getVideo();
    const { videoAuthor, videoId, videoPreviewSource, videoTitle } = video;
    const videoPreview = createElement<HTMLImageElement>("img", [], {
      src: videoPreviewSource,
      alt: `${videoTitle} video preview by ${videoAuthor}`,
    });
    slide.appendChild(videoPreview);

    const dot = createElement<HTMLButtonElement>("button", ["dot"]);
    dots.appendChild(dot);

    slide.addEventListener("click", () => {
      openVideo(videoId);
      dot.classList.add("active");
      expandedSlide.parentElement.classList.toggle("hide");
    });
    dot.addEventListener("click", () => {
      currentPlayer.destroy();
      clearDotsActiveState(dots);
      dot.classList.add("active");
      openVideo(videoId);
    });
  } catch (error) {
    console.error(error);
  }

  function openVideo(id: number) {
    const vimeoOptions = { id, autoplay: true };
    const player = new Vimeo.Player(expandedSlide, vimeoOptions);
    currentPlayer = player;
  }

  slider.appendChild(slide);
}

function initSlidesPreview() {
  for (let index = 1; index <= SLIDES_COUNT; index++) {
    initSlidePreview(index);
  }
}

function initSlider() {
  initSlidesPreview();
  previousSlideButton.addEventListener("click", getPreviousSlide);
  nextSlideButton.addEventListener("click", getNextSlide);
  expandedSlide.parentElement.addEventListener("click", closeExpandedSlide);
}

export { initSlider };
