import React from "react";

const Footer = () => {
  return (
    <footer style={{ padding: `1rem` }}>
      Godis · Hvxahv © {new Date().getFullYear()}, Powered by {' '}
      <a href="https://disism.com" target="_blank" rel="noopener noreferrer">
        disism.com
      </a>
    </footer>
  )
}

export default Footer