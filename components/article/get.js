import React, { useEffect, useState } from "react"

const GetArticles = () => {
  const [articles, setArticles] = useState({})
  useEffect(() => {
    const token = localStorage.getItem("godis_login_token")
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`)

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://localhost:7000/api/v1/articles", requestOptions)
      .then(res => res.json())
      .then(res => {
        setArticles(res)
        console.log(res)
      })
      .catch(error => console.log('error', error));
  }, [])

  return (
    <div>
      {articles &&
        <div>
          <p>共有 {articles.article_lens} 条文章</p>
          {articles.articles && articles.articles.map((item, idx) => {
            return (
              <div key={idx}>
                <div>文章 ID：{item.object.id}</div>
                <div dangerouslySetInnerHTML={{__html: item.object.content}}/>
                <hr/>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}

export default GetArticles