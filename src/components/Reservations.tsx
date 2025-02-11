import { useRef, useState } from "react";
import Button from "./Button";
import styles from "../styles/reservations.module.scss";
import logo from "../assets/logo.svg";
import patternCurveBottomRight from "../assets/patterns/pattern-curve-bottom-right.svg";
import patternLines from "../assets/patterns/pattern-lines.svg";
import dropDownArrow from "../assets/icons/icon-arrow.svg";

interface ReservationsProps {
  type: "banner" | "hero";
}

const Reservations: React.FC<ReservationsProps> = ({ type }) => {
  const [counter, setCounter] = useState(1); //Będzie reprezentował liczbę osób rezerwujących stolik
  const selectRef = useRef<HTMLLIElement | null>(null); // Ref do elementu select

  //Zmniejszanie osób
  const handleRemovePeople = () => {
    setCounter((prevCounter) =>
      prevCounter > 1 ? prevCounter - 1 : prevCounter
    );
  };
  //Zwiększenie osób
  const handleAddPeople = () => {
    setCounter((prevCounter) =>
      prevCounter < 4 ? prevCounter + 1 : prevCounter
    );
  };

  //Walidacja formularza

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    month: false,
    day: false,
    year: false,
    hour: false,
    minutes: false,
    timeAbbreviation: false,
  });

  const [values, setValues] = useState({
    name: "",
    email: "",
    month: "",
    day: "",
    year: "",
    hour: "",
    minutes: "",
    timeAbbreviation: "AM",
  });

  const messages = {
    requiredMessage: "The field is required",
    incompleteMessage: "The field is incomplete",
  };

  const handleFormInput = (
    value: string,
    isBlur: boolean = false,
    valueToUpdate: keyof typeof values
  ) => {
    // Pozostawia pustą wartość, jeśli użytkownik usuwa wszystko
    if (value === "") {
      setValues((prevValues) => ({ ...prevValues, [valueToUpdate]: "" }));
      return;
    }
    // Usuwa znaki inne niż cyfry
    value = value.replace(/\D/g, "");

    /*===================================
                Dla Month
    ======================================*/
    // Obsługa na `onBlur`
    if (valueToUpdate === "month") {
      if (isBlur) {
        if (value === "0" || value === "00" || value === "") {
          value = "01"; // Minimalna wartość
        } else if (value.length === 1) {
          value = "0" + value; // Dodaje zero, np. "1" to utworzy "01"
        }
      }

      // Blokada wpisywanych wartości spoza zakresu 01-12 (ale jest możliwość wpisania 0 i jego poprawienia, w celu utworzenia 01 itd)
      if (!isBlur && value.length <= 2 && parseInt(value) > 12) {
        return;
      }
      //month: value -> tak to wygląda
      setValues((prevValues) => ({ ...prevValues, [valueToUpdate]: value }));
    } else if (valueToUpdate === "day") {
      /* ===================================
                Dla Day
    ======================================*/
      // Obsługa na `onBlur`
      if (isBlur) {
        if (value === "0" || value === "00" || value === "") {
          value = "01"; // Minimalna wartość
        } else if (value.length === 1) {
          value = "0" + value; // Dodaje zero, np. "1" to utworzy "01"
        }
      }

      // Blokada wpisywanych wartości spoza zakresu 01-31 (ale jest możliwość wpisania 0 i jego poprawienia, w celu utworzenia 01 itd)
      if (!isBlur && value.length <= 2 && parseInt(value) > 31) {
        return;
      }

      //day: value -> tak to wygląda
      setValues((prevValues) => ({ ...prevValues, [valueToUpdate]: value }));
    } else if (valueToUpdate === "year") {
      /* ===================================
                Dla Year
       ======================================*/
      // Obsługa na `onBlur`
      if (isBlur) {
        if (value !== "2025" && value !== "2026" && value !== "") {
          //Jeśli wartości są różne niż 2025 i 2026 wtedy ustawi 2025, aktualny rok
          value = "2025";
        } else if (value.length <= 3) {
          //także w przypadku, gdy długość wpisywanego znaku jest <=3
          value = "2025";
        }
      }

      // Blokada wpisywanych wartości większych niż 2026
      if (!isBlur && parseInt(value) > 2026) {
        return;
      }
      setValues((prevValues) => ({ ...prevValues, [valueToUpdate]: value }));
    } else if (valueToUpdate === "hour") {
      /* ===================================
                Dla Hour
       ======================================*/
      // Obsługa na `onBlur`
      if (isBlur) {
        if (value === "0" || value === "00" || value === "") {
          if (values.timeAbbreviation === "AM") {
            value = "09"; // Minimalna wartość
          } else {
            value = "01"; // Jeśli inna od AM, czyli PM to minimalna wartość wynosi 01
          }
        } else if (value.length === 1 && value === "1") {
          value = value + "0"; // Dodaje zero, np. "1" to utworzy "10"
        } else if (value.length === 1) {
          value = "0" + value; // Dodaje zero, np. "1" to utworzy "01"
        }
      }

      // Blokada wpisywanych wartości oprócz 1, 0 i zakresu od 9 do 11 dla AM oraz blokada wszystkich wartości, oprócz 1, 0 i zakresu od 1 do 12 dla PM
      if (!isBlur && value.length <= 2) {
        if (
          values.timeAbbreviation === "AM" &&
          (parseInt(value) === 1 ||
            parseInt(value) === 0 ||
            (parseInt(value) >= 9 && parseInt(value) <= 11))
        ) {
          setValues((prevVaules) => ({
            ...prevVaules,
            [valueToUpdate]: value,
          }));
        } else if (
          values.timeAbbreviation === "PM" &&
          (parseInt(value) === 1 ||
            parseInt(value) === 0 ||
            (parseInt(value) >= 1 && parseInt(value) <= 12))
        ) {
          setValues((prevVaules) => ({
            ...prevVaules,
            [valueToUpdate]: value,
          }));
        }
        return;
      }

      setValues((prevVaules) => ({ ...prevVaules, [valueToUpdate]: value }));
    } else if (valueToUpdate === "minutes") {
      /* ===================================
                Dla Minutes
       ======================================*/
      // Obsługa na `onBlur`
      if (isBlur) {
        if (value === "0" || value === "") {
          value = "00"; // Minimalna wartość
        } else if (value.length === 1) {
          value = "0" + value; // Dodaje zero, np. "1" to utworzy "01"
        }
      }

      // Blokada wpisywanych wartości spoza zakresu 00-59
      if (!isBlur && value.length <= 2 && parseInt(value) > 59) {
        return;
      }

      setValues((prevValues) => ({ ...prevValues, [valueToUpdate]: value }));
    }
  };

  //Jeśli użytkownik naciśnie enter będąc na jakimś inpucie niech odpali jeszcze funkcję z onChange, jest to w razie tego, że niekiedy jak użytkownik opuści focus wtedy zmienia się wartość na prawidłową, jeśli była nieprawidłowa, natomiast jeżeli miał wartość nieprawidłową i wcisnął enter wtedy go przepuszczało, ta funkcja zachowa się tak jakby opuścił focus, dzięki temu przejdzie tylko wartość prawidłowa
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    callback: () => void
  ) => {
    if (e.key === "Enter") {
      callback();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name: values.name === "",
      email: values.email === "",
      month: values.month === "",
      day: values.day === "",
      year:
        values.year === "" ||
        (values.year !== "2025" && values.year !== "2026"),
      hour: values.hour === "",
      minutes: values.minutes === "",
      timeAbbreviation: values.timeAbbreviation === "",
    };

    if (
      newErrors.name ||
      newErrors.email ||
      newErrors.month ||
      newErrors.day ||
      newErrors.year ||
      newErrors.hour ||
      newErrors.minutes ||
      newErrors.timeAbbreviation
    ) {
      setErrors(newErrors);
    } else {
      //Mechanika enpointa, try await np. do api
      //----------------------------------
      //zresetowanie wartości
      console.log(
        values.name,
        values.email,
        values.month,
        values.day,
        values.year,
        values.hour,
        values.minutes,
        values.timeAbbreviation,
        counter
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: false,
        email: false,
        month: false,
        day: false,
        year: false,
        hour: false,
        minutes: false,
        timeAbbreviation: false,
      }));
      setValues((prevValues) => ({
        ...prevValues,
        name: "",
        email: "",
        month: "",
        day: "",
        year: "",
        hour: "",
        minutes: "",
        timeAbbreviation: "",
      }));
    }
  };

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
                <a href="/">
                  <img
                    className={`${styles["reservations-content__logo-image"]}`}
                    src={logo}
                    alt="Restaurant Logo"
                  />
                </a>

                <h1>Reservations</h1>
                <p>
                  We can’t wait to host you. If you have any special
                  requirements please feel free to call on the phone number
                  below. We’ll be happy to accommodate you.
                </p>
                <a href="#form">
                  <Button
                    buttonType="normal"
                    linkToBooking={false}
                    text="Reserve Place"
                  />
                </a>
              </>
            )}
            {type === "banner" && (
              <Button
                buttonType="normal"
                linkToBooking={true}
                text="Book a Table"
              />
            )}
          </div>
        </div>
        {type === "hero" && (
          <>
            <div className={`wrapper ${styles["reservation"]}`}>
              <img
                className={`${styles["reservation__pattern-curve"]}`}
                src={patternCurveBottomRight}
                alt="pattern-curve"
              />
              <div
                id="form"
                className={`${styles["reservation__form-container"]}`}
              >
                <img
                  className={`${styles["reservation__pattern-lines"]}`}
                  src={patternLines}
                  alt="patterin-lines"
                />
                <form onSubmit={handleSubmit} className={` ${styles["form"]}`}>
                  <div className={`${styles["form__guest-info-container"]}`}>
                    <label htmlFor="name"></label>
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      id="name"
                      value={values.name}
                      onChange={(e) =>
                        setValues({ ...values, name: e.target.value })
                      }
                      className={`${errors.name && styles["--error"]}`}
                    />
                    {errors.name && (
                      <span
                        className={`${styles["reservation__message-error"]}`}
                      >
                        {messages.requiredMessage}
                      </span>
                    )}
                  </div>
                  <div className={`${styles["form__guest-info-container"]}`}>
                    <label htmlFor="email"></label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) =>
                        setValues({ ...values, email: e.target.value })
                      }
                      className={`${errors.email && styles["--error"]}`}
                    />
                    {errors.email && (
                      <span
                        className={`${styles["reservation__message-error"]}`}
                      >
                        {messages.requiredMessage}
                      </span>
                    )}
                  </div>
                  <div className={`${styles["form__pick-container"]}`}>
                    <span
                      className={`${styles["form__pick-date-or-time"]} ${
                        (errors.month || errors.day || errors.year) &&
                        styles["--error"]
                      }`}
                    >
                      Pick a date
                    </span>
                    {(errors.month || errors.day || errors.year) && (
                      <span
                        className={`${styles["reservation__message-error"]} ${
                          styles[`--form`]
                        }`}
                      >
                        {messages.incompleteMessage}
                      </span>
                    )}
                    <ul className={`${styles["form__pick-item-list"]}`}>
                      <li className={`${styles["form__pick-item"]}`}>
                        <label htmlFor="month"></label>
                        <input
                          className={`${errors.month && styles["--error"]}`}
                          type="text"
                          placeholder="MM"
                          name="month"
                          id="month"
                          maxLength={2}
                          value={values.month}
                          onChange={(e) =>
                            handleFormInput(e.target.value, false, "month")
                          }
                          onBlur={(e) =>
                            handleFormInput(e.target.value, true, "month")
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, () =>
                              handleFormInput(values.month, true, "month")
                            )
                          }
                        />
                      </li>
                      <li className={`${styles["form__pick-item"]}`}>
                        <label htmlFor="day"></label>
                        <input
                          className={`${errors.day && styles["--error"]}`}
                          type="text"
                          placeholder="DD"
                          name="day"
                          id="day"
                          maxLength={2}
                          value={values.day}
                          onChange={(e) =>
                            handleFormInput(e.target.value, false, "day")
                          }
                          onBlur={(e) =>
                            handleFormInput(e.target.value, true, "day")
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, () =>
                              handleFormInput(values.month, true, "day")
                            )
                          }
                        />
                      </li>
                      <li className={`${styles["form__pick-item"]}`}>
                        <label htmlFor="year"></label>
                        <input
                          className={`${errors.year && styles["--error"]}`}
                          type="text"
                          placeholder="YYYY"
                          name="year"
                          id="year"
                          maxLength={4}
                          value={values.year}
                          onChange={(e) =>
                            handleFormInput(e.target.value, false, "year")
                          }
                          onBlur={(e) =>
                            handleFormInput(e.target.value, true, "year")
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, () =>
                              handleFormInput(values.month, true, "year")
                            )
                          }
                        />
                      </li>
                    </ul>
                  </div>
                  <div className={`${styles["form__pick-container"]}`}>
                    <span
                      className={`${styles["form__pick-date-or-time"]} ${
                        (errors.hour ||
                          errors.minutes ||
                          errors.timeAbbreviation) &&
                        styles["--error"]
                      }`}
                    >
                      Pick a time
                    </span>
                    {(errors.hour ||
                      errors.minutes ||
                      errors.timeAbbreviation) && (
                      <span
                        className={`${styles["reservation__message-error"]} ${
                          styles[`--form`]
                        }`}
                      >
                        {messages.incompleteMessage}
                      </span>
                    )}
                    <ul className={`${styles["form__pick-item-list"]}`}>
                      <li className={`${styles["form__pick-item"]}`}>
                        <label htmlFor="hour"></label>
                        <input
                          className={`${errors.hour && styles["--error"]}`}
                          type="text"
                          placeholder="09"
                          name="hour"
                          id="hour"
                          maxLength={2}
                          value={values.hour}
                          onChange={(e) =>
                            handleFormInput(e.target.value, false, "hour")
                          }
                          onBlur={(e) =>
                            handleFormInput(e.target.value, true, "hour")
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, () =>
                              handleFormInput(values.month, true, "hour")
                            )
                          }
                        />
                      </li>
                      <li className={`${styles["form__pick-item"]}`}>
                        <label htmlFor="minutes"></label>
                        <input
                          className={`${errors.minutes && styles["--error"]}`}
                          type="text"
                          placeholder="00"
                          name="minutes"
                          id="minutes"
                          maxLength={2}
                          value={values.minutes}
                          onChange={(e) =>
                            handleFormInput(e.target.value, false, "minutes")
                          }
                          onBlur={(e) =>
                            handleFormInput(e.target.value, true, "minutes")
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, () =>
                              handleFormInput(values.month, true, "minutes")
                            )
                          }
                        />
                      </li>
                      <li
                        className={`${styles["form__pick-item"]}`}
                        ref={selectRef}
                      >
                        <label htmlFor="timeAbbreviations"></label>
                        <select
                          required
                          name="timeAbbreviations"
                          id="timeAbbreviations"
                          value={values.timeAbbreviation}
                          onClick={() =>
                            selectRef.current?.classList.toggle(
                              `${styles["--active"]}`
                            )
                          }
                          onBlur={() =>
                            selectRef.current?.classList.remove(
                              `${styles["--active"]}`
                            )
                          }
                          onChange={(e) =>
                            setValues({
                              ...values,
                              timeAbbreviation: e.target.value,
                              hour: "",
                              minutes: "",
                            })
                          }
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                        <img src={dropDownArrow} alt="" />
                      </li>
                    </ul>
                  </div>
                  <div
                    className={`${styles["form__number-of-people-to-book-container"]}`}
                  >
                    <button
                      type="button"
                      disabled={counter === 0}
                      onClick={handleRemovePeople}
                      className={`${styles["form__manage-number-of-bookings-button"]}`}
                    >
                      -
                    </button>
                    <span
                      className={`${styles["form__number-of-people-to-book"]}`}
                    >
                      {counter} people
                    </span>
                    <button
                      type="button"
                      disabled={counter === 4}
                      onClick={handleAddPeople}
                      className={`${styles["form__manage-number-of-bookings-button"]}`}
                    >
                      +
                    </button>
                  </div>
                  <Button
                    buttonType="dark"
                    linkToBooking={false}
                    text="Make Reservation"
                    className={styles["form__button"]}
                  />
                </form>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Reservations;
