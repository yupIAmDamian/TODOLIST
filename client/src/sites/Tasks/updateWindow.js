import React, {useState} from 'react'
import styled from 'styled-components'
import httpClient from '../../httpClient'

const UpdateWindowWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(202, 202, 202, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

  .contentHolder{
    background-color: aliceblue;
    width: 60%;
    height: 30%;
    border-radius: 2rem;
    position: relative;

    .closeIconHolder{
      position: absolute;
      right: 1rem;
      top: 0.5rem;
      font-size: 3rem;

      &:hover{
        color: red;
        cursor: pointer;
      }
    }
  }
`

const UpdateWindow = ({closeFunc, fetchTasks, id, text}) => {
  const [textToUpdate, setTextToUpdate ] = useState(text)

  const updateTask = async () => {
    console.log("call from update task")
    
    await httpClient
      .patch(`/task/${id}`, { "content": textToUpdate })
      .then((response) => {
        console.log(response);
        closeFunc(false)
      })
      .catch((e) => {
        console.log(e);
      });
    fetchTasks();
    
  };

  return (
    <UpdateWindowWrapper>
      <div className="contentHolder">
        <h2>Update</h2>
        <div className="closeIconHolder">
          <ion-icon name="close-circle-outline" onClick={()=>closeFunc(false)}></ion-icon>
        </div>

        <input type="text"  value={textToUpdate} onChange={(e)=>setTextToUpdate(e.target.value)}/>
        <div className="updateBtn">
          <button onClick={updateTask}>Update</button>
        </div>
        
      </div>
    </UpdateWindowWrapper>
  )
}

export default UpdateWindow