import React from 'react';
import {
  render, screen, fireEvent, waitFor, act,
} from '@testing-library/react';
import ConferenceFeedbackForm from '../../components/ConferenceFeedbackForm';
import { submitConferenceFeedback } from '../../services';

jest.mock('../../services', () => ({
  submitConferenceFeedback: jest.fn(),
}));

jest.mock('../../lib/analytics', () => ({
  event: jest.fn(),
}));

const fill = (name, comment) => {
  if (name !== undefined) {
    fireEvent.change(screen.getByPlaceholderText('Tu Nombre'), { target: { value: name } });
  }
  if (comment !== undefined) {
    fireEvent.change(
      screen.getByPlaceholderText(/Qué te pareció la charla/i),
      { target: { value: comment } },
    );
  }
};

beforeEach(() => {
  submitConferenceFeedback.mockReset();
  submitConferenceFeedback.mockResolvedValue({ createConferenceFeedback: { id: 'x' } });
  window.localStorage.clear();
});

describe('ConferenceFeedbackForm', () => {
  it('shows a validation error when required fields are empty', () => {
    render(<ConferenceFeedbackForm slug="react-conf" conferenceName="React Conf" />);
    fireEvent.click(screen.getByText('Enviar Feedback'));

    expect(screen.getByText('Todos los campos son obligatorios.')).toBeInTheDocument();
    expect(submitConferenceFeedback).not.toHaveBeenCalled();
  });

  it('shows a server error message when the API returns an error', async () => {
    submitConferenceFeedback.mockResolvedValue({ error: 'La calificación debe estar entre 1 y 5.' });
    render(<ConferenceFeedbackForm slug="react-conf" conferenceName="React Conf" />);
    fill('Ada', 'Great talk!');
    fireEvent.click(screen.getByText('Enviar Feedback'));

    expect(await screen.findByText('La calificación debe estar entre 1 y 5.')).toBeInTheDocument();
  });

  it('shows a generic error message when the submission rejects', async () => {
    submitConferenceFeedback.mockRejectedValue(new Error('network down'));
    render(<ConferenceFeedbackForm slug="react-conf" conferenceName="React Conf" />);
    fill('Ada', 'Great talk!');
    fireEvent.click(screen.getByText('Enviar Feedback'));

    expect(
      await screen.findByText('No se pudo enviar el feedback. Intenta de nuevo.'),
    ).toBeInTheDocument();
  });

  it('clears the comment field after a successful submission', async () => {
    render(<ConferenceFeedbackForm slug="react-conf" conferenceName="React Conf" />);
    fill('Ada', 'Great talk!');
    const comment = screen.getByPlaceholderText(/Qué te pareció la charla/i);
    expect(comment).toHaveValue('Great talk!');

    fireEvent.click(screen.getByText('Enviar Feedback'));

    await waitFor(() => expect(comment).toHaveValue(''));
  });

  it('submits a parsed integer score plus honeypot and timing fields', async () => {
    render(<ConferenceFeedbackForm slug="react-conf" conferenceName="React Conf" />);
    fill('Ada', 'Great talk!');
    fireEvent.click(screen.getByText('Enviar Feedback'));

    await waitFor(() => expect(submitConferenceFeedback).toHaveBeenCalledTimes(1));
    const payload = submitConferenceFeedback.mock.calls[0][0];
    expect(payload).toMatchObject({
      userName: 'Ada',
      comment: 'Great talk!',
      score: 5,
      slug: 'react-conf',
    });
    expect(payload.score).toBe(5); // integer, not the "5" string from the <select>
    expect(payload).toHaveProperty('website');
    expect(typeof payload.renderedAt).toBe('number');
  });

  it('renders a hidden honeypot field that is empty by default', () => {
    render(<ConferenceFeedbackForm slug="react-conf" conferenceName="React Conf" />);
    const honeypot = document.querySelector('input[name="website"]');
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveValue('');
    expect(honeypot).toHaveAttribute('tabindex', '-1');
  });

  it('uses dark text on a light theme color for readable contrast', () => {
    render(
      <ConferenceFeedbackForm slug="react-conf" conferenceName="React Conf" themeColor="#ffeb3b" />,
    );
    const button = screen.getByText('Enviar Feedback');
    expect(button).toHaveStyle({ backgroundColor: '#ffeb3b', color: '#000000' });
  });

  it('uses white text on a dark theme color for readable contrast', () => {
    render(
      <ConferenceFeedbackForm slug="react-conf" conferenceName="React Conf" themeColor="#000000" />,
    );
    const button = screen.getByText('Enviar Feedback');
    expect(button).toHaveStyle({ backgroundColor: '#000000', color: '#ffffff' });
  });

  it('persists the user name to localStorage when "remember" is checked', async () => {
    render(<ConferenceFeedbackForm slug="react-conf" conferenceName="React Conf" />);
    fill('Ada', 'Great talk!');
    fireEvent.click(screen.getByLabelText(/Guardar mi nombre/i));
    fireEvent.click(screen.getByText('Enviar Feedback'));

    await waitFor(() => expect(submitConferenceFeedback).toHaveBeenCalled());
    expect(window.localStorage.getItem('userName')).toBe('Ada');
  });

  it('clears the stored user name when "remember" is unchecked', async () => {
    window.localStorage.setItem('userName', 'Ada');
    render(<ConferenceFeedbackForm slug="react-conf" conferenceName="React Conf" />);
    // checkbox initializes checked because a name is stored; uncheck it
    fireEvent.click(screen.getByLabelText(/Guardar mi nombre/i));
    fill(undefined, 'Another comment');
    fireEvent.click(screen.getByText('Enviar Feedback'));

    await waitFor(() => expect(submitConferenceFeedback).toHaveBeenCalled());
    expect(window.localStorage.getItem('userName')).toBeNull();
  });

  it('shows a success message that auto-hides after 5 seconds', async () => {
    jest.useFakeTimers();
    try {
      render(<ConferenceFeedbackForm slug="react-conf" conferenceName="React Conf" />);
      fill('Ada', 'Great talk!');
      fireEvent.click(screen.getByText('Enviar Feedback'));

      // flush the resolved submit promise
      await act(async () => { await Promise.resolve(); });
      expect(screen.getByText('¡Gracias por tu comentario!')).toBeInTheDocument();

      act(() => { jest.advanceTimersByTime(5000); });
      expect(screen.queryByText('¡Gracias por tu comentario!')).not.toBeInTheDocument();
    } finally {
      jest.useRealTimers();
    }
  });
});
