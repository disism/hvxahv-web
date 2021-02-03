import Head from 'next/head'
import React, { useState, useEffect } from "react";
import Loading from "../../components/loading";
import process from "../../next.config";
import { useRouter } from "next/router";
import styles from "./inbox.module.scss"
const Inbox = () => {
  const router = useRouter()
  const [inbox, setInbox] = useState({
    inbox: []
  })
  const [loading, setLoading] = useState(true)
  const [follow, serFollow] = useState({})
  useEffect(() => {
    const token = localStorage.getItem("godis_login_token")
    if (token === null) {
      router.push("/accounts/login")
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${process.env.address}/api/v1/inbox`, requestOptions)
      .then(res => res.json())
      .then(res => {
        setInbox(res)
        console.log(res)
        setLoading(false)
      })
      .catch(error => console.log('error', error));
  }, [])

  const handleAccept = (ctxID, actor) => {
    const myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("godis_login_token")}`);

    const formdata = new FormData()
    formdata.append("actor", actor)
    formdata.append("id", ctxID)

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    }

    fetch(`${process.env.address}/api/v1/followers/accept`, requestOptions)
      .then(res => res.json())
      .then(res => {
        serFollow(res)
        console.log(res)
      })
      .catch(error => console.log('error', error))

  }

  return (
    <div>
      <Head>
        <title>Inbox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {loading ? <Loading /> :
        <div>
          <span>{follow.message && follow.message === "ok" ? <div className={styles.notice}>同意成功 </div> : null}</span>
          {inbox.inbox && inbox.inbox.map((item, idx) => {
            return (
              <div key={idx}>
                <div>
                  Notice: {item.Name}
                  {item.EventType === "follow" ?
                    <div>
                      <span>Notice: "关注了您"</span>
                      <button onClick={() => handleAccept(item.RequestId, item.Actor)}>同意</button>
                    </div>
                    :
                    null}
                </div>
              </div>
            )
          })}
        </div>
        }
      </main>
    </div>
  )
}

export default Inbox