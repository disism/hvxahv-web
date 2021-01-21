import React from "react"
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ margin: `1rem`}}>
          {children}
      </div>
      <Footer />
    </>
  )
}
export default Layout
