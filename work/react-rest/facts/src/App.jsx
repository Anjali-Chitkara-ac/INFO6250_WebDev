import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Load from './Load';
import { showFacts, showFactsInRange } from './services';
import ShowFacts from './ShowFacts';

function App() {

  const [pageState, setPageState] = useState({ isLoaded:false, pageSize : 5, startIdx : 0});

  const load = function({info, pageSize, startIdx}) {
    setPageState({
      isLoaded: true,
      pageSize : pageSize,
      startIdx : startIdx,
      info
    });
    console.log("The page index is: " + startIdx);
  };

  let content;
  if(pageState.isLoaded) {
    content = <ShowFacts facts={pageState.info} onLoad={load} pageState={pageState}/>;
  } else {
    console.log("pageSize " + pageState.pageSize);
    content = <Load onLoad={load} pageState={pageState}/>;
  }

  const handleInput = (event) => {
      const size = event.target.value
      console.log("event val " + size);
      setPageState({pageSize : Number(size), startIdx : pageState.startIdx, isLoaded : pageState.isLoaded, info : pageState.info});
      console.log("pageSize " + pageState.pageSize);

      if(pageState.isLoaded) {
        // loadFacts from start - start + size

      //   showFactsInRange(pageState.pageSize,pageState.startIdx)
      //   .then(facts => {
      //     load({ info: facts, pageSize : pageState.pageSize, startIdx:pageState.startIdx});
      //   })
      //   .catch( err => {
      //     console.log(err);
      //   });
      }
  }

  return (
    <div className="app">
    <h3> Cat Facts ! </h3>
    <label>Facts per page:</label>
      <select onChange={handleInput}>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
      {content}
    </div>
  );
}

export default App;
