import React, { useEffect, useState } from "react";
import httpClient from "../../httpClient";
import { useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";
import UpdateWindow from "./updateWindow";
import "./index.css";

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [inputContent, setInputContent] = useState("");

  const [updateContent, setupdateContent] = useState([]);

  const [isUpdateWindowOpen, setIsUpdateWindowOpen] = useState(false)

  const fetchTasks = async () => {
    try {
      const res_client = await httpClient.get("/task");
      setTasks(res_client.data);
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = async () => {
    await httpClient
      .post("/logout")
      .then((response) => {
        console.log(response);
        navigate("/auth");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTask = async (id) => {
    await httpClient
      .delete(`/task/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
    fetchTasks();
  };

  const createTask = async (content) => {
    if (content) {
      await httpClient
        .post(`/task`, { content: content })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
      setInputContent("");
      fetchTasks();
    } else {
      console.log("you didnt write anything");
    }
  };

  const openUpdateWindow = (id, content)=>{
    setupdateContent([id,content])
    setIsUpdateWindowOpen(true)
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      {isUpdateWindowOpen&&< UpdateWindow closeFunc={setIsUpdateWindowOpen} id={updateContent[0]} text={updateContent[1]} fetchTasks={fetchTasks}/>}
      <div className="navbar">
        <h1>Tasks</h1>
        <button onClick={logOut}>Log out</button>
      </div>

      <div className="addTask">
        <input
          type="text"
          name=""
          id=""
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          placeholder="Your task"
        />
        <button onClick={() => createTask(inputContent)}>Add task</button>
      </div>


      <div className="taskWrapper">
        {tasks.map((item, index) => {
          return (
            <TaskItem
              key={index}
              text={item.content}
              deleteTask={() => deleteTask(item.id)}
              updateTask={() => openUpdateWindow(item.id, item.content)}
            />
          );
        })}
      </div>

      {/*isUpdatingData && (
        <>
          <input
            type="text"
            name=""
            id=""
            value={isUpdatingData[1]}
            onChange={(e) =>
              setInputContent((isUpdatingData[0], e.target.value))
            }
            placeholder="Tak to update"
          />
          <button onClick={() => updateTask()}>Update task</button>
        </>
      )*/}
    </div>
  );
};

export default Tasks;
