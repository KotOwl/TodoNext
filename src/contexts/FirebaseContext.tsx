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
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { IEventCreate, IEventRead } from "@/types/IEvents";

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
  getEvents: () => Promise<IEventRead[]>;
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

  // НЕ ПОТРІБЕН: import { Timestamp } from "firebase/firestore";

const createEvent = async (event: IEventCreate) => {
  try {
    
    const dataToSend = {
      title: event.title,
      description: event.description,
      
     
      eventDate: event.date, 
      eventTime: event.time, 
      
     
      dateTimeISO: `${event.date}T${event.time}`
    };

    console.log("Відправка даних як рядків:", dataToSend);

    await addDoc(collection(db, "events"), dataToSend);

    console.log("Подія успішно створена!");

  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

  const getEvents = async () => {
    try {
      const events = await getDocs(collection(db, "events"));
      
      return events.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      } as IEventRead));
      
    } catch (error) {
      console.error("Error getting events:", error);
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
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
