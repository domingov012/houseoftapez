import {useState} from 'react';
import Tutorial from '../components/Tutorial.jsx';

export default function TutorialsDisplay({productsArray, tutorialArray}) {
  const [filter, setFilter] = useState('TODOS');
  const allTutorials = tutorialArray.map((tutorial, i) => {
    console.log('TUTORIALS:', tutorial.fields);
    let tutorialComponent = (
      <Tutorial
        key={tutorial.handle}
        i={i}
        title={tutorial.fields[4].value}
        embededUrl={tutorial.fields[3].value}
        productsRefArray={productsArray[i]}
        desc={tutorial.fields[1].value}
      />
    );
    if (filter === 'TODOS') {
      return tutorialComponent;
    } else {
      return tutorial.fields[0].value === filter ? (
        tutorialComponent
      ) : (
        <div></div>
      );
    }
  });

  return (
    <div>
      <div className="tutorials-filter-wrapper">
        <div
          onClick={() => setFilter('TODOS')}
          className={
            filter === 'TODOS' ? 'selected-filter' : 'non-selected-filter'
          }
        >
          VER TODO
        </div>
        <div
          onClick={() => setFilter('CODO')}
          className={
            filter === 'CODO' ? 'selected-filter' : 'non-selected-filter'
          }
        >
          CODO
        </div>
        <div
          onClick={() => setFilter('BRAZO')}
          className={
            filter === 'BRAZO' ? 'selected-filter' : 'non-selected-filter'
          }
        >
          BRAZO
        </div>
        <div
          onClick={() => setFilter('RODILLA')}
          className={
            filter === 'RODILLA' ? 'selected-filter' : 'non-selected-filter'
          }
        >
          RODILLA
        </div>
        <div
          onClick={() => setFilter('HOMBRO')}
          className={
            filter === 'HOMBRO' ? 'selected-filter' : 'non-selected-filter'
          }
        >
          HOMBRO
        </div>
        <div
          onClick={() => setFilter('TOBILLO')}
          className={
            filter === 'TOBILLO' ? 'selected-filter' : 'non-selected-filter'
          }
        >
          TOBILLO
        </div>
        <div
          onClick={() => setFilter('MANOS')}
          className={
            filter === 'MANOS' ? 'selected-filter' : 'non-selected-filter'
          }
        >
          MANOS
        </div>
        <div
          onClick={() => setFilter('MUSCULAR')}
          className={
            filter === 'MUSCULAR' ? 'selected-filter' : 'non-selected-filter'
          }
        >
          MUSCULAR
        </div>
        <div
          onClick={() => setFilter('ESPALDA')}
          className={
            filter === 'ESPALDA' ? 'selected-filter' : 'non-selected-filter'
          }
        >
          ESPALDA
        </div>
        <div
          onClick={() => setFilter('TIPS')}
          className={
            filter === 'TIPS' ? 'selected-filter' : 'non-selected-filter'
          }
        >
          TIPS
        </div>
      </div>
      <div>{allTutorials}</div>
    </div>
  );
}
