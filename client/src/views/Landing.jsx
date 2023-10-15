import React from "react";
import styles from "./styles/landing.module.css";
import { useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate();
  return (
    <div className={styles.container} onClick={() => navigate("/home")}></div>
  );
}
