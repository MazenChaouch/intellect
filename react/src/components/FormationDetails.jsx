import { Link, useParams } from "react-router-dom";
import { Container, Table, Col, Button, Row } from "react-bootstrap";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { fireStore } from "../auth/Firebase";
import parse from "html-react-parser";
import { FaChalkboardTeacher, FaPlus, FaRegClock } from "react-icons/fa";
import { RiMoneyDollarBoxLine } from "react-icons/ri";

const FormationDetails = () => {
  let { formationId } = useParams();

  const [formation, setFormation] = useState({});

  const fetchDetails = async () => {
    const docRef = doc(fireStore, "formations", formationId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setFormation(docSnap.data());
    } else {
      alert("No such document!");
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  document.title = `${formation.name} - Intellect Academy`;

  return (
    <>
      <NavBar />
      <img src={formation.image} className="w-100" alt="" />
      <Container className="py-5">
        <Row>
          <h1>{formation.name}</h1>
          <Col sm={6}>
            <h3 className="fw-normal font-monospace mt-3">
              {formation.description && parse(formation.description)}
            </h3>
          </Col>

          <Col sm={6} className="mt-4">
            <Table striped bordered hover size="md">
              <tbody>
                <tr>
                  <td>
                    <FaChalkboardTeacher /> Formateur
                  </td>
                  <td>{formation.formateur}</td>
                </tr>
                <tr>
                  <td>
                    <FaRegClock /> Durée
                  </td>
                  <td>{formation.duration}H</td>
                </tr>
                <tr>
                  <td>
                    <RiMoneyDollarBoxLine /> Prix
                  </td>
                  <td>{formation.price} DT</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Link to={"/registration"}>
          <Button variant="outline-primary" size="lg" className="fw-bold">
            <FaPlus size={15} className="mb-1" /> S'inscrire maintenant
          </Button>
        </Link>
      </Container>
      <Footer />
    </>
  );
};

export default FormationDetails;
