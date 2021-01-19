import React from 'react'
import Header from './header/header'
import Footer from './footer/footer'

const Layout = (props) => {
    return (
        <React.Fragment>
            <Header {...props}/>
            <main>
                {props.children}
            </main>
            <Footer/>
        </React.Fragment>
    )
}

export default Layout