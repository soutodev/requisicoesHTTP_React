import './App.css'

import { useState, useEffect } from "react"

// importando o customHook
import { useFetch } from './hooks/useFetch';


const url = "http://localhost:3000/products";

function App() {

  const [products, setProducts] = useState([]);

  // customHook
  const { data: items, httpConfig, loading, error } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // resgatando dados
  /* useEffect(() => {
    async function fetchData() {
      
      const res = await fetch(url);

      const data = await res.json();

      setProducts(data);

    }

    fetchData()
  }, []); */

  // adição de produtos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };

    /* const res = await fetch(url, {
      method : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product),
    });

    // carregamento dinâmico
    const addedProduct = await res.json()
    setProducts((prevProdutcs) => [...prevProdutcs, addedProduct ]) */

    // refatorando o post
    httpConfig(product, "POST")

    setName("")
    setPrice("")

    console.log(products)

  }


  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {/* - Loading - */}
      {loading && <p>Atualizando dados...</p>}
      {error && <p>{error}</p>}
      {!error && (
        <ul>
          {items && items.map((product) => (
            <li key={product.id}>{product.name} - $: {product.price}</li>
          ))}
        </ul>
      )}
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" value={name} name="name" onChange={(e) => setName(e.target.value)}/>
          </label>
          <label>
            Preço:
            <input 
              type="number" 
              value={price} 
              name="price" 
              onChange={(e) => setPrice(e.target.value)}/>
          </label>
          {/* state de loading no post */}
          {loading && <input type="submit" disabled value="Aguarde..."/>}
          {!loading && <input type="submit" value="Criar"/>}
        </form>
      </div>
    </div>
  )
}

export default App
