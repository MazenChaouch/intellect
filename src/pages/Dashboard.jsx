import { useLinkClickHandler, useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Modal, Navbar, Row, Table } from "react-bootstrap"
import { FaTrash, FaUsers, FaEdit } from 'react-icons/fa'
import { GiBookmarklet } from "react-icons/gi"
import { BsFillBookmarkPlusFill } from "react-icons/bs"
import { useUserAuth } from "../context/userAuthContext";
import { toast } from "react-toastify";
import generateId from "../lib/generateId";
import { collection, deleteDoc, doc, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { fireStore, storage } from "../auth/Firebase";
import { useState } from "react";
import ReactQuill from 'react-quill';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect } from "react";
import parse from 'html-react-parser';
import PhoneInput from "react-phone-number-input";
import { useRef } from "react";
import AuthCode from 'react-auth-code-input';
import { $, soap } from 'jquery';
const Dashboard = () => {

    document.title = "Dashboard - Intellect Academy";
    const [tempId, setTempId] = useState("");
    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = (d) => {
        setShow(true)
        setFirstname(d.firstname)
        setLastname(d.lastname)
        setEmail(d.email)
        setTel(d.tel)
        setFormation(d.formation)
        setSituation(d.situation)
        setCIN(d.cin)
        setCivilite(d.civilite)
        setNationalite(d.nationalite)
        setFacebook(d.facebook)
        setDateDeNaissance(d.dateDeNaissance)
        setLieuDeNaissance(d.lieuDeNaissance)
        setVille(d.ville)
        setCodePostal(d.codePostal)
        setTelParent(d.telParent)
        setNiveau(d.niveau)
        setDate(new Date())
        setTempId(d.id)
    }
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
    const [date, setDate] = useState();
    const [candidats, setCandidats] = useState([]);
    const [formations, setFormations] = useState([]);
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [formateur, setFormateur] = useState();
    const [price, setPrice] = useState();
    const [duration, setDuration] = useState();
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [formation, setFormation] = useState();
    const [civilite, setCivilite] = useState();
    const [situation, setSituation] = useState();
    const [nationalite, setNationalite] = useState("");
    const [facebook, setFacebook] = useState("");
    const [dateDeNaissance, setDateDeNaissance] = useState("");
    const [lieuDeNaissance, setLieuDeNaissance] = useState("");
    const [ville, setVille] = useState("");
    const [codePostal, setCodePostal] = useState("");
    const [telParent, setTelParent] = useState("");
    const [niveau, setNiveau] = useState("");
    const [cin, setCIN] = useState("");
    const [cinid, setCINID] = useState("");
    const [candidatbyid, setCandidatById] = useState([]);
    const [tab, setTab] = useState([]);
    const [sum, setSum] = useState("");
    const AuthInputRef = useRef(null);

    function validAlphabetLetter(letter) {
        return /^[a-zA-Z]$/.test(letter);
    }
    const submitRegistration = async (e) => {
        e.preventDefault();
        if
            (cin.length < 8 ||
            codePostal < 4 ||
            tel === "" ||
            telParent === "" ||
            dateDeNaissance === "" ||
            lieuDeNaissance === "" ||
            ville === "" ||
            niveau === "" ||
            firstname === "" ||
            lastname === "" ||
            email === "" ||
            formation === "" ||
            civilite === "" ||
            situation === "" ||
            nationalite === "" ||
            facebook === "") {
            toast.warning('Veuiller remplir tous les champs !', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if
            (validAlphabetLetter(lastname) ||
            validAlphabetLetter(firstname) ||
            validAlphabetLetter(ville) ||
            validAlphabetLetter(nationalite) ||
            validAlphabetLetter(lieuDeNaissance)
        ) {
            console.log("hi console")
            toast.warn('dont use number in alphabetic champs', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            try {
                await setDoc(doc(fireStore, "candidats", tempId), {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    tel: tel,
                    formation: formation,
                    situation: situation,
                    cin: cin,
                    civilite: civilite,
                    nationalite: nationalite,
                    facebook: facebook,
                    dateDeNaissance: dateDeNaissance,
                    lieuDeNaissance: lieuDeNaissance,
                    ville: ville,
                    codePostal: codePostal,
                    telParent: telParent,
                    niveau: niveau,
                    date: new Date()
                });
                setShow(false)
                toast.success('Candidat modifier!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setShow(false)
            } catch (e) {
                console.log(e)
            }
        }
    }
    const addFormation = async (e) => {
        e.preventDefault();

        let id = generateId();

        const storageRef = ref(storage, `formations/${id}`);

        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed',
            (snapshot) => {
                console.log(image);
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
            },
            () => {
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
    const getCandidatByCin = async () => {
        const q = query(collection(fireStore, "candidats"), where("cin" == "cinid"));
        const fetch = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const result = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setCandidatById(result);
            });
        });
    }
    const getPrix = () => {
        candidatbyid.map((c, index) => {
            tab.push(c.formation)
        })
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

    const deleteCandidat = (id) => {
        deleteDoc(doc(fireStore, "candidats", id))
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
    const Sum = () => {
        let $ = require('jquery');
        require('jquery.soap');
        $.soap({
            url: 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso',
            method: 'NumberToWords',
            appendMethodToURL: false,
            namespaceURL: 'https://www.dataaccess.com/webservicesserver/',

            data: {
                ubiNum: 14
            },

            success: function (soapResponse) {
                setSum(soapResponse);
            },
            error: function (SOAPResponse) {
                // show error
            }
        });
    }
    var settings = {
        "url": "https://www.dataaccess.com/webservicesserver/NumberConversion.wso",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "text/xml; charset=utf-8"
        },
        "data": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <soap:Body>\n    <NumberToWords xmlns=\"http://www.dataaccess.com/webservicesserver/\">\n      <ubiNum>500</ubiNum>\n    </NumberToWords>\n  </soap:Body>\n</soap:Envelope>",
      };
      let $ = require('jquery');
        require('jquery.soap');
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    return (
        <>
            <Navbar style={{ backgroundColor: "#110e66" }}>
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
                <Row>
                    <h2 className="mb-3 pt-5">total paiment d'une candidat</h2>
                    <Col sm={6}><input />{sum}</Col>
                    <Col sm={6}><Button onClick={() => Sum()}>Calcule</Button></Col>
                    <Col></Col>
                </Row>
                <h2 className="mb-3 pt-5"><FaUsers size={25} className="mb-1" /> Nos candidats</h2>
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
                            <th>Modifier</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            candidats.map((candidat, index) => {
                                return (
                                    <tr key={index} className="text-center">
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
                                        <td><Button variant="info" onClick={() => handleShow(candidat)}><FaEdit size={20} className="mb-1" /></Button></td>
                                        <td><Button variant="danger" onClick={() => deleteCandidat(candidat.id)}><FaTrash size={20} className="mb-1" /></Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>

                <h2 className="mb-3  pt-5"><GiBookmarklet size={25} className="mb-1" /> Nos formations</h2>
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
                                        <td><Button variant="danger" onClick={() => { deleteDoc(doc(fireStore, "formations", formation.id)) }}><FaTrash size={20} className="mb-1" /></Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </Table>

                <h2 className=" pt-5"><BsFillBookmarkPlusFill size={25} className="mb-1" /> Ajouter une formation</h2>

                <form className="row g-3 mt-2 rounded" onSubmit={addFormation} method="post">
                    <div className="col-md-6">
                        <label for="inputEmail4" className="form-label fw-bold">Nom</label>
                        <input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} className="form-control" placeholder="Entrer le nom de la formation" required />
                    </div>
                    <div className="col-md-6">
                        <label for="inputPassword4" className="form-label fw-bold">Formateur</label>
                        <input type="text" value={formateur} onChange={(e) => setFormateur(e.currentTarget.value)} className="form-control" placeholder="Entrer le nom du formateur" required />
                    </div>
                    <div className="col-md-6">
                        <label for="inputEmail4" className="form-label fw-bold">Prix</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.currentTarget.value)} className="form-control" placeholder="Entrer le prix de la formation" required />
                    </div>
                    <div className="col-md-6">
                        <label for="inputPassword4" className="form-label fw-bold">Duree</label>
                        <input type="number" value={duration} onChange={(e) => setDuration(e.currentTarget.value)} className="form-control" placeholder="Entrer la duree de la formation" required />
                    </div>
                    <div className="col-md-12">
                        <label for="inputPassword4" className="form-label fw-bold">Image</label>
                        <input class="form-control" onChange={e => setImage(e.target.files[0])} type="file" accept="image/*" required />
                    </div>
                    <div className="col-md-12">
                        <label for="inputState" className="form-label fw-bold">Description</label>
                        <ReactQuill value={description} onChange={setDescription} required />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Ajouter</button>
                    </div>
                </form>
            </Container>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
            ><Modal.Header closeButton></Modal.Header>
                <Modal.Body >
                    <form className="row g-3 mt-5 p-4 text-white rounded" onSubmit={submitRegistration} method="post" style={{
                        background: 'radial-gradient(circle, rgba(25,103,225,1) 0%, rgba(17,14,102,1) 100%)'
                    }}>


                        <h1 className="text-center display-3">Inscription</h1>
                        <div className="col-sm-3">
                            <label className="form-label fw-bold fw-bold">N° CIN</label>
                            <input type="text" value={cin} onChange={(e) => setCIN(e.currentTarget.value)} className="form-control" placeholder="Entrer votre CIN" required />
                        </div>

                        <div className="col-md-3">
                            <label for="inputPassword4" className="form-label fw-bold">Civilite</label>
                            <br />
                            <select className="form-select" value={civilite} onChange={(e) => setCivilite(e.currentTarget.value)} required>
                                <option selected disabled hidden>-- Choisir votre civilite --</option>
                                <option value="Monsieur">Monsieur</option>
                                <option value="Madame">Madame</option>
                                <option value="Mademoiselle">Mademoiselle</option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label for="inputPassword4" className="form-label fw-bold">Situation actuelle</label>
                            <br />
                            <select className="form-select" value={situation} onChange={e => setSituation(e.currentTarget.value)} required>
                                <option selected disabled hidden>-- Choisir votre situation actuelle --</option>
                                <option>A la recherche d'un emploi</option>
                                <option>Etudiant</option>
                                <option>Employe</option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label fw-bold size-lg">Niveau scolaire</label>
                            <input type="text" value={niveau} onChange={(e) => setNiveau(e.currentTarget.value)} className="form-control" placeholder="Entrer votre niveau scolaire" required />
                        </div>

                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label fw-bold">Nom</label>
                            <input type="text" value={firstname} onChange={(e) => setFirstname(e.currentTarget.value)} className="form-control" placeholder="Entrer votre nom" required />
                        </div>

                        <div className="col-md-6">
                            <label for="inputPassword4" className="form-label fw-bold">Prenom</label>
                            <input type="text" value={lastname} onChange={(e) => setLastname(e.currentTarget.value)} className="form-control" placeholder="Entrer votre prenom" required />
                        </div>
                        <div className="col-md-6">
                            <label for="inputPassword4" className="form-label fw-bold">Nationalite</label>
                            <input type="text" value={nationalite} onChange={(e) => setNationalite(e.currentTarget.value)} className="form-control" placeholder="Entrer votre Nationalite" required />
                        </div>
                        <div className="col-md-6">
                            <label for="inputPassword4" className="form-label fw-bold">Facebook</label>
                            <input type="text" value={facebook} onChange={(e) => setFacebook(e.currentTarget.value)} className="form-control" placeholder="Entrer votre compte facebook" required />
                        </div>
                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label fw-bold">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} className="form-control" placeholder="Entrer votre email" required />
                        </div>
                        <div className="col-md-6">
                            <label for="inputPassword4" className="form-label fw-bold">Ville</label>
                            <input type="text" value={ville} onChange={(e) => setVille(e.currentTarget.value)} className="form-control" placeholder="Entrer votre ville" required />
                        </div>

                        <div className="col-md-6">
                            <label for="inputPassword4" className="form-label fw-bold">Date de naissance</label>
                            <input type="date" className="form-control" value={dateDeNaissance} onChange={e => setDateDeNaissance(e.currentTarget.value)} required />

                        </div>
                        <div className="col-md-6">
                            <label for="inputPassword4" className="form-label fw-bold">Lieu de naissance</label>
                            <input type="text" value={lieuDeNaissance} onChange={(e) => setLieuDeNaissance(e.currentTarget.value)} className="form-control" placeholder="Entrer votre Lieu de naissance" required />
                        </div>

                        <div className="col-md-3">
                            <label for="inputPassword4" className="form-label fw-bold">Telephone</label>
                            <PhoneInput
                                defaultCountry="TN"
                                placeholder="Enter votre numero de telephone"
                                value={tel}
                                onChange={setTel}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label for="inputPassword4" className="form-label fw-bold">Telephone parent</label>
                            <PhoneInput
                                defaultCountry="TN"
                                placeholder="Enter le telephone de votre parent"
                                value={telParent}
                                onChange={setTelParent}
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            <label for="inputState" className="form-label fw-bold">Formation</label>
                            <select id="inputState" value={formation} onChange={(e) => setFormation(e.currentTarget.value)} className="form-select">
                                <option selected disabled hidden>-- Choisir une formation --</option>
                                {
                                    formations.map((formation, index) => {
                                        return <option tabIndex={index} value={formation.name}>{formation.name}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className="col-sm-3">
                            <label for="inputPassword4" className="form-label fw-bold">Code postal</label>
                            <input type="text" value={codePostal} onChange={(e) => setCodePostal(e.currentTarget.value)} className="form-control" placeholder="Entrer votre niveau scolaire" required />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-outline-light fw-bold">Modifier</button>
                            <Button className="btn btn-outline-light fw-bold" onClick={handleClose}>Close</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Dashboard;