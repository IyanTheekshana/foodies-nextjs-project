import logoImg from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import MainHeaderBg from "./main-header-bg";
import classes from "./main-header.module.css";
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBg></MainHeaderBg>
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image src={logoImg} alt="A plate with foot on it." property />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>

            <li>
              <NavLink href="/community"> Foodie Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
