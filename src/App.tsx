import { useState, useRef } from 'react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import './App.css';
import Logo from '../src/assets/logo.png';

const LogoContainer = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  top: 20px;
  left: 20px;

  img {
    height: 100%;
    width: 100%;
  }
`;

const InputItem = styled.div`
  margin: 10px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  label {
    text-align: left;
    font-size: 14px;
  }

  input {
    width: 300px;

    @media (max-width: 650px) {
      width: 100%;
    }
  }

  select {
    width: 310px;

    @media (max-width: 650px) {
      width: 100%;
    }
  }

  input,
  select {
    border-radius: 5px;
    height: 30px;
    padding-left: 8px;
  }
`;

const ButtonsBox = styled.div`
  margin-top: 20px;

  button {
    background-color: #da9b1e;
    padding: 10px;
    border-radius: 5px;
    border: none;
    font-weight: 700;
    color: #060300;
    margin: 10px;
  }
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 12px;
  font-weight: 700;
`;

/* const Table = styled.table`
  font-size: 12px;
  th {
    width: 75px;
    text-align: center;
  }
`; */

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  let date: Date = new Date();
  const [prospectData, setProspectData] = useState({
    firstContact: '',
    asesor: '',
    name: '',
    nss: '',
    money: '',
    phone: '',
    facebook: '',
    call: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProspectData({
      ...prospectData,
      [name]: value,
    });
  };

  const copyWhatsapp = () => {
    copy(
      `Prospectó: ${prospectData.firstContact} / ${prospectData.asesor} 
${prospectData.name} 
NSS: ${prospectData.nss}
Contaría con:  ${prospectData.money}
Número de teléfono: ${prospectData.phone}
Facebook: ${prospectData.facebook} 
Llamar: ${prospectData.call}`,
      {
        debug: true,
        message: 'Press #{key} to copy',
      }
    );
  };

  const cleanFields = () => {
    setProspectData({
      ...prospectData,
      asesor: prospectData.asesor === 'Ramon' ? 'Ismael' : 'Ramon',
      name: '',
      nss: '',
      money: '',
      phone: '',
      facebook: '',
      call: '',
    });
  };

  /* const copyGoogle = () => {
    copy(
      `
      <table>
      <tr>
      <td>${date.toLocaleDateString().split('/')[0]}</td>
      <td>${prospectData.name}</td>
      <td>${prospectData.money}</td>
      <td>${prospectData.phone}</td>
      <td></td>
      <td>Llamada: ${prospectData.call}</td>
      <td>${prospectData.firstContact}</td>
      <td>${prospectData.asesor}</td>
    </tr></table>`,
      {
        format: 'text/html',
      }
    );
  }; */

  const allActions = () => {
    copy(
      `
      <table>
      <tr>
      <td>${date.toLocaleDateString().split('/')[0]}</td>
      <td>${prospectData.name}</td>
      <td>${prospectData.money}</td>
      <td>${prospectData.phone}</td>
      <td></td>
      <td>Llamada: ${prospectData.call}</td>
      <td>${prospectData.firstContact}</td>
      <td>${prospectData.asesor}</td>
    </tr></table>`,
      {
        format: 'text/html',
      }
    );

    window.open(
      `https://api.whatsapp.com/send?text=Prospectó:%20${prospectData.firstContact}%20/%20${prospectData.asesor}%0A${prospectData.name}%0ANSS:%20${prospectData.nss}%0AContaría%20con:%20${prospectData.money}%0ANúmero%20de%20teléfono:%20${prospectData.phone}%0AFacebook:%20${prospectData.facebook}%0ALlamar:%20${prospectData.call}`
    );
  };

  /* const sendWhatsapp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=Prospectó:%20${prospectData.firstContact}%20/%20${prospectData.asesor}%0A${prospectData.name}%0ANSS:%20${prospectData.nss}%0AContaría%20con:%20${prospectData.money}%0ANúmero%20de%20teléfono:%20${prospectData.phone}%0AFacebook:%20${prospectData.facebook}%0ALlamar:%20${prospectData.call}`
    );
  }; */

  return (
    <>
      <LogoContainer>
        <img src={Logo} alt="" />
        <h1>AlDia</h1>
      </LogoContainer>
      <div className="card">
        <form ref={formRef} onSubmit={allActions}>
          <InputItem>
            <label htmlFor="firstContact">Prospectó</label>
            <input
              type="text"
              name="firstContact"
              id=""
              value={prospectData.firstContact}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </InputItem>
          <InputItem>
            <label htmlFor="asesor">Asignado a</label>
            <select
              name="asesor"
              onChange={handleChange}
              value={prospectData.asesor}
              required
            >
              <option value="">Elige un asesor</option>
              <option value="Ismael">Ismael</option>
              <option value="Ramon">Ramon</option>
            </select>
          </InputItem>
          <h2>Datos del prospecto</h2>
          <InputItem>
            <label htmlFor="name">Nombre del prospecto</label>
            <input
              type="text"
              name="name"
              id=""
              value={prospectData.name}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </InputItem>
          <InputItem>
            <label htmlFor="nss">NSS</label>
            <input
              type="text"
              name="nss"
              id=""
              value={prospectData.nss}
              onChange={handleChange}
              autoComplete="off"
            />
          </InputItem>
          {prospectData.nss.length !== 11 && prospectData.nss.length > 0 ? (
            <ErrorMsg>
              Debe tener 11 numeros, actualmente tiene {prospectData.nss.length}
            </ErrorMsg>
          ) : null}
          <InputItem>
            <label htmlFor="money">Contaria con</label>
            <input
              type="text"
              name="money"
              id=""
              value={prospectData.money}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </InputItem>
          <InputItem>
            <label htmlFor="phone">Telefono</label>
            <input
              type="number"
              name="phone"
              id=""
              value={prospectData.phone}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </InputItem>
          {prospectData.phone.length !== 10 && prospectData.phone.length > 0 ? (
            <ErrorMsg>
              Debe tener 10 numeros, actualmente tiene{' '}
              {prospectData.phone.length}
            </ErrorMsg>
          ) : null}
          <InputItem>
            <label htmlFor="facebook">Facebook</label>
            <input
              type="text"
              name="facebook"
              id=""
              value={prospectData.facebook}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </InputItem>
          <InputItem>
            <label htmlFor="call">Llamar</label>
            <input
              type="text"
              name="call"
              id=""
              value={prospectData.call}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </InputItem>
          <ButtonsBox>
            {/* <button onClick={sendWhatsapp}>Enviar a whatsapp</button>
          <button onClick={copyGoogle}>Copiar para Google Sheet</button> */}
            <button /* onClick={allActions} */>Enviar y copiar</button>
            <button onClick={cleanFields}>Nuevo prospecto</button>
          </ButtonsBox>
        </form>
      </div>
      {/* <div>
        <Table>
          <thead>
            <tr>
              <td>0</td>
              <td>CLIENTE</td>
              <td>PRECALIFICACION</td>
              <td>TEL</td>
              <td>STATUS</td>
              <td>SEGUIMIENTO</td>
              <td>PROSPECTO</td>
              <td>ATENCION</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{date.toLocaleDateString().split('/')[0]}</td>
              <td>{prospectData.name}</td>
              <td>{prospectData.money}</td>
              <td>{prospectData.phone}</td>
              <td></td>
              <td>Llamada: {prospectData.call}</td>
              <td>{prospectData.firstContact}</td>
              <td>{prospectData.asesor}</td>
            </tr>
          </tbody>
        </Table>
      </div> */}
    </>
  );
}

export default App;
