import React, {useState} from 'react'
import "./styles.css"
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Register(){
    async function handleRegister(e){
        e.preventDefault();

        const response = await api.post('/ongs',{
            name,
            email,
            whatsapp,
            city,
            uf
        });

        alert(`Seu ID de acesso: ${response.data.id}`);

        history.push('/');
    }

    const history = useHistory()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt=""/>

                    <h1>Cadastro</h1>

                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link to="/" className="back-link"><FiArrowLeft size={16} color="#e02041"/> Já tenho cadastro</Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder="Nome da ONG" 
                        value={name} 
                        onChange={e => setName(e.target.value)}/>

                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email} 
                        onChange={e => setEmail(e.target.value)}/>

                    <input 
                        type="text" 
                        placeholder="Whatsapp"
                        value={whatsapp} 
                        onChange={e => setWhatsapp(e.target.value)}/>

                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="Cidade"
                            value={city} 
                            onChange={e => setCity(e.target.value)}/>
                        <input 
                            type="text" 
                            placeholder="UF" 
                            style={{width: 80}}
                            value={uf} 
                            onChange={e => setUF(e.target.value)}/>
                    </div>

                    <button type="submit" className="button">CADASTRAR</button>
                </form>
            </div>
        </div>
    );
}