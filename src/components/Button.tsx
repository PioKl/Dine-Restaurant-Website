import { Link } from "react-router-dom";

interface ButtonProps {
  buttonType: "normal" | "light" | "dark";
  linkToBooking: boolean;
  text: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  buttonType,
  linkToBooking,
  text,
  className,
}) => {
  const buttonClass = `btn ${
    buttonType !== "normal" ? `--${buttonType}` : ""
  } ${className || ""}`;
  return linkToBooking ? (
    <Link
      to="/booking"
      className={buttonClass}
      role="link"
      aria-label="Go to booking"
    >
      {text}
    </Link>
  ) : (
    <button className={buttonClass}>{text}</button>
  );
};

export default Button;
