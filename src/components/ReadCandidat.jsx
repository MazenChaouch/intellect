import { FaTrash, FaEdit } from 'react-icons/fa'
import React from "react";
import { Button } from 'react-bootstrap';
const ReadCandidat = ({candidat,index,deleteCandidat}) => {
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
            <td><Button variant="info" ><FaEdit size={20} className="mb-1" /></Button></td>
            <td><Button variant="danger" onClick={ () => deleteCandidat(candidat.id)}><FaTrash size={20} className="mb-1" /></Button></td>
        </tr>


    )
}
export default ReadCandidat;