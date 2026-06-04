import { useEffect, useRef } from 'react'

function AudioPlayer({
  audioBase64,
  onEnded,
  autoPlay = true,
}) {
  const audioRef = useRef(null)

  useEffect(() => {
    if (!audioBase64) return

    try {
      const byteCharacters =
        atob(audioBase64)

      const byteNumbers = new Array(
        byteCharacters.length
      )

      for (
        let i = 0;
        i < byteCharacters.length;
        i++
      ) {
        byteNumbers[i] =
          byteCharacters.charCodeAt(i)
      }

      const byteArray =
        new Uint8Array(byteNumbers)

      const audioBlob = new Blob(
        [byteArray],
        {
          type: 'audio/mpeg',
        }
      )

      const audioUrl =
        URL.createObjectURL(audioBlob)

      if (audioRef.current) {
        audioRef.current.src = audioUrl

        if (autoPlay) {
          audioRef.current.play().catch(
            console.error
          )
        }
      }

      return () => {
        URL.revokeObjectURL(audioUrl)
      }
    } catch (error) {
      console.error(
        'Audio playback error:',
        error
      )
    }
  }, [audioBase64, autoPlay])

  if (!audioBase64) {
    return null
  }

  return (
    <audio
      ref={audioRef}
      onEnded={onEnded}
      hidden
    />
  )
}

export default AudioPlayer