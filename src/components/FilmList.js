import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function FilmList() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch('https://ghibliapi.vercel.app/films')
      .then(response => response.json())
      .then(data => setFilms(data));
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Studio Ghibli</h1>
      <h1 className="text-center">Peliculas</h1>
      <div className="row">
        {films.map(film => (
          <div className="col-md-4" key={film.id}>
            <div className="card mb-4 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-center">{film.title}</h5>
                <p className="card-text">{film.description.slice(0, 100)}...</p>
                <p className="text-muted"><strong>Director:</strong> {film.director}</p>
                <div className="d-flex justify-content-center">
                  <Link to={`/film/${film.id}`} className="btn btn-primary">Ver Detalles</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilmList;
