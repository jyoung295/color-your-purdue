import Twit from 'twit'
import twitConfig from '../twitter-config'

export const tweet = ({ media, name }) => {
  const tweeter = new Twit(twitConfig)

  tweeter.post('media/upload', { media_data: media }, (err, data, response) => {
    if (err) console.log('Media upload Error: ', err)
    const mediaIdStr = data.media_id_string
    const altText = 'Color swatch from the daily Picture Your Purdue photo from the Purdue University homepage!'
    const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

    tweeter.post('media/metadata/create', meta_params, function(err, data, response) {
      if (!err) {
        const params = {
          status: `Here's today's swatch based on the Purdue University Homepage. Photo originally submitted by: ${name}`,
          media_ids: [mediaIdStr]
        }

        tweeter.post('statuses/update', params, function(err, data, response) {
          if (err) console.log('Tweet send error: ', err)
        })
      }
    })
  })
}
