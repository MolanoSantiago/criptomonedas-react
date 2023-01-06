import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import ImgCripto from "./assets/imagen-criptos.png";
import Cotizacion from "./components/Cotizacion";
import Formulario from "./components/Formulario";
import Spinner from "./components/Spinner";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Heading = styled.h1`
  font-size: 3em;
  color: white;
  font-family: "Lato", sans-serif;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const App = () => {
  const [ monedas, setMonedas] = useState({})
  const [cotizacion, setCotizacion] = useState({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if(Object.keys(monedas).length > 0) {
      setLoading(true)
      setCotizacion({})
      const requestAPI = async () => {
        const {moneda, cripto} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`
        const response = await fetch(url)
        const result = await response.json()
        setCotizacion(result.DISPLAY[cripto][moneda])
        setLoading(false)
      }
      requestAPI()
    }
  }, [monedas])
  return (
    <Container>
      <Imagen src={ImgCripto} alt="Imagen de Cripto" />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setMonedas={setMonedas} />
        {loading && <Spinner />}
        {cotizacion.PRICE && <Cotizacion cotizacion={cotizacion}/>}
      </div>
    </Container>
  );
};

export default App;
