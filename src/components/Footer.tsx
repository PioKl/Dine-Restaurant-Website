import { Link } from "react-router-dom";
import styles from "../styles/footer.module.scss";
import logo from "../assets/logo.svg";

export default function Footer() {
  return (
    <footer className={`wrapper ${styles["footer"]}`}>
      <div className={`${styles["logo-container"]}`}>
        <Link
          className={styles["logo-container__logo-link"]}
          to="/"
          aria-label="homepage"
        >
          <img
            className={styles["logo-container__logo-image"]}
            src={logo}
            alt="Restaurant Logo"
          />
        </Link>
      </div>
      <div className={`${styles["contact-details"]}`}>
        <ul>
          <li>Marthwaite, Sedbergh</li>
          <li>Cumbria</li>
          <li>+00 44 123 4567</li>
        </ul>
        <ul>
          <li>Open Times</li>
          <li>MON - FRI: 09:00 AM - 10:00 PM</li>
          <li>SAT - SUN: 09:00 AM - 11:30 PM</li>
        </ul>
      </div>
    </footer>
  );
}
