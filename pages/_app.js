import '../styles/globals.scss'
import Layout from "../lazyout";
import { motion } from "framer-motion"

const App = ({ Component, pageProps, router }) => {
  const ani = {
    pageInitial: {
      y: -200,
      opacity: 0
    },
    pageAnimate: {
      y: 0,
      opacity: 1
    },
  }

  return (
    <Layout>
      <motion.div key={router.route}
        initial="pageInitial"
        animate="pageAnimate"
        variants={ani}
      >
        <Component {...pageProps} />
      </motion.div>
    </Layout>
  )
}

export default App
