import "../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Header({ toggleTheme, theme }) {
  const links = [
    { name: "HOME", path: "/" },
    { name: "QUESTIONS", path: "/questions" },
    { name: "ABOUT", path: "/about" },
  ];

  return (
    <div className="header">
      <div className="linksContainer">
        <Image
          src="/question.jpg"
          width={50}
          height={50}
          alt="Question"
          className="logo"
        />
        {links.map((item) => (
          <Link key={item.name} href={item.path} className="link">
            {item.name}
          </Link>
        ))}
      </div>

      <div onClick={toggleTheme} className="theme-toggle-button btn">
        {theme === "light" ? (
          <FaSun className="icon" />
        ) : (
          <FaMoon className="icon" />
        )}{" "}
        {/* Toggle icon */}
      </div>
    </div>
  );
}
