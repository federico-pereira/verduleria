import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Carrito from './Carrito.jsx';
import { CartContext } from '../context/CartContext';

function renderWithCart(value) {
  return render(
    <CartContext.Provider value={value}>
      <Carrito />
    </CartContext.Provider>
  );
}

const CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });

// acepta "-" (ASCII) o "−" (Unicode U+2212)
const isMinus = (name) => {
  if (!name) return false;
  const t = name.trim();
  return t === '-' || t === '−';
};

describe('Carrito (Karma+Jasmine)', () => {
  it('muestra vacío cuando no hay items', () => {
    const value = { items: [], updateQty: () => {}, removeItem: () => {}, clearCart: () => {}, subtotal: 0 };
    renderWithCart(value);
    expect(screen.getByText('Tu carrito está vacío.')).toBeTruthy();
  });

  it('renderiza items y subtotal', () => {
    const items = [
      { id: 1, name: 'Manzanas Fuji', precio: 1200, stock: 10, qty: 2, img: null },
      { id: 2, name: 'Pera',          precio: 1000, stock: 5,  qty: 3, img: null },
    ];
    const subtotal = items.reduce((a, it) => a + it.precio * it.qty, 0);
    const value = { items, updateQty: () => {}, removeItem: () => {}, clearCart: () => {}, subtotal };
    renderWithCart(value);

    // Títulos
    expect(screen.getByText('Manzanas Fuji')).toBeTruthy();
    expect(screen.getByText('Pera')).toBeTruthy();

    // El total por fila se valida ACOTANDO al <tr> para evitar la colisión con el subtotal de la tarjeta "Resumen"
    const rowPera = screen.getByText('Pera').closest('tr');
    expect(within(rowPera).getByText(CLP.format(1000 * 3))).toBeTruthy();

    // Subtotal en Resumen (STRONG)
    const [resumenSubtotal] = screen.getAllByText(CLP.format(subtotal)).slice(-1);
    expect(resumenSubtotal.tagName).toBe('STRONG');
  });

  it('al hacer click en + llama a updateQty con qty+1', async () => {
    const item = { id: 1, name: 'Manzanas Fuji', precio: 1200, stock: 10, qty: 1, img: null };
    const updateQty = jasmine.createSpy('updateQty');
    const value = { items: [item], updateQty, removeItem: () => {}, clearCart: () => {}, subtotal: 1200 };
    renderWithCart(value);

    const row = screen.getByText(item.name).closest('tr');
    const plusBtn = within(row).getByRole('button', { name: '+' });

    await userEvent.click(plusBtn);
    expect(updateQty).toHaveBeenCalledWith(item.id, item.qty + 1);
  });

  it('botón "-" está deshabilitado cuando qty <= 1', () => {
    const item = { id: 2, name: 'Kiwi', precio: 1500, stock: 5, qty: 1, img: null };
    const value = { items: [item], updateQty: () => {}, removeItem: () => {}, clearCart: () => {}, subtotal: 1500 };
    renderWithCart(value);

    const row = screen.getByText(item.name).closest('tr');
    const minusBtn = within(row).getByRole('button', { name: isMinus });

    expect(minusBtn).toBeTruthy();
    expect(minusBtn.disabled).toBeTrue();
  });

  it('al hacer click en "-" con qty>1 llama a updateQty con qty-1', async () => {
    const item = { id: 10, name: 'Naranja', precio: 900, stock: 10, qty: 2, img: null };
    const updateQty = jasmine.createSpy('updateQty');
    const value = { items: [item], updateQty, removeItem: () => {}, clearCart: () => {}, subtotal: 1800 };
    renderWithCart(value);

    const row = screen.getByText(item.name).closest('tr');
    const minusBtn = within(row).getByRole('button', { name: isMinus });

    await userEvent.click(minusBtn);
    expect(updateQty).toHaveBeenCalledWith(item.id, 1);
  });

  it('botón "+" está deshabilitado cuando qty >= stock', () => {
    const item = { id: 11, name: 'Frutilla', precio: 1200, stock: 3, qty: 3, img: null };
    const value = { items: [item], updateQty: () => {}, removeItem: () => {}, clearCart: () => {}, subtotal: 3600 };
    renderWithCart(value);

    const row = screen.getByText(item.name).closest('tr');
    const plusBtn = within(row).getByRole('button', { name: '+' });

    expect(plusBtn.disabled).toBeTrue();
  });

  it('al hacer click en "x" llama a removeItem con el id del producto', async () => {
    const item = { id: 12, name: 'Pimiento', precio: 700, stock: 4, qty: 1, img: null };
    const removeItem = jasmine.createSpy('removeItem');
    const value = { items: [item], updateQty: () => {}, removeItem, clearCart: () => {}, subtotal: 700 };
    renderWithCart(value);

    const row = screen.getByText(item.name).closest('tr');
    const removeBtn = within(row).getByRole('button', { name: 'x' });

    await userEvent.click(removeBtn);
    expect(removeItem).toHaveBeenCalledWith(item.id);
  });

  it('click en "Vaciar carrito" llama a clearCart', async () => {
    const clearCart = jasmine.createSpy('clearCart');
    const value = {
      items: [{ id: 3, name: 'Zanahoria', precio: 850, stock: 10, qty: 1, img: null }],
      updateQty: () => {}, removeItem: () => {}, clearCart, subtotal: 850,
    };
    renderWithCart(value);

    const button = screen.getByRole('button', { name: /Vaciar carrito/i });
    await userEvent.click(button);

    expect(clearCart).toHaveBeenCalled();
  });
});
