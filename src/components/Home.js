import { useEasybase } from 'easybase-react';
import { useEffect, useState } from "react";

const Home = () => {

  const [ isLoading, setIsLoading ] = useState(true);

  const {
    configureFrame,
    sync,
    Frame,
    useFrameEffect,
    isUserSignedIn
  } = useEasybase();

  useEffect(() => {
    if (isUserSignedIn()) {
      configureFrame({ limit: 10, offset: 0, tableName: 'USER GOALS'});
      sync();
    }        
  }, []);

  useFrameEffect(() => {
    setIsLoading(false);
  });

  const card = {
    border: "2px #0af solid",
    borderRadius: 9,
    margin: 20,
    backgroundColor: "#afefef",
    padding: 6
  };

  return (
    <div style={ { display: 'flex', justifyContent: 'center' } }>
      <div style={ { width: '400px' } }>
        {!isLoading && isUserSignedIn() && Frame().map((ele, index) =>
          <div style={card} key={index}>
            <h4>{ele.type}</h4>
            <p>{ele.goal}</p>
          </div>
        )}      
      </div> 
    </div>       
  )
}
export default Home;