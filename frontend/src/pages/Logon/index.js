import React, { useState } from 'react'
import './styles.css'
import herosImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import { FiLogIn } from 'react-icons/fi'
import { Link,useHistory } from 'react-router-dom'
import api from '../../services/api'

export default function Logon(){
    const [id, setId] = useState('')
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();


        try{
            const response = await api.post('/session',{id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        }catch(err){
            console.log(err);
            alert("Ong não encontrada");
        }

    }

    
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero"/>

                <form onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>

                    <input type="text" placeholder="Sua ID" value={id} onChange={(e) => setId(e.target.value)}/>
                    <button type="submit" className="button">ENTRAR</button>

                    <Link to="/register" className="back-link"><FiLogIn size={16} color="#e02041"/> Não tenho cadastro</Link>
                </form>
            </section>
            
            <img src={herosImg} alt="Heroes together"/>
        </div>
    )
}