import { useRef, useState } from "react";
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

  const handleMonthInput = (value: string, isBlur: boolean = false) => {
    // Pozostawia pustą wartość, jeśli użytkownik usuwa wszystko
    if (value === "") {
      setValues({ ...values, month: "" });
      return;
    }

    // Usuwa znaki inne niż cyfry
    value = value.replace(/\D/g, "");

    // Obsługa na `onBlur`
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

    setValues({ ...values, month: value });
  };

  const handleDayInput = (value: string, isBlur: boolean = false) => {
    // Pozostawia pustą wartość, jeśli użytkownik usuwa wszystko
    if (value === "") {
      setValues({ ...values, day: "" });
      return;
    }

    // Usuwa znaki inne niż cyfry
    value = value.replace(/\D/g, "");

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

    setValues({ ...values, day: value });
  };

  const handleHourInput = (value: string, isBlur: boolean = false) => {
    // Pozostawia pustą wartość, jeśli użytkownik usuwa wszystko
    if (value === "") {
      setValues({ ...values, hour: "" });
      return;
    }

    // Usuwa znaki inne niż cyfry
    value = value.replace(/\D/g, "");

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
        setValues({ ...values, hour: value });
      } else if (
        values.timeAbbreviation === "PM" &&
        (parseInt(value) === 1 ||
          parseInt(value) === 0 ||
          (parseInt(value) >= 1 && parseInt(value) <= 12))
      ) {
        setValues({ ...values, hour: value });
      }
      return;
    }

    setValues({ ...values, hour: value });
  };

  const handleMinutesInput = (value: string, isBlur: boolean = false) => {
    // Pozostawia pustą wartość, jeśli użytkownik usuwa wszystko
    if (value === "") {
      setValues({ ...values, minutes: "" });
      return;
    }

    // Usuwa znaki inne niż cyfry
    value = value.replace(/\D/g, "");

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

    setValues({ ...values, minutes: value });
  };

  const handleYearInput = (value: string, isBlur: boolean = false) => {
    // Pozostawia pustą wartość, jeśli użytkownik usuwa wszystko
    if (value === "") {
      setValues({ ...values, year: "" });
      return;
    }
    // Usuwa znaki inne niż cyfry
    value = value.replace(/\D/g, "");

    // Obsługa na `onBlur`
    if (isBlur) {
      if (value !== "2025" && value !== "2026" && value !== "") {
        //Jeśli wartości są różne niż 2025 i 2026 wtedu ustawi 2025, aktualny rok
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
    setValues({ ...values, year: value });
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
          <>
            <div className={`wrapper ${styles["reservation"]}`}>
              <img
                className={`${styles["reservation__pattern-curve"]}`}
                src={patternCurveBottomRight}
                alt="pattern-curve"
              />
              <div className={`${styles["reservation__form-container"]}`}>
                <img
                  className={`${styles["reservation__pattern-lines"]}`}
                  src={patternLines}
                  alt="patterin-lines"
                />
                <form
                  onSubmit={handleSubmit}
                  className={` ${styles["form"]}`}
                  action=""
                >
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
                          onChange={(e) => handleMonthInput(e.target.value)}
                          onBlur={(e) => handleMonthInput(e.target.value, true)}
                          onKeyDown={(e) =>
                            handleKeyDown(e, () =>
                              handleMonthInput(values.month, true)
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
                          onChange={(e) => handleDayInput(e.target.value)}
                          onBlur={(e) => handleDayInput(e.target.value, true)}
                          onKeyDown={(e) =>
                            handleKeyDown(e, () =>
                              handleDayInput(values.day, true)
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
                          onChange={(e) => handleYearInput(e.target.value)}
                          onBlur={(e) => handleYearInput(e.target.value, true)}
                          onKeyDown={(e) =>
                            handleKeyDown(e, () =>
                              handleYearInput(values.year, true)
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
                          onChange={(e) => handleHourInput(e.target.value)}
                          onBlur={(e) => handleHourInput(e.target.value, true)}
                          onKeyDown={(e) =>
                            handleKeyDown(e, () =>
                              handleHourInput(values.hour, true)
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
                          onChange={(e) => handleMinutesInput(e.target.value)}
                          onBlur={(e) =>
                            handleMinutesInput(e.target.value, true)
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, () =>
                              handleMinutesInput(values.minutes, true)
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
                  <button
                    type="submit"
                    className={`btn --dark ${styles["form__button"]}`}
                  >
                    Make Reservation
                  </button>
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
