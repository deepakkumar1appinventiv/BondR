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
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { closeAddStoryModal } from "../../redux/slices/modalSlice";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", sm: 450 },
  maxHeight: { xs: "100%", sm: "80vh" },
  bgcolor: "background.paper",
  borderRadius: { xs: 0, sm: 3 },
  boxShadow: 24,
  outline: "none",
};

export default function AddStoryModal() {
  const [text, setText] = useState("");
  const open = useSelector((state: RootState) => state.modals.addStoryModalOpen);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeAddStoryModal());
    setText("");
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="add-story-modal">
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
            Add Story
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <XMarkIcon className="w-6 h-6" />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {/* Preview Area */}
          <Box
            sx={{
              width: "100%",
              height: 300,
              bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              position: "relative",
            }}
          >
            {text ? (
              <Typography
                sx={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: 500,
                  textAlign: "center",
                  p: 2,
                }}
              >
                {text}
              </Typography>
            ) : (
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 16,
                }}
              >
                Preview your story
              </Typography>
            )}
          </Box>

          {/* Text Input */}
          <TextField
            multiline
            minRows={2}
            maxRows={4}
            placeholder="Write something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          {/* Media Options */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Button
              variant="outlined"
              startIcon={<PhotoIcon className="w-5 h-5" />}
              sx={{
                flex: 1,
                borderRadius: 2,
                textTransform: "none",
                borderColor: "#e5e7eb",
                color: "#374151",
                "&:hover": {
                  borderColor: "#0ea5e9",
                  bgcolor: "#f0f9ff",
                },
              }}
            >
              Photo
            </Button>
            <Button
              variant="outlined"
              startIcon={<VideoCameraIcon className="w-5 h-5" />}
              sx={{
                flex: 1,
                borderRadius: 2,
                textTransform: "none",
                borderColor: "#e5e7eb",
                color: "#374151",
                "&:hover": {
                  borderColor: "#0ea5e9",
                  bgcolor: "#f0f9ff",
                },
              }}
            >
              Video
            </Button>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <Button
            variant="contained"
            disabled={!text.trim()}
            onClick={handleClose}
            sx={{
              bgcolor: "#0ea5e9",
              borderRadius: "9999px",
              px: 4,
              py: 1,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "#0284c7",
              },
              "&:disabled": {
                bgcolor: "#0ea5e9",
                opacity: 0.5,
              },
            }}
          >
            Share Story
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
