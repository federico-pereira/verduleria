import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import '../assets/styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        setUser(currentUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
        navigate('/');
    };

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        setUser(currentUser);
    }, [user]);

    return (
        <Container>
            <header className="site-header">
                <div className="container header-inner">
                    <a className="logo" href="/">
                        <img src={require('../assets/img/logo.jpg')} alt="HuertoHogar" />
                        <span>HuertoHogar</span>
                    </a>
                    <nav className="nav">
                        <Dropdown>
                            <Dropdown.Toggle variant='success' id='dropdown-basic'>
                                Catálogo
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href='/'>Frutas Frescas</Dropdown.Item>
                                <Dropdown.Item href='/'>Verduras Orgánicas</Dropdown.Item>
                                <Dropdown.Item href='/'>Productos Orgánicos</Dropdown.Item>
                                <Dropdown.Item href='/'>Productos Lácteos</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <a href="/about">Nosotros</a>
                        <a href="cart/index.html">Carrito</a>

                        {/* Conditional rendering for Login/Logout */}
                        {user ? (
                            <a onClick={handleLogout}>Cerrar Sesión</a>
                        ) : (
                            <a href="/login">Ingresar</a>
                        )}
                    </nav>
                </div>
            </header>
        </Container>
    );
};

export default Navigation;
