import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function FilmDetails() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [people, setPeople] = useState([]);
  const [species, setSpecies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch(`https://ghibliapi.vercel.app/films/${id}`)
      .then(response => response.json())
      .then(data => {
        setFilm(data);
        fetchData(data.people, setPeople);
        fetchData(data.species, setSpecies);
        fetchData(data.locations, setLocations);
        fetchData(data.vehicles, setVehicles);
      });
  }, [id]);

  const fetchData = (urls, setState) => {
    if (!urls || urls.length === 0) {
      setState([]);
      return;
    }

    Promise.all(urls.map(url => fetch(url).then(res => res.json())))
      .then(data => setState(data))
      .catch(err => console.error(err));
  };

  if (!film) return <p>Loading...</p>;

  return (
    <div className="container my-4">
      <h1 className="text-center">{film.title}</h1>
      <p className="text-muted text-center">{film.description}</p>
      <p><strong>Director:</strong> {film.director}</p>
      <p><strong>Produtor:</strong> {film.producer}</p>

      <div className="row">
        <div className="col-md-6">
          <h3>Personajes</h3>
          <ul className="list-group">
            {people.length > 0 ? people.map(person => (
              <li className="list-group-item" key={person.id}>{person.name}</li>
            )) : <li className="list-group-item">No Disponible</li>}
          </ul>
        </div>

        <div className="col-md-6">
          <h3>Especies</h3>
          <ul className="list-group">
            {species.length > 0 ? species.map(specie => (
              <li className="list-group-item" key={specie.id}>{specie.name}</li>
            )) : <li className="list-group-item">No Disponible</li>}
          </ul>
        </div>

        <div className="col-md-6 mt-3">
          <h3>Ubicaciones</h3>
          <ul className="list-group">
            {locations.length > 0 ? locations.map(location => (
              <li className="list-group-item" key={location.id}>{location.name}</li>
            )) : <li className="list-group-item">No Disponible</li>}
          </ul>
        </div>

        <div className="col-md-6 mt-3">
          <h3>Vehiculos</h3>
          <ul className="list-group">
            {vehicles.length > 0 ? vehicles.map(vehicle => (
              <li className="list-group-item" key={vehicle.id}>{vehicle.name}</li>
            )) : <li className="list-group-item">No Disponible</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FilmDetails;
