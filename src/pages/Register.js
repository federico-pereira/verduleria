import React from 'react';
import { Container } from 'react-bootstrap';
import '../assets/styles/style.css';

// Components
import Register from '../components/Register';

export default function RegisterPage() {
    return (
        <>
            <Container>
                <Register />
            </Container>
        </>
    )
}