import Head from 'next/head'
import React, { useState } from "react"
import styles from './new.module.scss'

const NewArticle = () => {
  const [text, setText] = useState("这是我发布的内容")
  const handleNewArticle = () => {
    const token = localStorage.getItem("godis_login_token")
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const formdata = new FormData();
    formdata.append("content", `<div>${text}</div>`);
    formdata.append("type", "status");

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://localhost:7000/api/v1/article/new", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  return (
    <div>
      <Head>
        <title>New Article</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>New Article</h1>

        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button onClick={() => handleNewArticle()}>New</button>

      </main>
    </div>
  )
}

export default NewArticle