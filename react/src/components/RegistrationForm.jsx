import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import AuthCode from 'react-auth-code-input';

import { collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import { fireStore } from "../auth/Firebase";

import { toast } from 'react-toastify';
import generateId from "../lib/generateId";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'

const RegistrationForm = () => {

    const navigate = useNavigate();

    const [formations, setFormations] = useState([])

    const getFormations = async () => {

        // If limit is not set, it will return all the documents
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
        getFormations();
    }, []);
    function validAlphabetLetter(letter) {
        return /^[a-zA-Z]$/.test(letter);
    }

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
    const [cin, setCIN] = useState('');

    const AuthInputRef = useRef(null);

    const submitRegistration = async (e) => {
        e.preventDefault();

        let id = generateId();

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
            facebook === "")
        {
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
            ) 
        {
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
                await setDoc(doc(fireStore, "candidats", id), {
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
                    id: id,
                    date: new Date()
                });

                toast.success('Registration succsess!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                navigate("/");

            } catch (e) {
                console.log(e)
            }
        }

    }

    return (
        <form className="row g-3 mt-5 p-4 text-white rounded" onSubmit={submitRegistration} method="post" style={{
            background: 'radial-gradient(circle, rgba(25,103,225,1) 0%, rgba(17,14,102,1) 100%)'
        }}>
            <div className="col-sm-3">
                <label className="form-label fw-bold fw-bold">N° CIN</label>
                <AuthCode
                    key={'numeric'}
                    allowedCharacters={'numeric'}
                    ref={AuthInputRef}
                    onChange={setCIN}
                    inputClassName='input'
                    length={8}
                    isPassword={false}
                    autoFocus={false}
                />
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
                <input type="text" value={niveau} onChange={(e) => setNiveau(e.currentTarget.value)} className="form-control" placeholder="Entrer votre niveau scolaire" required/>
            </div>

            <div className="col-md-6">
                <label for="inputEmail4" className="form-label fw-bold">Nom</label>
                <input type="text" value={firstname} onChange={(e) => setFirstname(e.currentTarget.value)} className="form-control" placeholder="Entrer votre nom" required/>
            </div>

            <div className="col-md-6">
                <label for="inputPassword4" className="form-label fw-bold">Prenom</label>
                <input type="text" value={lastname} onChange={(e) => setLastname(e.currentTarget.value)} className="form-control" placeholder="Entrer votre prenom" required/>
            </div>
            <div className="col-md-6">
                <label for="inputPassword4" className="form-label fw-bold">Nationalite</label>
                <input type="text" value={nationalite} onChange={(e) => setNationalite(e.currentTarget.value)} className="form-control" placeholder="Entrer votre Nationalite" required/>
            </div>
            <div className="col-md-6">
                <label for="inputPassword4" className="form-label fw-bold">Facebook</label>
                <input type="text" value={facebook} onChange={(e) => setFacebook(e.currentTarget.value)} className="form-control" placeholder="Entrer votre compte facebook" required/>
            </div>
            <div className="col-md-6">
                <label for="inputEmail4" className="form-label fw-bold">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} className="form-control" placeholder="Entrer votre email" required/>
            </div>
            <div className="col-md-6">
                <label for="inputPassword4" className="form-label fw-bold">Ville</label>
                <input type="text" value={ville} onChange={(e) => setVille(e.currentTarget.value)} className="form-control" placeholder="Entrer votre ville" required/>
            </div>

            <div className="col-md-6">
                <label for="inputPassword4" className="form-label fw-bold">Date de naissance</label>
                <input type="date" className="form-control" value={dateDeNaissance} onChange={e => setDateDeNaissance(e.currentTarget.value)} required/>

            </div>
            <div className="col-md-6">
                <label for="inputPassword4" className="form-label fw-bold">Lieu de naissance</label>
                <input type="text" value={lieuDeNaissance} onChange={(e) => setLieuDeNaissance(e.currentTarget.value)} className="form-control" placeholder="Entrer votre Lieu de naissance" required/>
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
                <AuthCode
                    key={'numeric'}
                    allowedCharacters={'numeric'}
                    ref={AuthInputRef}
                    onChange={setCodePostal}
                    inputClassName='input'
                    length={4}
                    isPassword={false}
                    autoFocus={false}
                />
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-outline-light fw-bold">S'inscrire</button>
            </div>
        </form>
    )
}

export default RegistrationForm