import Head from 'next/head'
import React, {useState, useEffect} from "react";
import GoBack from "../../components/buttons/back";
import styles from "./accounts.module.scss";
import process from "../../next.config";


const Registered = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState({})

  const handleRegistered = () => {
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${process.env.address}/account/new`, requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log('error', err));
  }

  return (
    <div>
      <Head>
          <title>REGISTERED</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          <GoBack />
          <h3>REGISTERED</h3>
          <h4>最好不要使用和其他服务相同的密码....</h4>
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
          <button onClick={() => handleRegistered()} style={{ marginRight: `.5rem` }}>
            注册
          </button>
      </main>
    </div>
  )
}

export default Registered