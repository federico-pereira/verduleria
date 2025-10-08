import React from 'react';
import { Container } from 'react-bootstrap';
import '../assets/styles/style.css';

// Components
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import Products from '../components/Products';

export default function Home() {
    return (
        <>
            <Container>
                <Hero />
                <Categories />
                <Products />
            </Container>
        </>
    )
}