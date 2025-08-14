import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../components/login';

// Espía compatible con Jest o Vitest
const makeSpy = () => (typeof jest !== 'undefined' ? jest.fn() : vi.fn());

test('1) Botón deshabilitado al iniciar', () => {
  render(<Login />);

  // botón deshabilitado
  const btn = screen.getByRole('button', { name: /iniciar sesión/i });
  expect(btn).toBeDisabled();

  // existen los 3 campos por LABEL (coinciden con tu UI actual)
  expect(screen.getByLabelText(/código de cliente/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
});

test('2) Botón habilitado cuando los tres campos están llenos', () => {
  render(<Login />);

  const btn = screen.getByRole('button', { name: /iniciar sesión/i });
  const cod = screen.getByLabelText(/código de cliente/i);
  const usr = screen.getByLabelText(/usuario/i);
  const psw = screen.getByLabelText(/contraseña/i);

  // llenar los 3 campos
  fireEvent.change(cod, { target: { value: 'FT-001' } });
  fireEvent.change(usr, { target: { value: 'juan' } });
  fireEvent.change(psw, { target: { value: '1234' } });

  expect(btn).toBeEnabled();
});

test('3) Click llama a "Login" con valores correctos', () => {
  const LoginFn = makeSpy();
  render(<Login Login={LoginFn} />);

  const cod = screen.getByLabelText(/código de cliente/i);
  const usr = screen.getByLabelText(/usuario/i);
  const psw = screen.getByLabelText(/contraseña/i);
  const btn = screen.getByRole('button', { name: /iniciar sesión/i });

  fireEvent.change(cod, { target: { value: 'FT-009' } });
  fireEvent.change(usr, { target: { value: 'mario' } });
  fireEvent.change(psw, { target: { value: 'abc' } });

  fireEvent.click(btn);

  expect(LoginFn).toHaveBeenCalledTimes(1);
  expect(LoginFn).toHaveBeenCalledWith({
    clientCode: 'FT-009',
    usr: 'mario',
    pswd: 'abc',
  });
});
