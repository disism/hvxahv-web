import React, { useEffect, useState } from "react"
import { Logged, NoLogged } from "../components/menu/main";
import Link from "next/link";
import styles from './layout.module.scss'
import {useRouter} from "next/router";


const Header = () => {
  const router = useRouter()
  const [login, setLogin] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("godis_login_token")
    if (token === null) {
      setLogin(false)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("godis_login_token")
    router.reload()
    router.push("/")
  }
  return (
    <div style={{ margin: `1rem`}}>
      <div className={styles.header}>
        {login ?
          <div className={styles.menu}>
            {Logged.map((item, idx) => {
              return <li key={idx}><Link href={item.address}>{item.name}</Link></li>
            })}
            <li style={{ cursor: `pointer` }} onClick={() => handleLogout()}>Logout</li>
          </div>
          :
          <div className={styles.menu}>
            {NoLogged.map((item, idx) => {
              return <li key={idx}><Link href={item.address}>{item.name}</Link></li>
            })}
          </div>
        }
      </div>
    </div>
  )
}
export default Header
