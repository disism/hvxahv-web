import React, { useEffect, useState } from "react";

const Following = () => {
  const [follower, setFollower] = useState({})
  useEffect(() => {
    const token = localStorage.getItem("godis_login_token")
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://localhost:7000/api/v1/following", requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setFollower(res)
      })
      .catch(err => console.log('error', err));
  }, [])

  return (
    <div>
      {follower &&
      <div>
        <div>被关注数：{follower.count}</div>
        <div>
          {follower.res && follower.res.map((item, idx) => {
            return (
              <div key={idx}>
                {item}
              </div>
            )
          })}
        </div>
      </div>
      }
    </div>
  )
}

export default Following