import React, {useEffect, useState} from "react";
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import './styles.css';
import api from "../../services/api";

export default function Profile(){
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const [incidents, setIncidents] = useState([])
    
    function loadIncidents(){
        api.get('/profile',{
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data)
        });
    }
    useEffect(loadIncidents,[ongId])

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    async function handleDeleteIncident(id){
        try{
            await api.delete(`/incidents/${id}`,{
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => (incident.id !== id)))
        }catch(err){
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>
            </header>

            <section>
                <h1>Casos cadastrados</h1>

                <ul>
                    { incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>Caso:</strong>
                            <p>{incident.title}</p>

                            <strong>Descrição</strong>
                            <p>{incident.description}</p>

                            <strong>Valor</strong>
                            <p>
                                {Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(incident.value)}
                            </p>

                            <button type="button" onClick={() => {handleDeleteIncident(incident.id)}}>
                                <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                            </button>
                        </li>
                    )) }
                </ul>
            </section>

        </div>
    );
}