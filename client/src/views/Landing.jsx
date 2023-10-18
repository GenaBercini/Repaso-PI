import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/landing.module.css";

export function Landing() {
  const navigate = useNavigate();
  return (
    <div className={styles.container} onClick={() => navigate("/home")}></div>
  );
}
