import { EasybaseProvider, useEasybase } from 'easybase-react';
import { useEffect } from "react";
import { HashRouter, Switch, Route, Link } from 'react-router-dom';

const Home = () => {

  const {
    configureFrame,
    sync,
    Frame,
    isUserSignedIn,
    addRecord,
    currentConfiguration
  } = useEasybase();

  useEffect(() => {    
    configureFrame({ limit: 10, offset: 0, tableName: 'USER GOALS'});
    console.log('sync');
    sync();
  }, []);

  const card = {
    border: "2px #0af solid",
    borderRadius: 9,
    margin: 20,
    backgroundColor: "#afefef",
    padding: 6
  };

  const handleSelectGoalClick = (ele) => {
    if (isUserSignedIn()) {
      addRecord({ tableName: "USER GOALS", newRecord: {
        id: ele.id,
        goal: ele.goal,
        type: ele.type
      } })
    }
  };

  console.log(Frame());
  console.log(currentConfiguration().tableName);

  return (
    <div style={ { display: 'flex', justifyContent: 'center' } }>
      <div style={ { width: '400px' } }>
        {currentConfiguration().tableName === 'USER GOALS' &&         
        Frame().map((ele, index) =>
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