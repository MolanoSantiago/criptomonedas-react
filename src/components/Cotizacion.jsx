import styled from "@emotion/styled";

const Container = styled.div`
  color: #fff;
  font-family: "Lato", sans-serif;
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-top: 30px;
`;  

const Imagen = styled.img`
    display: block;
    width: 150px;
`

const Texto = styled.p`
  font-size: 24px;
  span {
    font-weight: 700;
  }
`;

const Price = styled.p`
  font-size: 30px;
  span {
    font-weight: 700;
  }
`;

const Cotizacion = ({ cotizacion }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    cotizacion;
  return (
    <Container>
      <Imagen
        src={`https://www.cryptocompare.com${IMAGEURL}`}
        alt="Icono de Cripto"
      />
      <div>
        <Price>
          El precio hoy: <span>{PRICE}</span>
        </Price>
        <Texto>
          El precio más alto hoy: <span>{HIGHDAY}</span>
        </Texto>
        <Texto>
          El precio más bajo hoy: <span>{LOWDAY}</span>
        </Texto>
        <Texto>
          Variaciones últimas 24 horas: <span>{CHANGEPCT24HOUR}</span>
        </Texto>
        <Texto>
          Última actualización: <span>{LASTUPDATE}</span>
        </Texto>
      </div>
    </Container>
  );
};

export default Cotizacion;
