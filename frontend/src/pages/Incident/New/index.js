import React, {useState} from 'react'

import './styles.css'
import logoImg from '../../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../../services/api';

export default function IncidentNew(){
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    async function handleSubmit(e){
        e.preventDefault();
        const ongId = localStorage.getItem('ongId');

        try{
            await api.post('/incidents', {title, description, value}, {
                headers: {
                    Authorization : ongId
                }
            });

            history.push('/profile');
        }catch(err){
            alert("Não foi possível registrar seu caso. Tente novamente!");
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt=""/>

                    <h1>Cadastrar novo caso</h1>

                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link to="/profile" className="back-link"><FiArrowLeft size={16} color="#e02041"/> Voltar para home</Link>

                </section>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Título do caso"
                        value={title} onChange={(e) => setTitle(e.target.value)}/>

                    <textarea placeholder="Descrição"
                         value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                    <input type="text" placeholder="Valor em reais"
                        value={value} onChange={(e) => setValue(e.target.value)}/>

                    <button type="submit" className="button">CADASTRAR</button>
                </form>
            </div>
        </div>
    )
}