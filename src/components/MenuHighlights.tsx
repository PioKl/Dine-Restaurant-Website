import styles from "../styles/menuHighlights.module.scss";
import patternDivide from "../assets/patterns/pattern-divide.svg";

import salmonDesktopTablet from "../assets/images/homepage/salmon-desktop-tablet@2x.jpg";
import salmonMobile from "../assets/images/homepage/salmon-mobile@2x.jpg";
import beefDesktopTablet from "../assets/images/homepage/beef-desktop-tablet@2x.jpg";
import beefMobile from "../assets/images/homepage/beef-mobile@2x.jpg";
import chocolateDesktopTablet from "../assets/images/homepage/chocolate-desktop-tablet@2x.jpg";
import chocolateMobile from "../assets/images/homepage/chocolate-mobile@2x.jpg";

export default function MenuHighlights() {
  return (
    <section className={`wrapper ${styles["menu-section"]}`}>
      <div className={`${styles["description-container"]}`}>
        <img
          className={`${styles["description-container__image"]}`}
          src={patternDivide}
          alt="pattern-divide"
        />
        <h2 className={`${styles["description-container__heading"]}`}>
          A few highlights from our menu
        </h2>
        <p className={`${styles["description-container__description"]}`}>
          We cater for all dietary requirements, but here’s a glimpse at some of
          our diner’s favourites. Our menu is revamped every season.
        </p>
      </div>
      <div className={`${styles["menu-container"]}`}>
        <ul className={`${styles["menu-container__items-list"]}`}>
          <li className={`${styles["menu-container__item"]}`}>
            <picture className={`${styles["menu-container__item-picture"]}`}>
              <source media="(min-width: 768px)" srcSet={salmonDesktopTablet} />
              <img src={salmonMobile} alt="picture of the dish" />
            </picture>
            <div
              className={`${styles["menu-container__item-description-container"]}`}
            >
              <h3 className={`${styles["menu-container__item-heading"]}`}>
                Seared Salmon Fillet
              </h3>
              <p className={`${styles["menu-container__item-description"]}`}>
                Our locally sourced salmon served with a refreshing buckwheat
                summer salad.
              </p>
            </div>
          </li>
          <li className={`${styles["menu-container__item"]}`}>
            <picture className={`${styles["menu-container__item-picture"]}`}>
              <source media="(min-width: 768px)" srcSet={beefDesktopTablet} />
              <img src={beefMobile} alt="picture of the dish" />
            </picture>
            <div
              className={`${styles["menu-container__item-description-container"]}`}
            >
              <h3 className={`${styles["menu-container__item-heading"]}`}>
                Rosemary Filet Mignon
              </h3>
              <p className={`${styles["menu-container__item-description"]}`}>
                Our prime beef served to your taste with a delicious choice of
                seasonal sides.
              </p>
            </div>
          </li>
          <li className={`${styles["menu-container__item"]}`}>
            <picture className={`${styles["menu-container__item-picture"]}`}>
              <source
                media="(min-width: 768px)"
                srcSet={chocolateDesktopTablet}
              />
              <img src={chocolateMobile} alt="picture of the dish" />
            </picture>
            <div
              className={`${styles["menu-container__item-description-container"]}`}
            >
              <h3 className={`${styles["menu-container__item-heading"]}`}>
                Summer Fruit Chocolate Mousse
              </h3>
              <p className={`${styles["menu-container__item-description"]}`}>
                Creamy mousse combined with summer fruits and dark chocolate
                shavings.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
