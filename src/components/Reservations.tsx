import styles from "../styles/reservations.module.scss";
import logo from "../assets/logo.svg";
import patternCurveBottomRight from "../assets/patterns/pattern-curve-bottom-right.svg";

interface ReservationsProps {
  type: "banner" | "hero";
}

const Reservations: React.FC<ReservationsProps> = ({ type }) => {
  return (
    <>
      <section className={`${styles["reservations-section"]}`}>
        <div
          className={`${styles["reservations-container"]} ${
            styles[`--${type}`]
          }`}
        >
          <div
            className={`wrapper ${styles["reservations-content"]} ${
              styles[`--${type}`]
            }`}
          >
            {type === "banner" && <h2>Ready to make a reservation?</h2>}
            {type === "hero" && (
              <>
                <img
                  className={`${styles["reservations-content__logo-image"]}`}
                  src={logo}
                  alt="Restaurant Logo"
                />
                <h1>Reservations</h1>
                <p>
                  We can’t wait to host you. If you have any special
                  requirements please feel free to call on the phone number
                  below. We’ll be happy to accommodate you.
                </p>
                <button className={`btn`}>Reserve Place</button>
              </>
            )}
            {type === "banner" && (
              <button className={`btn`}>Book a Table</button>
            )}
          </div>
        </div>
        {type === "hero" && (
          <div className={`${styles["reservation"]}`}>
            <img
              className={`${styles["reservation__pattern-curve"]}`}
              src={patternCurveBottomRight}
              alt=""
            />
          </div>
        )}
      </section>
    </>
  );
};

export default Reservations;
