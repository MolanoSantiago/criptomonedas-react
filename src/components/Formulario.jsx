import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/Monedas";
import { useEffect, useState } from "react";
import Error from "./Error";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Formulario = ({ setMonedas }) => {
  const [criptos, setCriptos] = useState([]);
  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas);
  const [cripto, SelectCriptoMonedas] = useSelectMonedas(
    "Elige tu criptomoneda",
    criptos
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    const requestAPI = async () => {
      //   const criptoArr = [];
      //   fetch(
      //     "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"
      //   )
      //     .then((response) => response.json())
      //     .then((element) =>
      //       element.Data.map((cripto) => {
      //         const criptoObj = {
      //           id: cripto.CoinInfo.Name,
      //           nombre: cripto.CoinInfo.FullName,
      //         };
      //         return criptoArr.push(criptoObj);
      //       })
      //     );
      //   setCriptos(criptoArr);
      //   return criptoArr
      const url =
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";
      const response = await fetch(url);
      const result = await response.json();
      const criptoArr = result.Data.map((cripto) => {
        const criptoObj = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return criptoObj;
      });
      setCriptos(criptoArr);
    };
    requestAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cripto && moneda !== "") {
      setError(false);
      setMonedas({
        moneda,
        cripto,
      });
    } else {
      setError(true);
    }
  };

  return (
    <>
      {error && <Error children={"Todos los campos son requeridos"} />}
      <form onSubmit={(e) => handleSubmit(e)}>
        <SelectMonedas />
        <SelectCriptoMonedas />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Formulario;
