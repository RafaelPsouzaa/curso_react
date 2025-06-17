import { useEffect, useState } from "react";

// 4 - custom hook
export const useFetch = (url) => {
  const [data, setData] = useState(null);

  //5- refatorando o post
  const [config,setConfig] = useState(null);
  const [method,setMethod] = useState(null);
  const[callFetch,setCallFetch] = useState(false);

  //6- loading
  const[loading,setLoading] = useState(false);

  const httpConfig = (data,method) => {
    if(method === "POST"){
      setConfig({
        method,
        headers:{
          "Content-type":"application/json"
        },
        body: JSON.stringify(data)
      })
      setMethod(method);
    }
  }




useEffect(() => {
    const fetchData = async () => {
        //6-loading
        setLoading(true);



     const res = await fetch(url);
     const json = await res.json();

      setData(json);
      setLoading(false);
      
    }
      fetchData();
  },[url,callFetch]);

    //5- refatorando post
    useEffect(() => {
        const httpRequest = async () => {

        if(method === "POST"){

        let fetchOpitions = [url,config];
        
        const res = await fetch(...fetchOpitions);

        const json = await res.json();

        setCallFetch(json);
        }

        }
        httpRequest();
      },[config,method,url]);



return {data,httpConfig,loading};
};
//https://www.udemy.com/course/react-do-zero-a-maestria-c-hooks-router-api-projetos/learn/lecture/31444842#questions/23383473