import { type VideoInfo } from "./libs/types/types.js";

class VimeoApi {
  private path: string;

  public constructor(path: string) {
    this.path = path;
  }

  public async getVideo() {
    try {
      const response = await fetch(`${this.path}824804225.json`);
      const data = await response.json();
      const [
        {
          id: videoId,
          thumbnail_medium: videoPreviewSource,
          title: videoTitle,
          user_name: videoAuthor,
        },
      ] = data;

      return {
        videoId,
        videoPreviewSource,
        videoTitle,
        videoAuthor,
      } as VideoInfo;
    } catch (error) {
      console.error(error);
    }
  }
}

export { VimeoApi };
