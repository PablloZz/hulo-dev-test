import { vimeoApi } from "../../packages/vimeo/vimeo.js";
import { createElement } from "../../libs/helpers/helpers.js";
import { SLIDES_COUNT } from "./libs/constants/constants.js";

const slider = document.querySelector(".slider") as HTMLDivElement;

async function initSlidePreview(slideNumber: number) {
  const slideId = `slide-${slideNumber}`;
  const slide = createElement<HTMLDivElement>("div", ["slide"], {
    id: slideId,
  });

  try {
    const video = await vimeoApi.getVideo();
    const { videoAuthor, videoPreviewSource, videoTitle } = video;
    const videoPreview = createElement<HTMLImageElement>("img", [], {
      src: videoPreviewSource,
      alt: `${videoTitle} video preview by ${videoAuthor}`,
    });
    slide.appendChild(videoPreview);
  } catch (error) {
    console.error(error);
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
}

export { initSlider };
