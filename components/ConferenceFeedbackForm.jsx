import React, { useState, useEffect } from 'react';
import { submitConferenceFeedback } from '../services';
import { event } from '../lib/analytics';

function ConferenceFeedbackForm({ slug, conferenceName, themeColor }) {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    userName: null,
    comment: null,
    score: 5,
    storeData: false,
  });

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initalFormData = {
      userName: window.localStorage.getItem('userName'),
      storeData: window.localStorage.getItem('userName') ? true : false,
    };
    setFormData((prevState) => ({
      ...prevState,
      ...initalFormData
    }));
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handlePostSubmission = () => {
    setError(false);
    const { userName, comment, score, storeData } = formData;
    if (!userName || !comment || !score) {
      setError(true);
      return;
    }
    const feedbackObj = {
      userName,
      comment,
      score: parseInt(score, 10),
      slug,
    };

    if (storeData) {
      localStorage.setItem('userName', userName);
    } else {
      localStorage.removeItem('userName');
    }

    submitConferenceFeedback(feedbackObj).then((res) => {
      if (res.createConferenceFeedback) {
        if (!storeData) {
          formData.userName = null;
        }
        formData.comment = '';
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }));
        setShowSuccessMessage(true);

        // Track feedback submission in GA4
        event({
            action: 'submit_conference_feedback',
            category: 'conference_landing',
            label: conferenceName,
            value: parseInt(score, 10)
        });

        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      }
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Déjame tus comentarios sobre la charla
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          type="text"
          value={formData.userName || ''}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 bg-gray-100 text-gray-700"
          placeholder="Tu Nombre"
          name="userName"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          value={formData.comment || ''}
          onChange={onInputChange}
          className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 bg-gray-100 text-gray-700"
          name="comment"
          placeholder="¿Qué te pareció la charla? ¿Qué te llevas de aprendizaje?"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <label className="text-gray-600 ml-2">Calificación de la charla (1 al 5):</label>
        <select
          name="score"
          value={formData.score || 5}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 bg-gray-100 text-gray-700"
        >
          <option value="5">5 - Excelente</option>
          <option value="4">4 - Muy buena</option>
          <option value="3">3 - Buena</option>
          <option value="2">2 - Regular</option>
          <option value="1">1 - Mala</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            checked={formData.storeData}
            onChange={onInputChange}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="text-gray-600 cursor-pointer ml-2"
            htmlFor="storeData"
          >
            Guardar mi nombre en este navegador para la próxima vez.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">
          Todos los campos son obligatorios.
        </p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handlePostSubmission}
          className="transition duration-500 ease inline-block text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
          style={{ backgroundColor: themeColor || '#db2777' }}
        >
          Enviar Feedback
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            ¡Gracias por tu comentario!
          </span>
        )}
      </div>
    </div>
  );
}

export default ConferenceFeedbackForm;
