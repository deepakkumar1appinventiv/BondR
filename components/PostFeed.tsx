"use client";
import { useEffect, useState } from "react";
import { Post } from "./Post";
import Stories from "./Stories";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";

export const PostFeed = () => {
  const [posts, setPosts] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("Timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const snapshotDocs = snapshot.docs;
      setPosts(snapshotDocs);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="flex-grow border-x border-gray-100 w-full">
      {/* Stories Section */}
      <Stories />

      {/* Posts Feed */}
      <div>
        {posts.map((post) => (
          <Post key={post.id} data={post.data()} id={post.id} />
        ))}
      </div>
    </div>
  );
};
