import { useState, useEffect } from 'react';
import { showFacts, showFactsInRange } from './services';

const ShowFacts = ({ facts,onLoad,pageState }) => {
  const [nextPending, setNextPending] = useState(false);
  const [prevPending, setPrevPending] = useState(false);

  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(true);

  const nextLoad = () => {
    setNextPending(true);
    showFactsInRange(pageState.pageSize,pageState.startIdx + pageState.pageSize)
    .then(facts => {
      onLoad({ startIdx: pageState.startIdx + pageState.pageSize, pageSize:pageState.pageSize, info:facts});
      setNextPending(false);
    })
    .catch( err => {
      console.log(err);
      setNextPending(true);
    });
  }

  const prevLoad = () => {
    setPrevPending(true);
    showFactsInRange(pageState.pageSize,pageState.startIdx-pageState.pageSize)
    .then(facts => {
      //onLoad({ info: facts, pageSize:5, startIdx:0 });
      onLoad({ startIdx: pageState.startIdx - pageState.pageSize, pageSize:pageState.pageSize, info:facts });
      setPrevPending(false);
    })
    .catch( err => {
      console.log(err);
      setPrevPending(true);
    });
  }

  const fact = facts.sliced;
  const listItems = fact.map((item, index) =>
        <li key={index}>{item.fact}</li>
    );
    return (
            <div className="facts">
                <p> Showing {pageState.startIdx + 1 > 0 ? pageState.startIdx + 1 : 1} - {pageState.startIdx + pageState.pageSize > 24 ? 25 : pageState.startIdx + pageState.pageSize} Facts </p>
                <ul >
                    {listItems}
                </ul>
                <button disabled={prevPending ? true : pageState.startIdx > 0 ? false : true} onClick={prevLoad}>{ prevPending ? "Loading..." : "Previous"}</button>
                <button disabled={nextPending ? true : pageState.startIdx + pageState.pageSize < 26 ? false : true } onClick={nextLoad}>{ nextPending ? "Loading..." : "Next"}</button>
            </div>
    );
};
export default ShowFacts;
