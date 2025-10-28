import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Login from './Login.jsx';

// Monta Login con router y una "Home" dummy
function renderLoginWithRouter() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/" element={<div data-testid="home-page">Home</div>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Login (Karma + Jasmine)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra mensaje genérico cuando no hay usuarios en storage', async () => {
    renderLoginWithRouter();

    await userEvent.type(screen.getByPlaceholderText(/Username/i), 'user123');
    await userEvent.type(screen.getByPlaceholderText(/Password/i), 'Clave12');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    // Mensaje aparece de forma sincrónica tras setState
    const msg = screen.getByText(/Login invalido, usuario y\/o contraseña incorrecta/i);
    expect(msg).toBeTruthy();
    expect(msg.style.color).toBe('red');
  });

  it('usuario existe pero contraseña no coincide -> muestra "contraseña incorrecta"', async () => {
    const users = [{ username: 'user123', password: 'Correcta1', firstName: 'Ana' }];
    localStorage.setItem('users', JSON.stringify(users));

    renderLoginWithRouter();

    await userEvent.type(screen.getByPlaceholderText(/Username/i), 'user123');
    await userEvent.type(screen.getByPlaceholderText(/Password/i), 'Mala1');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    const err = screen.getByText(/contraseña incorrecta/i);
    expect(err).toBeTruthy();
    expect(err.style.color).toBe('red');
  });

  it('éxito: guarda currentUser, muestra verde y redirige a "/" a los 5s', async () => {
    const users = [{ username: 'userok', password: 'Clave12', firstName: 'Luz' }];
    localStorage.setItem('users', JSON.stringify(users));

    // ✅ Instala timers falsos ANTES de hacer submit (para capturar el setTimeout)
    jasmine.clock().install();
    try {
      renderLoginWithRouter();

      await userEvent.type(screen.getByPlaceholderText(/Username/i), 'userok');
      await userEvent.type(screen.getByPlaceholderText(/Password/i), 'Clave12');
      await userEvent.click(screen.getByRole('button', { name: /login/i }));

      // ✅ Usar getByText (SIN esperas) porque hay timers falsos activos
      const ok = screen.getByText(/volviendo al menu principal/i);
      expect(ok).toBeTruthy();
      expect(ok.style.color).toBe('green');

      const current = JSON.parse(localStorage.getItem('currentUser') || 'null');
      expect(current).toEqual({ username: 'userok', firstName: 'Luz' });

      // ✅ Avanza exactamente 5000 ms y deja que React procese con act()
      await act(async () => {
        jasmine.clock().tick(5000);
      });

      expect(screen.getByTestId('home-page')).toBeTruthy();
    } finally {
      jasmine.clock().uninstall();
    }
  });
});
