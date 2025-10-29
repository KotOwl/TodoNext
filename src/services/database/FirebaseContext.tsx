"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { IEventCreate, IEventRead } from "@/types/IEvents";
import { EventFilters } from "@/types/IEvents";

interface FirebaseContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
  requireAuth: () => void;
  createEvent: (event: IEventCreate) => Promise<void>;
  getEvents: (filters?: EventFilters) => Promise<IEventRead[]>;
  completeEvent: (eventId: string) => Promise<void>;
  getEventsByDate?: (
    startDate: string,
    endDate: string
  ) => Promise<IEventRead[]>;
  getEventsByType?: (type: string) => Promise<IEventRead[]>;
  updateEvent: (
    eventId: string,
    eventData: Partial<IEventRead>
  ) => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};

interface FirebaseProviderProps {
  children: React.ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    displayName?: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const signInWithGitHub = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const isAuthenticated = (): boolean => {
    return user !== null && user !== undefined;
  };

  const requireAuth = (): void => {
    if (!isAuthenticated()) {
      throw new Error("User must be authenticated to perform this action");
    }
  };

  const createEvent = async (event: IEventCreate) => {
    try {
      requireAuth();

      const dataToSend = {
        title: event.title,
        description: event.description,
        eventDate: event.date,
        eventTime: event.time,
        type: event.type,
        status: "Active",
        userId: user!.uid,
        dateTimeISO: `${event.date}T${event.time}`,
      };

      console.log("Відправка даних як рядків:", dataToSend);

      await addDoc(collection(db, "events"), dataToSend);

      console.log("Подія успішно створена!");
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  };

  const getEvents = async (filters?: EventFilters) => {
    try {
      if (!user) {
        console.log("No user found, returning empty array");
        return [];
      }

      console.log("Building query with filters:", filters);

      const statusFilter = filters?.status || "Active";

      let eventsQuery = query(
        collection(db, "events"),
        where("userId", "==", user.uid),
        where("status", "==", statusFilter)
      );

      if (filters) {
        if (filters.type) {
          console.log("Adding type filter:", filters.type);
          eventsQuery = query(eventsQuery, where("type", "==", filters.type));
        }
        if (filters.title) {
          console.log("Adding title filter:", filters.title);
          eventsQuery = query(
            eventsQuery,
            where("title", ">=", filters.title),
            where("title", "<=", filters.title + "\uf8ff")
          );
        }
        if (filters.startDate) {
          console.log("Adding startDate filter:", filters.startDate);
          eventsQuery = query(
            eventsQuery,
            where("dateTimeISO", ">=", filters.startDate)
          );
        }
        if (filters.endDate) {
          console.log("Adding endDate filter:", filters.endDate);
          eventsQuery = query(
            eventsQuery,
            where("dateTimeISO", "<=", filters.endDate)
          );
        }
      }

      // Додаємо orderBy в кінці для використання індексу
      eventsQuery = query(eventsQuery, orderBy("dateTimeISO", "asc"));

      console.log("Executing Firestore query...");
      const events = await getDocs(eventsQuery);
      console.log("Query returned", events.docs.length, "events");

      const result = events.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as IEventRead)
      );

      console.log("Processed events:", result);
      return result;
    } catch (error) {
      console.error("Error getting events:", error);
      throw error;
    }
  };

  const completeEvent = async (eventId: string) => {
    try {
      if (!user) {
        throw new Error("User must be authenticated to complete events");
      }

      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, {
        status: "Completed",
      });

      console.log("Event completed successfully!");
    } catch (error) {
      console.error("Error completing event:", error);
      throw error;
    }
  };

  const updateEvent = async (
    eventId: string,
    eventData: Partial<IEventRead>
  ) => {
    try {
      if (!user) {
        throw new Error("User must be authenticated to update events");
      }

      const eventRef = doc(db, "events", eventId);

      // Підготовка даних для оновлення
      const updateData: Record<string, unknown> = {};

      if (eventData.title !== undefined) {
        updateData.title = eventData.title;
      }
      if (eventData.description !== undefined) {
        updateData.description = eventData.description;
      }
      if (eventData.eventDate !== undefined) {
        updateData.eventDate = eventData.eventDate;
        // Оновлюємо dateTimeISO якщо змінилася дата
        updateData.dateTimeISO = eventData.eventDate;
      }
      if (eventData.type !== undefined) {
        updateData.type = eventData.type;
      }
      if (eventData.status !== undefined) {
        updateData.status = eventData.status;
      }

      await updateDoc(eventRef, updateData);

      console.log("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };

  const getEventsByDate = async (startDate: string, endDate: string) => {
    try {
      if (!user) {
        return [];
      }

      const eventsQuery = query(
        collection(db, "events"),
        where("userId", "==", user.uid),
        where("dateTimeISO", ">=", startDate),
        where("dateTimeISO", "<=", endDate),
        orderBy("dateTimeISO", "asc")
      );
      const events = await getDocs(eventsQuery);

      return events.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as IEventRead)
      );
    } catch (error) {
      console.error("Error getting events by date:", error);
      throw error;
    }
  };

  const getEventsByType = async (type: string) => {
    try {
      if (!user) {
        return [];
      }

      const eventsQuery = query(
        collection(db, "events"),
        where("userId", "==", user.uid),
        where("type", "==", type),
        orderBy("dateTimeISO", "asc")
      );
      const events = await getDocs(eventsQuery);

      return events.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as IEventRead)
      );
    } catch (error) {
      console.error("Error getting events by type:", error);
      throw error;
    }
  };

  const value: FirebaseContextType = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGitHub,
    logout,
    isAuthenticated,
    requireAuth,
    createEvent,
    getEvents,
    completeEvent,
    getEventsByDate,
    getEventsByType,
    updateEvent,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
