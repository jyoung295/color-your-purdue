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

    return {dbDocName, date, month: currMonth}
}

// will pull data from firebase
const getImage = async () => {
    // open up firebase connection
    firebase.initializeApp(fireConfig)
    const firestore = firebase.firestore()
    
    // get the schedule for curr month from db
    const {dbDocName, date, month} = getDocNameDate()
    const docRef = firestore.doc(`schedules/${dbDocName}`)
    const snapshot = await docRef.get()
    const schedule = snapshot.data().schedule

    // get data for current day    
    const currentDayIndex = Object.keys(schedule).find(key => schedule[key].date === date && schedule[key].month === month)
    const todaysPhotoUrl = schedule[currentDayIndex].submission.edited

    const image = await Canvas.loadImage(todaysPhotoUrl)

    console.log(await image)
}

// pull the image data array from the photo
// convert that array into array of pixel objects
const getPixelArray = async () => {

}

// returns the swatch array
export const quantize = async () => {
    await getImage()
}

