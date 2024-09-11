import { db } from "@/config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

type User = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
  apiKey: string;
};

export const createUser = async (user: User): Promise<User | null> => {
  const userRef = doc(db, "users", user.clerkId);
  try {
    await setDoc(userRef, {
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.photo,
      apiKey: user.apiKey,
    });

    // Fetch and return the newly created user data
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data() as Omit<User, "clerkId">;
      return { ...userData, clerkId: userSnap.id };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
