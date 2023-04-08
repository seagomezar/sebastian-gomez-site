import React from 'react';

const Clase = ({ clase }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-2">{clase.mainTitle}</h2>
      <h3 className="text-xl mb-4">{clase.subtitle}</h3>
      <p className="mb-4">{clase.introText}</p>
      <p className="font-bold mb-4">{clase.homework}</p>
      <ul>
        {clase.links.map((link, index) => (
          <li key={index}>
            <a
              href={link.URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clase;