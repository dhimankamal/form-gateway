import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import Head from 'next/head'

function MyApp ({ Component, pageProps }) {
  return (
    <>
     <Head>
          <title>Form</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
     <div>
      <Navbar />
      <div>
      <Component {...pageProps} />
      </div>
     <Footer />
    </div>
    </>
   
  )
}

export default MyApp
