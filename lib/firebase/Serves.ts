import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { FIREBASE_DB } from "./FirebaseConfig"
export const v = 1
export const getProdctsFromFirebase = async () => {
    const col = collection(FIREBASE_DB, "products")
    const querySnapshot = await getDocs(col)
    return querySnapshot
}
export const getProdctFomFirebaseUsingId = async (id : string) => {
    const DOC = doc(FIREBASE_DB ,"products" ,id)
    const GET = await getDoc(DOC)
    return GET.data()
}
export const check_v_of_app = async () => {
    const DOC = doc(FIREBASE_DB ,"v" ,"v_1")
    const GET = await getDoc(DOC)
    return GET.data()
}
// export const getCategoriesFromFirebase = async () => {
//     const col = collection(FIREBASE_DB, "categories")
//     const querySnapshot = await getDocs(col)
//     return querySnapshot
// }
// export const getBrandsFromFirebase = async () => {
//     const col = collection(FIREBASE_DB, "brands")
//     const querySnapshot = await getDocs(col)
//     return querySnapshot
// }
// export const getSlidersFromFirebase = async () => {
//     const col = collection(FIREBASE_DB, "sliders")
//     const querySnapshot = await getDocs(col)
//     return querySnapshot
// }