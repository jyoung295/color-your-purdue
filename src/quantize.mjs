import Canvas from 'canvas'
import firebase from 'firebase'
import 'firebase/firestore'
import fireConfig from '../firebase-config'

const getDocNameDate = () => {
  const today = new Date()
  const monthNames = {
    0: 'jan',
    1: 'feb',
    2: 'mar',
    3: 'apr',
    4: 'may',
    5: 'jun',
    6: 'jul',
    7: 'aug',
    8: 'sep',
    9: 'oct',
    10: 'nov',
    11: 'dec'
  }

  const date = today.getDate()
  const currMonth = monthNames[`${today.getMonth()}`]
  const currYear = today.getFullYear()

  const dbDocName = `${currMonth}${currYear}`

  return { dbDocName, date, month: currMonth }
}

// will pull data from firebase
const getImage = async () => {
  // open up firebase connection
  firebase.initializeApp(fireConfig)
  const firestore = firebase.firestore()

  // get the schedule for curr month from db
  const { dbDocName, date, month } = getDocNameDate()
  const docRef = firestore.doc(`schedules/${dbDocName}`)
  const snapshot = await docRef.get()
  const schedule = snapshot.data().schedule

  // get data for current day
  const currentDayIndex = Object.keys(schedule).find(key => schedule[key].date === date && schedule[key].month === month)
  const todaysPhotoUrl = schedule[currentDayIndex].submission.edited

  const image = await Canvas.loadImage(todaysPhotoUrl)
  const canvas = Canvas.createCanvas(1920, 946)
  const context = canvas.getContext('2d')

  context.drawImage(image, 0, 0)
  const imgData = context.getImageData(0, 0, 1920, 946)
  return imgData.data
}

// pull the image data array from the photo
// convert that array into array of pixel objects
const getPixelArray = async rgbArray => {
  console.log(rgbArray[0])
  let pixelArray = []
  let pixelObj = {}
  for (const i in rgbArray) {
    if (i % 4 === 0 || i === 0) {
      pixelObj.r = rgbArray[i]
    } else if (i % 4 === 1) {
      pixelObj.g = rgbArray[i]
    } else if (i % 4 === 2) {
      pixelObj.b = rgbArray[i]
      pixelArray.push(pixelObj)
    } else if (i % 4 === 3) {
      pixelObj = {}
    }
  }
  return pixelArray
}

// returns the swatch array
export const quantize = async () => {
  const rgbArray = await getImage()
  const pixelArray = await getPixelArray(rgbArray)
  console.log(pixelArray)
}
