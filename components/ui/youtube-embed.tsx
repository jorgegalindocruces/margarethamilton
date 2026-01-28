interface YouTubeEmbedProps {
  url: string
  title?: string
}

function getYouTubeVideoId(url: string): string | null {
  // Handle youtu.be format
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/)
  if (shortMatch) return shortMatch[1]

  // Handle youtube.com format
  const longMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/)
  if (longMatch) return longMatch[1]

  // Handle youtube.com/embed format
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/)
  if (embedMatch) return embedMatch[1]

  return null
}

export function YouTubeEmbed({ url, title = 'Video de YouTube' }: YouTubeEmbedProps) {
  const videoId = getYouTubeVideoId(url)

  if (!videoId) {
    return null
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-lg" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  )
}
