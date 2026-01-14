"use client";

import { useState } from "react";
import {
  Modal,
  Box,
  IconButton,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import {
  XMarkIcon,
  PhotoIcon,
  ChartBarIcon,
  FaceSmileIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { closeAddPostModal } from "../../redux/slices/modalSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", sm: 550 },
  maxHeight: { xs: "100%", sm: "auto" },
  bgcolor: "background.paper",
  borderRadius: { xs: 0, sm: 3 },
  boxShadow: 24,
  outline: "none",
};

export default function AddPostModal() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const open = useSelector((state: RootState) => state.modals.addPostModalOpen);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeAddPostModal());
    setText("");
  };

  const handlePost = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "posts"), {
        text: text,
        name: user.name,
        username: user.username,
        Timestamp: serverTimestamp(),
        likes: [],
        Comment: [],
      });
      handleClose();
    } catch (error) {
      console.error("Error posting:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-post-modal"
    >
      <Box sx={modalStyle}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
              color: "#0f1419",
            }}
          >
            Create Post
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <XMarkIcon className="w-6 h-6" />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Avatar
              src="/assets/Bondr.jpg"
              alt="Profile"
              sx={{ width: 48, height: 48 }}
            />
            <Box sx={{ flex: 1 }}>
              <TextField
                multiline
                minRows={3}
                maxRows={8}
                placeholder="What's happening?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                variant="standard"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: 18,
                    "& textarea": {
                      "&::placeholder": {
                        color: "#9ca3af",
                        opacity: 1,
                      },
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton size="small" sx={{ color: "#38bdf8" }}>
              <PhotoIcon className="w-5 h-5" />
            </IconButton>
            <IconButton size="small" sx={{ color: "#38bdf8" }}>
              <ChartBarIcon className="w-5 h-5" />
            </IconButton>
            <IconButton size="small" sx={{ color: "#38bdf8" }}>
              <FaceSmileIcon className="w-5 h-5" />
            </IconButton>
            <IconButton size="small" sx={{ color: "#38bdf8" }}>
              <CalendarIcon className="w-5 h-5" />
            </IconButton>
            <IconButton size="small" sx={{ color: "#38bdf8" }}>
              <MapPinIcon className="w-5 h-5" />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            disabled={!text.trim() || loading}
            onClick={handlePost}
            sx={{
              bgcolor: "#38bdf8",
              borderRadius: "9999px",
              px: 3,
              py: 1,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "#0ea5e9",
              },
              "&:disabled": {
                bgcolor: "#38bdf8",
                opacity: 0.6,
              },
            }}
          >
            {loading ? "Posting..." : "BondR"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
