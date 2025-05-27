import "../src/App.css";
import { useState,useEffect } from "react";

function App() {
  const[products,setProducts] = useState([]);
  const[name,setName] = useState("");
  const[price,setPrice] = useState("");
  const url ="http://localhost:3000/products";

  //1-Resgatando os dados 
  useEffect(() => {
    async function  fetchData() {
      const res = await fetch(url);
      
      const data = await res.json();

      setProducts(data);
    }
    fetchData();


  },[]);

  //2-add de produtos 
  const handleSubmit = async (e) => {

  }

  return (
    <div className="App">
      <h1>Listas de Produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}-{product.price}</li>
        ))}
      </ul>
      <div className="add-product">
        <form onClick={handleSubmit}>
          <label>
            name:
            <input type="text" value={name} name="name" onChange={(e)=> setName(e.target.value)} />
          </label>
          <label>
            preço:
            <input type="number" value={price} name="price" onChange={(e)=> setPrice(e.target.value)} />
          </label>
          <input type="submit" value="Criar" />
        </form>
      </div>
    </div>
  );
}

export default App;
