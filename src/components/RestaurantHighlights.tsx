import styles from "../styles/restaurantHighlights.module.scss";

import patternDivide from "../assets/patterns/pattern-divide.svg";
import patternLines from "../assets/patterns/pattern-lines.svg";

import enjoyableDesktop from "../assets/images/homepage/enjoyable-place-desktop.jpg";
import enjoyableTablet from "../assets/images/homepage/enjoyable-place-tablet.jpg";
import enjoyableMobile from "../assets/images/homepage/enjoyable-place-mobile.jpg";

import locallySourcedDesktop from "../assets/images/homepage/locally-sourced-desktop.jpg";
import locallySourcedTablet from "../assets/images/homepage/locally-sourced-tablet.jpg";
import locallySourcedMobile from "../assets/images/homepage/locally-sourced-mobile.jpg";

import familyDesktop from "../assets/images/homepage/family-gathering-desktop@2x.jpg";
import familyTablet from "../assets/images/homepage/family-gathering-tablet@2x.jpg";
import familyMobile from "../assets/images/homepage/family-gathering-mobile@2x.jpg";

//import patternCurveBottomRight from "../assets/patterns/pattern-curve-bottom-right.svg";
import patternCurveTopLeft from "../assets/patterns/pattern-curve-top-left.svg";
import patternCurveTopRight from "../assets/patterns/pattern-curve-top-right.svg";

interface RestaurantHighlightsProps {
  option: "first" | "second" | "third";
  heading: string;
  description: string;
  menuOptions?: string[];
}

const images: Record<
  "desktop" | "tablet" | "mobile",
  Record<RestaurantHighlightsProps["option"], string>
> = {
  desktop: {
    first: enjoyableDesktop,
    second: locallySourcedDesktop,
    third: familyDesktop,
  },
  tablet: {
    first: enjoyableTablet,
    second: locallySourcedTablet,
    third: familyTablet,
  },
  mobile: {
    first: enjoyableMobile,
    second: locallySourcedMobile,
    third: familyMobile,
  },
};

const curvePatterns: Record<RestaurantHighlightsProps["option"], string> = {
  first: patternCurveTopRight,
  second: patternCurveTopLeft,
  third: patternCurveTopRight,
};

const RestaurantHighlights: React.FC<RestaurantHighlightsProps> = ({
  option,
  heading,
  description,
  menuOptions,
}) => {
  return (
    <>
      <section
        className={`wrapper ${styles["restaurant-highlights"]} ${
          styles[`--${option}`]
        }`}
      >
        <div
          className={`${styles["pattern-curve-wrapper"]} ${
            styles[`--${option}`]
          }`}
        >
          <img
            className={`${styles["pattern-curve-wrapper__image"]} ${
              styles[`--${option}`]
            }`}
            src={curvePatterns[option]}
            alt="pattern-curve"
          />
        </div>

        <div
          className={`${styles["image-container"]} ${styles[`--${option}`]} ${
            (option === "second" || option === "third") &&
            styles["--alternative"]
          }`}
        >
          {(option === "second" || option === "third") && (
            <img
              className={`${styles["image-container__pattern-lines"]} ${
                styles[`--${option}`]
              }`}
              src={patternLines}
              alt="pattern-lines"
            />
          )}
          <picture className={`${styles["image-container__image"]}`}>
            <source
              media="(min-width: 1110px)"
              srcSet={images["desktop"][option]}
            />
            <source
              media="(min-width: 768px)"
              srcSet={images["tablet"][option]}
            />
            <img src={images["mobile"][option]} alt="section-image" />
          </picture>
        </div>
        <div
          className={`${styles["description-container"]} ${
            styles[`--${option}`]
          } ${
            (option === "second" || option === "third") &&
            styles["--alternative"]
          }`}
        >
          {option !== "third" && (
            <img
              className={`${styles["description-container__pattern-divide"]}`}
              src={patternDivide}
              alt="pattern-divide"
            />
          )}
          <h2
            className={`${styles["description-container__heading"]} ${
              styles[`--${option}`]
            }`}
          >
            {heading}
          </h2>
          <p
            className={`${styles["description-container__description"]} ${
              styles[`--${option}`]
            }`}
          >
            {description}
          </p>
          {option === "third" && (
            <button
              className={`btn --light ${styles["description-container__book-table-button"]}`}
            >
              Book a Table
            </button>
          )}
          {option === "third" && menuOptions && (
            <ul
              className={`${styles["description-container__events-buttons-items-list"]}`}
            >
              {menuOptions.map((item, index) => (
                <li
                  key={index}
                  className={`${styles["description-container__event-button-item"]}`}
                >
                  <button
                    className={`${
                      styles["description-container__event-button"]
                    }  ${styles[`--active`]}`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default RestaurantHighlights;
