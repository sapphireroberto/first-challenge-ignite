import styles from  './Header.module.css'

import rocketLogo from "../assets/rocket.svg"

export function Header() {
  return(
    <header className={styles.header}>
      <img src={rocketLogo} alt="Logotipo rocket" />
      <h1>to<span>do</span></h1>
    </header>
  )
}