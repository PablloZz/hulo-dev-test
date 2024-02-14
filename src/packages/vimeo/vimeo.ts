import { VimeoApi } from "./vimeo-api.package.js";
import { VIMEO_VIDEO_ENDPOINT } from "./libs/constants/constants.js";

const vimeoApi = new VimeoApi(VIMEO_VIDEO_ENDPOINT);

export { vimeoApi };
