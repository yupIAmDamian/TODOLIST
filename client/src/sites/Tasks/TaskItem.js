import React from "react";
import httpClient from "../../httpClient";
import styled from "styled-components";

const TaskWrapper = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0.5rem 2ch;
  border-radius: 5px;
  border: 1px solid black;
  .controls{
    display: flex;
    gap: 1rem;
    .dltBtn{
        background-color: red;

        &:hover{
          background-color:  rgb(200, 0, 0);
        }
        
    }
    .updtBtn{
      background-color: green;

      &:hover{
        background-color: rgb(0, 173, 0);
      }
    }
    button{
      border: none;
      padding: 0.25rem 0.25rem;
      border-radius: 5px;
      color: aliceblue;

    }
  }
`;

const TaskItem = ({ text, deleteTask, updateTask }) => {
  return (
    <TaskWrapper>
      <h1>{text}</h1>
      <div className="controls">

        <button className="updtBtn" 
        onClick={updateTask}>Update</button>        
        <button className="dltBtn"
        onClick={deleteTask}> Remove</button>
      </div>
    </TaskWrapper>
  );
};

export default TaskItem;
