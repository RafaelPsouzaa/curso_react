import "./App.css";

import { useState, useEffect } from "react";

// 4 - custom hook
import { useFetch } from "./hooks/useFetch";

// 8 - errar url para mostrar erro
const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);

  // 4 - custom hook e 5 - refactor post
  const { data: items, httpConfig, loading } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 1 - resgatando dados
  // useEffect(async () => {
  //   const res = await fetch("http://localhost:3000/products");

  //   const data = await res.json();

  //   setProducts(data);
  // }, []);

  // 2 - add product
  const handleSubmit = async (e) => {
  e.preventDefault();

  const product = {
    name,
    price,
  };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    
    // 3 - carregamento dinâmico
    const addedProduct = await res.json();
    setProducts((prevProducts) => [...prevProducts, addedProduct]);

    // 5 - refatorar post
    httpConfig(product, "POST");//estudar aqui erro de duplicaçao

  
  };

  
  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      {/* 6 - state de loading */}
      {loading && <p>Carregando dados...</p>}
      {!loading && (
        <ul>
        {items && items.map((product) => (
          <li key={product.id}>
            {product.name} - R$: {product.price}
          </li>
        ))}
      </ul>
      )}
      
       <div className="add-product">
        <p>Adicionar produto:</p>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text"value={name}name="name"onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input type="number"value={price} name="price"onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {/*7- state de load no post */}
           {loading && <input type="submit" disabled value="aguarde" />}
          {!loading && <input type="submit" value="criar" />}
        </form>
      </div>
    </div>
  );
}

export default App;