import { db } from "@/config/firebase";
import { doc, setDoc } from "firebase/firestore";

type User = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
  apiKey: string;
};

export const createUser = async (user: User) => {
  const userRef = doc(db, "users", user.clerkId);
  await setDoc(userRef, {
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    photo: user.photo,
    apiKey: user.apiKey,
  });
  return userRef;
};
