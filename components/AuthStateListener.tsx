"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { signInUser, signOutUser } from "../redux/slices/userSlcie";
import type { AppDispatch } from "../redux/store";

export const AuthStateListener = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        dispatch(signOutUser());
        return;
      }

      const email = currentUser.email ?? "";
      const username = email ? email.split("@")[0] : "";

      dispatch(
        signInUser({
          name: currentUser.displayName ?? username,
          username,
          email,
          uid: currentUser.uid,
        })
      );
    });

    return unsubscribe;
  }, [dispatch]);

  return null;
};
