import { vimeoApi } from "~/packages/vimeo/vimeo.js";
import {
  convertNumberToPixelString,
  createElement,
} from "~/libs/helpers/helpers.js";
import {
  START_SLIDER_POSITION,
  SLIDES_COUNT,
} from "./libs/constants/constants.js";
import {
  clearDotsActiveState,
  getSlideWidth,
  sliderInfo,
} from "./libs/helpers/helpers.js";
import { visibleSlidesCount } from "./libs/enums/enums.js";

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
let endSliderPosition: number;
let currentPlayer: typeof Vimeo;

function getPreviousSlide() {
  const sliderPosition = sliderInfo.getPosition();
  const isStartPosition = sliderPosition === START_SLIDER_POSITION;
  let newSliderPosition: string;

  if (isStartPosition) {
    newSliderPosition = convertNumberToPixelString(-endSliderPosition);
    slider.style.setProperty("--slider-translate", newSliderPosition);
    return;
  }

  const sliderShift = sliderInfo.getShift();
  newSliderPosition = convertNumberToPixelString(sliderPosition + sliderShift);
  slider.style.setProperty("--slider-translate", newSliderPosition);
}

function getNextSlide() {
  const sliderPosition = sliderInfo.getPosition();
  const isEndPosition = Math.abs(sliderPosition) >= endSliderPosition;
  let newSliderPosition: string;

  if (isEndPosition) {
    newSliderPosition = convertNumberToPixelString(START_SLIDER_POSITION);
    slider.style.setProperty("--slider-translate", newSliderPosition);
    return;
  }

  const sliderShift = sliderInfo.getShift();
  newSliderPosition = convertNumberToPixelString(sliderPosition - sliderShift);
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

async function initSlidesPreview() {
  for (let index = 1; index <= SLIDES_COUNT; index++) {
    await initSlidePreview(index);
  }
}

function setSliderWidth() {
  const sliderOverlay = document.querySelector(
    ".slider-overlay"
  ) as HTMLDivElement;

  const windowWidth = window.innerWidth;
  const slidesToShowCount = sliderInfo.getVisibleSlidesCount(windowWidth);
  const hiddenSlidesCount = SLIDES_COUNT - slidesToShowCount;
  const slideWidth = getSlideWidth();
  const sliderGapWidth = sliderInfo.getGapWidth();
  endSliderPosition =
    hiddenSlidesCount * slideWidth + hiddenSlidesCount * sliderGapWidth;

  if (slidesToShowCount === visibleSlidesCount.ONE) {
    sliderOverlay.style.width = convertNumberToPixelString(slideWidth);
  } else {
    const sliderVisibleGapsCount = slidesToShowCount - 1;
    const sliderVisibleGapsWidth = sliderVisibleGapsCount * sliderGapWidth;
    const sliderWidth = slideWidth * slidesToShowCount + sliderVisibleGapsWidth;
    sliderOverlay.style.width = convertNumberToPixelString(sliderWidth);
  }
}

async function initSlider() {
  await initSlidesPreview();
  setSliderWidth();

  previousSlideButton.addEventListener("click", getPreviousSlide);
  nextSlideButton.addEventListener("click", getNextSlide);
  expandedSlide.parentElement.addEventListener("click", closeExpandedSlide);
  window.addEventListener("resize", () => {
    setSliderWidth();
    slider.style.setProperty(
      "--slider-translate",
      convertNumberToPixelString(START_SLIDER_POSITION)
    );
  });
}

export { initSlider };
