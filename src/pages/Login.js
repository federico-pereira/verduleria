import React from 'react';
import { Container } from 'react-bootstrap';
import '../assets/styles/style.css';

// Components
import Login from '../components/Login';

export default function LoginPage() {
    return (
        <>
            <Container>
                <Login />
            </Container>
        </>
    )
}
