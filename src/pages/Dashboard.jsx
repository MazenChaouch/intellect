import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Navbar, Row, Table } from "react-bootstrap"
import { FaTrash, FaUsers } from 'react-icons/fa'
import { GiBookmarklet } from "react-icons/gi"
import { BsFillBookmarkPlusFill } from "react-icons/bs"
import { useUserAuth } from "../context/userAuthContext";
import { toast } from "react-toastify";
import generateId from "../lib/generateId";
import { collection, deleteDoc, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import { fireStore, storage } from "../auth/Firebase";
import { useState } from "react";
import ReactQuill from 'react-quill';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect } from "react";
import parse from 'html-react-parser';

const Dashboard = () => {
    
    document.title = "Dashboard - Intellect Academy";

    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
            await logOut();
            navigate("../login");
        } catch (error) {
            console.log(error.message);
        }
    };

    if (!user) {
        navigate("../login");
    }

    const [candidats, setCandidats] = useState([]);
    const [formations, setFormations] = useState([]);

    const [name, setName] = useState("");
    const [formateur, setFormateur] = useState();
    const [price, setPrice] = useState();
    const [duration, setDuration] = useState();
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const addFormation = async (e) => {
        e.preventDefault();

        let id = generateId();

        const storageRef = ref(storage, `formations/${id}`);

        const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                        break;

                        case 'running':
                            console.log('Upload is running');
                        break;

                        default:
                            console.log('Upload is in progress');
                    }
                }, 
                (error) => {
                    console.log(error);
                    // Handle unsuccessful uploads
                }, 
                () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await setDoc(doc(fireStore, "formations", id), {
                        name: name,
                        formateur: formateur,
                        price: price,
                        duration: duration,
                        description: description,
                        id: id,
                        image: downloadURL,
                        date: new Date() 
                    });
            
                    toast.success('Formation ajoutee', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    setName("");
                    setFormateur("");
                    setPrice("");
                    setDuration("");
                    setDescription("");
                    setImage(null);

                });
            }
        );
    }

    const getCandidats = async () => {
        const q = query(collection(fireStore, "candidats"));
        const fetch = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const result = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
                setCandidats(result);
            });
        });
    }

    const getFormations = async () => {
        const q = query(collection(fireStore, "formations"));
        const fetch = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const result = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
                setFormations(result);
            });
        });
    }


    useEffect(() => {
        getCandidats();
        getFormations();
    }, [])

    var myDate = new Date();
    var hrs = myDate.getHours();

    var greet;

    if (hrs < 12)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';

    return (
        <>
            <Navbar style={{backgroundColor: "#110e66"}}>
                <Container>
                    <Navbar.Brand><a href="/" className="text-white fw-bold text-decoration-none" target="_blank" rel="noopener noreferrer">Intellect Academy</a></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Button variant="outline-light" className="fw-bold" onClick={handleLogout}>Déconnexion</Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="p-2">
                <h1 className="display-4 p-5 text-center">{greet}</h1>

                <Row className="my-4">
                    <Col sm={6}>
                        <Card border="primary">
                            <Card.Header>Candidats</Card.Header>
                            <Card.Body>
                            <Card.Title className="display-5">Nous avons {candidats.length} candidat{candidats.length > 1 && "s"}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm={6}>
                        <Card border="danger">
                            <Card.Header>Formations</Card.Header>
                            <Card.Body>
                                <Card.Title className="display-5">Nous avons {formations.length} formation{formations.length > 1 && "s"} </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <h2 className="mb-3"><FaUsers size={25} className="mb-1" /> Nos candidats</h2>
                <Table striped bordered hover size="sm" responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>N° CIN</th>
                            <th>Civilite</th>
                            <th>Situation actuelle</th>
                            <th>Niveau scolaire</th>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Nationalite</th>
                            <th>Facebook</th>
                            <th>Email</th>
                            <th>Ville</th>
                            <th>Date de naissance</th>
                            <th>Lieu de naissance</th>
                            <th>Telephone</th>
                            <th>Telephone parent</th>
                            <th>Formation</th>
                            <th>Code postal</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            candidats.map((candidat, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{candidat.cin}</td>
                                        <td>{candidat.civilite}</td>
                                        <td>{candidat.situation}</td>
                                        <td>{candidat.niveau}</td>
                                        <td>{candidat.firstname}</td>
                                        <td>{candidat.lastname}</td>
                                        <td>{candidat.nationalite}</td>
                                        <td>{candidat.facebook}</td>
                                        <td>{candidat.email}</td>
                                        <td>{candidat.ville}</td>
                                        <td>{candidat.dateDeNaissance}</td>
                                        <td>{candidat.lieuDeNaissance}</td>
                                        <td>{candidat.tel}</td>
                                        <td>{candidat.telParent}</td>
                                        <td>{candidat.formation}</td>
                                        <td>{candidat.codePostal}</td>
                                        <td><Button variant="danger" onClick={() => {deleteDoc(doc(fireStore, "candidats", candidat.id))}}><FaTrash /></Button></td>
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </Table>

                <h2 className="mb-3"><GiBookmarklet size={25} className="mb-1" /> Nos formations</h2>
                <Table striped bordered hover size="sm" >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Formateur</th>
                            <th>Prix</th>
                            <th>Duree</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            formations.map((formation, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{formation.name}</td>
                                        <td>{parse(formation.description)}</td>
                                        <td>{formation.formateur}</td>
                                        <td>{formation.price}DT</td>
                                        <td>{formation.duration}H</td>
                                        <td><Button variant="danger" onClick={() => {deleteDoc(doc(fireStore, "formations", formation.id))}}><FaTrash /></Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </Table>

                <h2><BsFillBookmarkPlusFill  size={25} className="mb-1" /> Ajouter une formation</h2>

                <form className="row g-3 mt-2 rounded" onSubmit={addFormation} method="post">
                    <div className="col-md-6">
                        <label for="inputEmail4" className="form-label fw-bold">Nom</label>
                        <input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} className="form-control" placeholder="Entrer le nom de la formation" />
                    </div>
                    <div className="col-md-6">
                        <label for="inputPassword4" className="form-label fw-bold">Formateur</label>
                        <input type="text" value={formateur} onChange={(e) => setFormateur(e.currentTarget.value)} className="form-control" placeholder="Entrer le nom du formateur" />
                    </div>
                    <div className="col-md-6">
                        <label for="inputEmail4" className="form-label fw-bold">Prix</label>
                        <input type="number"value={price} onChange={(e) => setPrice(e.currentTarget.value)} className="form-control" placeholder="Entrer le prix de la formation" />
                    </div>
                    <div className="col-md-6">
                        <label for="inputPassword4" className="form-label fw-bold">Duree</label>
                        <input type="number" value={duration} onChange={(e) => setDuration(e.currentTarget.value)} className="form-control" placeholder="Entrer la duree de la formation" />
                    </div>
                    <div className="col-md-12">
                        <label for="inputPassword4" className="form-label fw-bold">Image</label>
                        <input class="form-control" onChange={e => setImage(e.target.files[0])} type="file" accept="image/*" />
                    </div>
                    <div className="col-md-12">
                        <label for="inputState" className="form-label fw-bold">Description</label>
                        <ReactQuill value={description} onChange={setDescription} />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Ajouter</button>
                    </div>
                </form>
            </Container>
        </>
    )
}

export default Dashboard;