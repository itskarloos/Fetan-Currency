import { db } from "@/config/firebase";
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";

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

// Add this at the top of the file, after the imports
const userCache = new Map<string, User>();

export const getUserById = async (userId: string): Promise<User | null> => {
  // Check if the user is in the cache
  if (userCache.has(userId)) {
    return userCache.get(userId) || null;
  }

  const userRef = doc(db, "users", userId);
  try {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data() as Omit<User, "clerkId">;
      const user = { ...userData, clerkId: userSnap.id };

      // Store the user in the cache
      userCache.set(userId, user);

      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const getAllApiKeys = async (): Promise<Record<string, boolean>> => {
  try {
    const usersRef = collection(db, "users");
    const usersSnap = await getDocs(usersRef);

    const apiKeys: Record<string, boolean> = {};
    usersSnap.forEach((doc) => {
      const userData = doc.data() as User;
      if (userData.apiKey) {
        apiKeys[userData.apiKey] = true;
      }
    });

    return apiKeys;
  } catch (error) {
    console.error("Error fetching all API keys:", error);
    return {};
  }
};
