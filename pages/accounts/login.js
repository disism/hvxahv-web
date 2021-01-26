import Head from 'next/head'
import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import styles from './accounts.module.scss'
import GoBack from "../../components/buttons/back";
import process from "../../next.config";

const Login = () => {
  const router = useRouter()
  const [username, setUsername] = useState("hvturingga")
  const [password, setPassword] = useState("123123")
  const [message, setMessage] = useState({})

  const handleLogin = () => {
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${process.env.address}/account/login`, requestOptions)
      .then(res => res.json())
      .then(res => {
        setMessage(res)
        localStorage.setItem("godis_login_token", res.token)
        // router.reload()
      })
      .catch(err => console.log('error', err));
  }

  useEffect(() => {
    const token = localStorage.getItem("godis_login_token")
    if (token !== null) {
      router.push("/iam")
    }
  }, [])

  return (
    <div>
      <Head>
        <title>LOGIN</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <GoBack />
        <h3>LOGIN</h3>
        <section className={styles.login}>
          <label htmlFor="username">USERNAME</label>
          <input type="text" placeholder="username" name="username"
                 value={username} onChange={e => setUsername(e.target.value)}
          />

          <label htmlFor="password">PASSWORD</label>
          <input type="password" placeholder="password" name="password"
                 value={password} onChange={e => setPassword(e.target.value)}
          />
        </section>
        <button onClick={() => handleLogin()} style={{ marginRight: `.5rem` }}>
          SUBMIT
        </button>
        <button onClick={() => router.push("/accounts/registered")}>
          REGISTERED
        </button>
        <p>{message && message.message}</p>
      </main>
    </div>
  )
}

export default Login