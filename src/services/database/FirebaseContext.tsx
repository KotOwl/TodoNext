"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
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
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  createEvent: (event: IEventCreate) => Promise<void>;
  getEvents: (filters?: EventFilters) => Promise<IEventRead[]>;
  getEventsByDate?: (
    startDate: string,
    endDate: string
  ) => Promise<IEventRead[]>;
  getEventsByType?: (type: string) => Promise<IEventRead[]>;
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

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  };


  const createEvent = async (event: IEventCreate) => {
    try {
      if (!user) {
        throw new Error("User must be authenticated to create events");
      }

      const dataToSend = {
        title: event.title,
        description: event.description,
        eventDate: event.date,
        eventTime: event.time,
        type: event.type,
        userId: user.uid,
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
        return [];
      }

      let eventsQuery = query(
        collection(db, "events"),
        where("userId", "==", user.uid)
      );

      if (filters) {
        if (filters.startDate) {
          eventsQuery = query(
            eventsQuery,
            where("dateTimeISO", ">=", filters.startDate)
          );
        }
        if (filters.endDate) {
          eventsQuery = query(
            eventsQuery,
            where("dateTimeISO", "<=", filters.endDate)
          );
        }
        if (filters.type) {
          eventsQuery = query(eventsQuery, where("type", "==", filters.type));
        }
        if (filters.title) {
          eventsQuery = query(
            eventsQuery,
            where("title", ">=", filters.title),
            where("title", "<=", filters.title + "\uf8ff")
          );
        }
      }

      eventsQuery = query(eventsQuery, orderBy("dateTimeISO", "asc"));

      const events = await getDocs(eventsQuery);

      return events.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as IEventRead)
      );
    } catch (error) {
      console.error("Error getting events:", error);
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
    logout,
    resetPassword,
    createEvent,
    getEvents,
    getEventsByDate,
    getEventsByType,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
