import Head from 'next/head'
import React, { useState, useEffect } from "react";
import Loading from "../../components/loading";
import process from "../../next.config";
import { useRouter } from "next/router";
import Follower from "../../components/follow/follower"
import Following from "../../components/follow/following";

// TODO ADD GET FOLLOWER AND FOLLOWING FUNCTION
const IAm = () => {
  const router = useRouter()
  const [accounts, setAccounts] = useState({})
  const [loading, setLoading] = useState(true)

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

    fetch(`${process.env.address}/api/v1/account/i`, requestOptions)
      .then(res => res.json())
      .then(res => {
        setAccounts(res)
        console.log(res)
        setLoading(false)
      })

      .catch(error => console.log('error', error));
  }, [])

  return (
    <div>
      <Head>
        <title>IAm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {loading ? <Loading /> :
          <div>
            <h1>IAm</h1>
            { accounts &&
            <div>
              <h2>{accounts.name} </h2>
              <Follower /> · <Following />
            </div>
            }
          </div>
        }

      </main>
    </div>
  )
}

export default IAm