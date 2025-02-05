import styles from "../styles/reservations.module.scss";

interface ReservationsProps {
  type: "banner" | "site";
}

const Reservations: React.FC<ReservationsProps> = ({ type }) => {
  return (
    <section className={`${styles["reservations-section"]}`}>
      <div className={`wrapper ${styles["reservations-content"]}`}>
        <h2>Ready to make a reservation?</h2>
        <button className={`btn`}>Book a Table</button>
      </div>
    </section>
  );
};

export default Reservations;
