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
    <a href="/booking">
      <button className={buttonClass}>{text}</button>
    </a>
  ) : (
    <button className={buttonClass}>{text}</button>
  );
};

export default Button;
