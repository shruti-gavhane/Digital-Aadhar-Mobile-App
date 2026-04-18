import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs
} from "firebase/firestore";

// 🚨 REPORT SCAM
export const reportScam = async (title: string, description: string) => {
  try {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      await addDoc(collection(db, "scam_reports"), {
        title,
        description,
        timestamp: Date.now(),
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        upvotes: 0
      });
    });
  } catch (err) {
    console.error(err);
  }
};

// 🚨 GET ALL WARNINGS
export const getLatestWarnings = async () => {
  const q = query(
    collection(db, "scam_reports"),
    orderBy("timestamp", "desc"),
    limit(10)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};

// 📍 GET NEARBY SCAMS
export const getNearbyScams = async (
  userLat: number,
  userLng: number,
  radius = 500
) => {
  const q = query(
    collection(db, "scam_reports"),
    orderBy("timestamp", "desc"),
    limit(20)
  );

  const snapshot = await getDocs(q);

  const nearby: any[] = [];

  snapshot.docs.forEach(doc => {
    const data = doc.data();

    if (data.lat && data.lng) {
      const distance = getDistance(
        userLat,
        userLng,
        data.lat,
        data.lng
      );

      if (distance <= radius) {
        nearby.push({ ...data, distance });
      }
    }
  });

  return nearby;
};

// 📏 DISTANCE FUNCTION
const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) *
      Math.cos(φ2) *
      Math.sin(Δλ / 2) *
      Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};