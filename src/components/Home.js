import { useEasybase } from 'easybase-react';
import { useEffect, useState } from "react";

const Home = () => {

  const [ userGoals, setUserGoals ] = useState([]);

  const {
    configureFrame,
    sync,
    Frame,
    useFrameEffect,
  } = useEasybase();

  useEffect(() => {    
    configureFrame({ limit: 10, offset: 0, tableName: 'USER GOALS'});
    sync();
  }, []);

  useFrameEffect(() => {
    setUserGoals(Frame().map(ele => ele));
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
        {userGoals.map((ele, index) =>
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