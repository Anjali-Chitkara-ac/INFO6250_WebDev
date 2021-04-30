import { useState} from 'react';
import { showFacts, showFactsInRange } from './services';

const Load = ({onLoad,pageState}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // const load = () => {
  //   setIsPending(true);
  //   showFacts()
  //   .then(facts => {
  //     setIsLoaded(true);
  //     onLoad({ info: facts });
  //     setIsPending(false);
  //   })
  //   .catch( err => {
  //     setIsPending(true);
  //     console.log(err);
  //   });
  // }

  const loadInRange = () => {

    console.log("pageState.pageSize is: " + pageState.pageSize);
    setIsPending(true);
    showFactsInRange(pageState.pageSize,pageState.startIdx)
    .then(facts => {
      setIsLoaded(true);
      onLoad({ info: facts, pageSize : pageState.pageSize, startIdx:pageState.startIdx});
      setIsPending(false);
    })
    .catch( err => {
      setIsPending(true);
      console.log(err);
    });
  }

  return (
    <div>
      <p> 0 facts Loaded </p>
      <button onClick={loadInRange}> { isPending ? "Loading..." : "Load"}</button>
    </div>
  );
};

export default Load;
