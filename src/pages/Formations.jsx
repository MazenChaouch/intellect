import { useEffect, useState } from "react"
import { Container, Row } from "react-bootstrap"
import ExportFormations from "../components/ExportFormations"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

import $ from 'jquery';

const Formations = () => {
    document.title = "Formations - Intellect Academy";

    useEffect(() => {
        $(document).ready(function(){
            $("#searchInput").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $("#formations .formation").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });
    })
    return (
        <>  
            <NavBar/>
            <Container className="my-5">
                <h1 className="text-center mb-5 display-3">Nos formations</h1>

                <input id="searchInput" type="text" className="form-control mb-5" placeholder="Taper quelque chose" />
                
                <Row>
                    <ExportFormations />
                </Row>
            </Container>
            <Footer/>
        </>
    )
}
export default Formations  