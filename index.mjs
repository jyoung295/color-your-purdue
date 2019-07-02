import { quantize } from './src/quantize.mjs'
import { createSwatch } from './src/createSwatch.mjs'
import fs from 'fs'

const run = async () => {
  const { swatch, photo } = await quantize()

  const swatchImage = createSwatch(swatch, photo)

  const tweetObj = { media: swatchImage }
  tweet(tweetObj)

  // ---- for testing -----
  // fs.writeFileSync('swatch.jpg', swatchImage)
  // console.log('done')
  // ----------------------
}

run()
