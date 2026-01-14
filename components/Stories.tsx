"use client";

import { Avatar, Box, Typography } from "@mui/material";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { openAddStoryModal } from "../redux/slices/modalSlice";
import type { RootState } from "../redux/store";

const dummyStories = [
  { id: 1, name: "John", avatar: "/assets/Bondr.jpg" },
  { id: 2, name: "Sarah", avatar: "/assets/Bondr.jpg" },
  { id: 3, name: "Mike", avatar: "/assets/Bondr.jpg" },
  { id: 4, name: "Emma", avatar: "/assets/Bondr.jpg" },
  { id: 5, name: "Alex", avatar: "/assets/Bondr.jpg" },
];

export default function Stories() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 2,
        borderBottom: "1px solid #f0f0f0",
        overflowX: "auto",
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      {/* Your Story - Add Button (Instagram style) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 72,
          cursor: "pointer",
        }}
        onClick={() => dispatch(openAddStoryModal())}
      >
        <Box
          sx={{
            position: "relative",
            p: "3px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Avatar
            src="/assets/Bondr.jpg"
            alt="Your Story"
            sx={{
              width: 56,
              height: 56,
              border: "3px solid white",
            }}
          />
          {/* Plus icon badge */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 22,
              height: 22,
              borderRadius: "50%",
              bgcolor: "#0ea5e9",
              border: "2px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PlusIcon className="w-3.5 h-3.5 text-white" />
          </Box>
        </Box>
        <Typography
          sx={{
            fontSize: 11,
            mt: 0.5,
            color: "#374151",
            fontWeight: 500,
          }}
        >
          Your story
        </Typography>
      </Box>

      {/* Other Story Circles */}
      {dummyStories.map((story) => (
        <Box
          key={story.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 72,
            cursor: "pointer",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Box
            sx={{
              p: "3px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #a855f7 100%)",
            }}
          >
            <Avatar
              src={story.avatar}
              alt={story.name}
              sx={{
                width: 56,
                height: 56,
                border: "3px solid white",
              }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: 11,
              mt: 0.5,
              color: "#374151",
              maxWidth: 64,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            {story.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
