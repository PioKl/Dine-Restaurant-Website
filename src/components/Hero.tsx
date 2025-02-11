import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import styles from "../styles/hero.module.scss";
import Button from "./Button";

export default function Hero() {
  return (
    <>
      <section className={styles.hero}>
        <div className={`wrapper ${styles["hero__wrapper"]}`}>
          <div className={`${styles["hero__content"]}`}>
            <Link className={styles["hero__logo"]} to="/" aria-label="homepage">
              <img src={logo} alt="Restaurant Logo" />
            </Link>
            <h1 className={styles["hero__heading"]}>
              Exquisite dining since 1989
            </h1>
            <p className={styles["hero__info"]}>
              Experience our seasonal menu in beautiful country surroundings.
              Eat the freshest produce from the comfort of our farmhouse.
            </p>
            <Button
              buttonType="normal"
              linkToBooking={true}
              text="Book a Table"
            />
          </div>
        </div>
      </section>
    </>
  );
}
