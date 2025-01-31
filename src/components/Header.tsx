import logo from "../assets/logo.svg";
import styles from "../styles/header.module.scss";

export default function Header() {
  return (
    <>
      <section className={styles.hero}>
        <div className={`wrapper ${styles["hero__wrapper"]}`}>
          <div className={`${styles["hero__content"]}`}>
            <a className={styles["hero__logo"]} href="/" aria-label="homepage">
              <img src={logo} alt="Restaurant Logo" />
            </a>
            <h1 className={styles["hero__heading"]}>
              Exquisite dining since 1989
            </h1>
            <p className={styles["hero__info"]}>
              Experience our seasonal menu in beautiful country surroundings.
              Eat the freshest produce from the comfort of our farmhouse.
            </p>
            <button className="btn">Book a Table</button>
          </div>
        </div>
      </section>
    </>
  );
}
