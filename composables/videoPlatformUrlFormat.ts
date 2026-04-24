export function videoPlatformUrlFormat(url: string): {
  videoPlatform: "vimeo" | "youtube";
  src: string
} | null {

  const vimeoPlayerMatch = url.match(
    /player.vimeo\.com\/video\/([a-zA-Z0-9]+)/
  )
  const vimeoMatch = url.match(
    /vimeo\.com\/([a-zA-Z0-9]+)/
  )

  const youtubePageUrlMatch = url.match(
    /youtu\.be\/([a-zA-Z0-9]+)/
  )
  const youtubeSharedFormatURLMatch = url.match(
    /youtube\.com\/([a-zA-Z0-9]+)/
  )
  const youtubeEmbedFormatURLMatch = url.match(
    /youtube\.com\/embed\/([a-zA-Z0-9]+)/
  )

  if(vimeoPlayerMatch) {
    return {
      videoPlatform: "vimeo",
      src: url,
    }
  }
  else if(vimeoMatch) {
    return {
      videoPlatform: "vimeo",
      src: "https://player.vimeo.com/video/" + vimeoMatch[1],
    }
  }
  else if(youtubeEmbedFormatURLMatch) {
    return {
      videoPlatform: "youtube",
      src: url,
    }
  }
  else if(youtubePageUrlMatch) {
    return {
      videoPlatform: "youtube",
      src: "https://www.youtube.com/embed/" + youtubePageUrlMatch[1],
    }
  }
  else if(youtubeSharedFormatURLMatch) {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v');


    return {
      videoPlatform: "youtube",
      src: "https://www.youtube.com/embed/" + videoId,
    }
  }

  console.error('url invalid: ', url)

  return null
}
