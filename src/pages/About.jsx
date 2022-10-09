import { Link } from "react-router-dom"
import { Container } from "react-bootstrap"

import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

const About = () => {
    document.title = "A propos - Intellect Academy"
    return (
        <>
            <NavBar/>
            <Container className="my-5"></Container>
            
            <Footer/>
        </>
    )
}
export default About