import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const httpConfig = (data, method) => {
    if(method === "POST"){
      setConfig({
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    }

    
    setMethod(method);
  };

  useEffect(() => {
    const fetchData = async () => {
     const res = await fetch(url);
     const json =await res.json();
     setData(json);
    };

    fetchData();
  }, [url, callFetch]); // <-- refaz a requisição quando callFetch muda

  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
       let fetchOpitions = [url,config]
       const res = await fetch(...fetchOpitions)
       const json = await res.json()
       setCallFetch(json)
      }
    };
    
    httpRequest();
  }, [config, method, url]);

  return { data, httpConfig, loading, error };
};