import React from "react";
import styles from "./Footer.module.css";
import dogsFooter from "../Assets/dogs-footer.svg?url";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src={dogsFooter} alt="Dogs Logo" />
      <p>Dogs. Alguns direitos reservados.</p>
    </footer>
  );
};

export default Footer;
