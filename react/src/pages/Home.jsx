import { Link } from "react-router-dom";
import { Container, Carousel, Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import RegistrationForm from "../components/RegistrationForm";
import { collection, onSnapshot, query } from "firebase/firestore";
import { fireStore } from "../auth/Firebase";
import { useEffect, useState } from "react";
import ExportFormations from "../components/ExportFormations";

const Home = () => {
  document.title = "Acceuil - Intellect Academy";

  const [formations, setFormations] = useState([]);

  const getFormations = async () => {
    const q = query(collection(fireStore, "formations"));
    const fetch = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const result = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setFormations(result);
      });
    });
  };

  useEffect(() => {
    getFormations();
  }, []);

  return (
    <>
      <NavBar />
      <Carousel>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://f.hellowork.com/helloworkplace/2019/02/formation-professionnelle.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://www.managementdelaformation.fr/wp-content/uploads/2019/03/RHEXIS_Actu_definition-action-de-formation_entete.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://www.hefp.swiss/sites/default/files/styles/original_max_3000/public/adobestock_247981615_numef_0.jpeg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <Container className="my-5">
        <h1 className="text-center">Qui sommes nous</h1>
        <p className="text-center">
          INTELLECT ACADEMY MT est un Institut de Formation Professionnelle et
          continue à Menzel temime agrée par l'état propose des formations 100%
          pratiques assurées par des professionnels et des experts dans divers
          domaines.
        </p>

        <hr className="my-4" />
        <h1 className="text-center mb-4">Nos Formations</h1>

        <ExportFormations limit={3} />

        <Link to="/formations">
          <Button className="mt-4">Voir plus</Button>
        </Link>

        <hr className="my-4" />
        <h1 className="text-center mb-4">Inscription</h1>

        <RegistrationForm />
      </Container>

      <Footer />
    </>
  );
};

export default Home;
