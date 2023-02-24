import React from 'react'
import Footer from './Footer'
import Header from './Header'
import AlertPopup from './AlertaPopup'

const Layout = ({children}) => {
  return (
    <section className="container">
        <AlertPopup />
        <Header />
        <main className="Content">{children}</main>
        <Footer />
    </section>
  )
}

export default Layout