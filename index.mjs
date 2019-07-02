import { quantize } from './src/quantize.mjs'
import { createSwatch } from './src/createSwatch.mjs'
import { tweet } from './src/tweet.mjs'

const run = async () => {
  const { swatch, photo, name } = await quantize()

  const swatchImage = createSwatch(swatch, photo)

  const swatch64 = Buffer.from(swatchImage, 'binary').toString('base64')

  const tweetObj = { media: swatch64, name }
  tweet(tweetObj)
}

run()
