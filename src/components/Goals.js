import { useEasybase } from 'easybase-react';
import { useEffect, useState } from "react";

const Goals = () => {

  const [ allGoals, setAllGoals ] = useState([]);

  const {
    configureFrame,
    sync,
    Frame,
    isUserSignedIn,
    addRecord,
    useFrameEffect
  } = useEasybase();

  useEffect(() => {
    configureFrame({ limit: 10, offset: 0, tableName: 'GOALS'});
    sync();
  }, []);

  useFrameEffect(() => {
    setAllGoals(Frame().map(ele => ele));
  });

  const card = {
    border: "2px #0af solid",
    borderRadius: 9,
    margin: 20,
    backgroundColor: "#efefef",
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

  return (
    <div style={ { display: 'flex', justifyContent: 'center' } }>
      <div style={ { width: '400px' } }>
        {allGoals.map((ele, index) =>
          <div style={card} key={index}>
            <h4>{ele.type}</h4>
            <p>{ele.goal}</p>
            <button onClick={() => handleSelectGoalClick(ele)}>⭐ Add Goal ⭐</button>
          </div>
        )}      
      </div> 
    </div>       
  )
}
export default Goals;