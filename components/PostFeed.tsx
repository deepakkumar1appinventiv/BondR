"use client";
import { useEffect, useState } from "react"
import { Post } from "./Post"
import PostInput from "./PostInput"
import { collection, onSnapshot, orderBy, query, QueryDocumentSnapshot, type DocumentData } from "firebase/firestore"
import { db } from "../firebase"

export const PostFeed = () => {

  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([])

  useEffect(()=>{
    const q = query(collection(db,"posts"), orderBy("Timestamp","desc"))
    const unsubscribe = onSnapshot(q,(snapshot)=>{
      const snapshotDocs = snapshot.docs
      
      setPosts(snapshotDocs)

    })

    return unsubscribe
  },[])
  
  return (
    <div className="flex-grow  border-x border-gray-100 ">
        <div className="py-4 px-3 text-lg sm:text-xl sticky top-0  z-50
         bg-white bg-opacity-80 backdrop-blue-sm font-bold
         border-b border-gray-100
        ">
            Home
        </div>
        <PostInput/>
        {posts.map(post=><Post
          key={post.id}
          data={post.data()}
          id={post.id}
          />
        )}
    </div>
  );
}
