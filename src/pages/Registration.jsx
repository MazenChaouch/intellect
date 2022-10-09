import { Container } from "react-bootstrap"

import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import RegistrationForm from "../components/RegistrationForm"

const Registration = () => {

    document.title = "Inscription - Intellect Academy"

    return (
        <>
            <NavBar/>
            <Container className="my-5">
                <h1 className="text-center display-3">Inscription</h1>
                <RegistrationForm />
            </Container>

            <Footer />
        </>


    )
}
export default Registration