import React, { useState, useEffect } from 'react';

import { addTech } from '~/store/modules/techs/actions';

// import { Container } from './styles';

export default function TechList() {
  const [techs, setTechs] = useState([]);
  const [newTech, setNewTech] = useState('');

  useEffect(() => {
    const _techs = localStorage.getItem('techs');

    if(_techs) {
      setTechs(JSON.parse(_techs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs));
  }, [techs]);

  function handleAddTech() {
    dispatch(addTech(newTech));
    setNewTech('');
  }

  return (
    <>
      <ul data-testid="tech-list">
        {techs.map(tech => <li key={tech}>{tech}</li>)}
      </ul>

      <form data-testid="tech-form" onSubmit={handleAddTech}>
        <label htmlFor="tech">Tech</label>
        <input id="tech" type="text" value={newTech} onChange={e => setNewTech(e.target.value)} />
        <button onClick={handleAddTech}>Adicionar</button>
      </form>
    </>
  );
}
