import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
            <motion.h1
              className={styles["hero__heading"]}
              viewport={{ once: true }}
              initial={{ x: "-25%" }}
              whileInView={{
                x: "0",
                transition: { duration: 0.75, ease: "easeInOut" },
              }}
            >
              Exquisite dining since 1989
            </motion.h1>
            <motion.p
              className={styles["hero__info"]}
              viewport={{ once: true }}
              initial={{ x: "25%" }}
              whileInView={{
                x: "0",
                transition: { duration: 0.75, ease: "easeInOut" },
              }}
            >
              Experience our seasonal menu in beautiful country surroundings.
              Eat the freshest produce from the comfort of our farmhouse.
            </motion.p>
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
