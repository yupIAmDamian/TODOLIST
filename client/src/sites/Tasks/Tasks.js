import React, { useEffect, useState } from "react";
import axios from "axios";
import httpClient from "../../httpClient";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await httpClient.get("http://127.0.0.1:5000/@me");
      console.log(res.data)
      /*
      const res = await httpClient.get("http://127.0.0.1:5000/task");
      setTasks(res.data);
      console.log(res.data);*/
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTasks()
  }, []);

  return (
    <div>
      Tasks
      {/*tasks.map((item, index) => {
        return ( item["content"]);
      })*/}
    </div>
  );
};

export default Tasks;
