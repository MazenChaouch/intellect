import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap"
import { collection, limit, onSnapshot, query } from "firebase/firestore"
import { fireStore } from "../auth/Firebase"
import parse from 'html-react-parser';

const ExportFormations = (props) => {
    document.title = "Formations - Intellect Academy"

    const [formations, setFormations] = useState([])

    const getFormations = async () => {

        // If limit is not set, it will return all the documents
        const q = query(collection(fireStore, "formations"), limit(props.limit));
        const fetch = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const result = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
                setFormations(result);
            });
        });
    }


    useEffect(() => {
        getFormations();
    }, []);

    return (
        <>  
            <Row id="formations">
                {
                    formations.map((formation, index) => {
                        return (
                            <Col className="formation" md={4} key={index}>
                                <Card>
                                    <Card.Img variant="top" src={formation.image} />
                                    <Card.Body>
                                        <Card.Title>{formation.name}</Card.Title>
                                        <Card.Text>{parse(formation.description)}</Card.Text>
                                        <Link to={`/formation/${formation.id}`}><Button variant="primary">Voir les details</Button></Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    )
}

export default ExportFormations;