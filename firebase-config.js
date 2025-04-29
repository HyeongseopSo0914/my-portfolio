import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, increment, getDoc, setDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config"; // 네 설정 정보

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const today = new Date().toISOString().split("T")[0]; // 예: 2025-04-29

async function updateVisitorCount() {
  const totalRef = doc(db, "visitorStats", "total");
  const todayRef = doc(db, "visitorStats", today);

  // total 방문자 수 증가
  await updateDoc(totalRef, {
    count: increment(1)
  }).catch(async () => {
    await setDoc(totalRef, { count: 1 });
  });

  // 오늘 방문자 수 증가
  await updateDoc(todayRef, {
    count: increment(1)
  }).catch(async () => {
    await setDoc(todayRef, { count: 1 });
  });
}

updateVisitorCount();