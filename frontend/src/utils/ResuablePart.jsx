// src/utils/ResuablePart.js
import { toast } from "react-hot-toast";

export const getPasswordStrength = (password) => {
  if (!password) return { strength: 0, label: "" };
  if (password.length < 8) return { strength: 1, label: "Weak" };
  if (password.length < 12) return { strength: 2, label: "Medium" };
  return { strength: 3, label: "Strong" };
};

export const validateRegister = ({ name, email, password }) => {
  if (!name?.trim()) {
    toast.error("Name is required", { position: "top-right" });
    return false;
  }

  if (!email?.trim()) {
    toast.error("Email is required", { position: "top-right" });
    return false;
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    toast.error("Invalid email format", { position: "top-right" });
    return false;
  }

  if (!password?.trim()) {
    toast.error("Password is required", { position: "top-right" });
    return false;
  }

  return true;
};

export const validateLogin = ({ email, password }) => {
  if (!email?.trim()) {
    toast.error("Email is required", { position: "top-right" });
    return false;
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    toast.error("Invalid email format", { position: "top-right" });
    return false;
  }

  if (!password?.trim()) {
    toast.error("Password is required", { position: "top-right" });
    return false;
  }

  return true;
};


export const validateProfile = ({
  name,
  email,
  currentPassword,
  newPassword,
  confirmPassword,
}) => {
  if (!name?.trim()) {
    toast.error("Name is required", { position: "top-right" });
    return false;
  }

  if (!email?.trim()) {
    toast.error("Email is required", { position: "top-right" });
    return false;
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    toast.error("Invalid email format", { position: "top-right" });
    return false;
  }

  const passwordFieldsFilled =
    currentPassword || newPassword || confirmPassword;

  if (passwordFieldsFilled) {
    if (!currentPassword?.trim()) {
      toast.error("Current password is required", { position: "top-right" });
      return false;
    }

    if (!newPassword?.trim() || newPassword.length < 8) {
      toast.error("New password must be at least 8 characters", {
        position: "top-right",
      });
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", { position: "top-right" });
      return false;
    }
  }

  return true;
};
