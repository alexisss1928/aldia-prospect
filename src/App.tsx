import { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  let date: Date = new Date();
  const [prospectData, setProspectData] = useState({
    PROSPECTO: '',
    ATENCION: '',
    CLIENTE: '',
    NSS: '',
    PRECALIFICACIÓN: '',
    TEL: '',
    FACEBOOK: '',
    SEGUIMIENTO: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProspectData({
      ...prospectData,
      [name]: value,
    });
  };

  /* const copyWhatsapp = () => {
    copy(
      `Prospectó: ${prospectData.PROSPECTO} / ${prospectData.ATENCION} 
${prospectData.CLIENTE} 
NSS: ${prospectData.NSS}
Contaría con:  ${prospectData.PRECALIFICACIÓN}
Número de teléfono: ${prospectData.TEL}
FACEBOOK: ${prospectData.FACEBOOK} 
Llamar: ${prospectData.SEGUIMIENTO}`,
      {
        debug: true,
        message: 'Press #{key} to copy',
      }
    );
  }; */

  const cleanFields = () => {
    setProspectData({
      ...prospectData,
      ATENCION: prospectData.ATENCION === 'Ramon' ? 'Ismael' : 'Ramon',
      CLIENTE: '',
      NSS: '',
      PRECALIFICACIÓN: '',
      TEL: '',
      FACEBOOK: '',
      SEGUIMIENTO: '',
    });
  };

  /* const copyGoogle = () => {
    copy(
      `
      <table>
      <tr>
      <td>${date.toLocaleDateString().split('/')[0]}</td>
      <td>${prospectData.CLIENTE}</td>
      <td>${prospectData.PRECALIFICACIÓN}</td>
      <td>${prospectData.TEL}</td>
      <td></td>
      <td>Llamada: ${prospectData.SEGUIMIENTO}</td>
      <td>${prospectData.PROSPECTO}</td>
      <td>${prospectData.ATENCION}</td>
    </tr></table>`,
      {
        format: 'text/html',
      }
    );
  }; */

  const allActions = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* copy(
      `
      <table>
      <tr>
      <td>${date.toLocaleDateString().split('/')[0]}</td>
      <td>${prospectData.CLIENTE}</td>
      <td>${prospectData.PRECALIFICACIÓN}</td>
      <td>${prospectData.TEL}</td>
      <td></td>
      <td>Llamada: ${prospectData.SEGUIMIENTO}</td>
      <td>${prospectData.PROSPECTO}</td>
      <td>${prospectData.ATENCION}</td>
    </tr></table>`,
      {
        format: 'text/html',
      }
    ); */
    const scriptURL =
      'https://script.google.com/macros/s/AKfycbzk7rTMMzVKQpJB55nJTMy-9UOmamp2EVLEoKqbkvCjQ_3-Nk6_Y3TJ94wj-E2uuesBtQ/exec';
    /* const scriptURL =
      'https://script.google.com/macros/s/AKfycbxIf9NoWRoAU0QWAZnaOZ4uOYAXOlCC3vCORLh71-zPHMl7kN-uXlA2E15BfQ86SrFM/exec'; */

    //submitButton.disabled = true
    let requestBody: any = new FormData();
    requestBody.append('DATE', new Date().getDate());
    requestBody.append('CLIENTE', prospectData.CLIENTE);
    requestBody.append('PRECALIFICACIÓN', prospectData.PRECALIFICACIÓN);
    requestBody.append('TEL', prospectData.TEL);
    requestBody.append('SEGUIMIENTO', prospectData.SEGUIMIENTO);
    requestBody.append('PROSPECTO', prospectData.PROSPECTO);
    requestBody.append('ATENCION', prospectData.ATENCION);

    axios
      .post(scriptURL, requestBody)
      .then(function (response) {
        console.log(response, 'good good');
      })
      .catch(function (error) {
        console.log(error, 'bad bad');
      });

    window.open(
      `https://api.whatsapp.com/send?text=Prospectó:%20${prospectData.PROSPECTO}%20/%20${prospectData.ATENCION}%0A${prospectData.CLIENTE}%0ANSS:%20${prospectData.NSS}%0AContaría%20con:%20${prospectData.PRECALIFICACIÓN}%0ANúmero%20de%20teléfono:%20${prospectData.TEL}%0AFACEBOOK:%20${prospectData.FACEBOOK}%0ALlamar:%20${prospectData.SEGUIMIENTO}`
    );
  };

  /* const sendWhatsapp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=Prospectó:%20${prospectData.PROSPECTO}%20/%20${prospectData.ATENCION}%0A${prospectData.CLIENTE}%0ANSS:%20${prospectData.NSS}%0AContaría%20con:%20${prospectData.PRECALIFICACIÓN}%0ANúmero%20de%20teléfono:%20${prospectData.TEL}%0AFACEBOOK:%20${prospectData.FACEBOOK}%0ALlamar:%20${prospectData.SEGUIMIENTO}`
    );
  }; */

  return (
    <>
      <LogoContainer>
        <img src={Logo} alt="" />
        <h1>AlDia</h1>
      </LogoContainer>
      <div className="card">
        <form /* ref={formRef} */ onSubmit={allActions}>
          <InputItem>
            <label htmlFor="PROSPECTO">Prospectó</label>
            <input
              type="text"
              name="PROSPECTO"
              id=""
              value={prospectData.PROSPECTO}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </InputItem>
          <InputItem>
            <label htmlFor="ATENCION">Asignado a</label>
            <select
              name="ATENCION"
              onChange={handleChange}
              value={prospectData.ATENCION}
              required
            >
              <option value="">Elige un asesor</option>
              <option value="Ismael">Ismael</option>
              <option value="Ramon">Ramon</option>
            </select>
          </InputItem>
          <h2>Datos del prospecto</h2>
          <InputItem>
            <label htmlFor="CLIENTE">Nombre del prospecto</label>
            <input
              type="text"
              name="CLIENTE"
              id=""
              value={prospectData.CLIENTE}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </InputItem>
          <InputItem>
            <label htmlFor="NSS">NSS</label>
            <input
              type="text"
              name="NSS"
              id=""
              value={prospectData.NSS}
              onChange={handleChange}
              autoComplete="off"
            />
          </InputItem>
          {prospectData.NSS.length !== 11 && prospectData.NSS.length > 0 ? (
            <ErrorMsg>
              Debe tener 11 numeros, actualmente tiene {prospectData.NSS.length}
            </ErrorMsg>
          ) : null}
          <InputItem>
            <label htmlFor="PRECALIFICACIÓN">Contaria con</label>
            <input
              type="text"
              name="PRECALIFICACIÓN"
              id=""
              value={prospectData.PRECALIFICACIÓN}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </InputItem>
          <InputItem>
            <label htmlFor="TEL">Telefono</label>
            <input
              type="number"
              name="TEL"
              id=""
              value={prospectData.TEL}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </InputItem>
          {prospectData.TEL.length !== 10 && prospectData.TEL.length > 0 ? (
            <ErrorMsg>
              Debe tener 10 numeros, actualmente tiene {prospectData.TEL.length}
            </ErrorMsg>
          ) : null}
          <InputItem>
            <label htmlFor="FACEBOOK">FACEBOOK</label>
            <input
              type="text"
              name="FACEBOOK"
              id=""
              value={prospectData.FACEBOOK}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </InputItem>
          <InputItem>
            <label htmlFor="SEGUIMIENTO">Llamar</label>
            <input
              type="text"
              name="SEGUIMIENTO"
              id=""
              value={prospectData.SEGUIMIENTO}
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
              <td>{prospectData.CLIENTE}</td>
              <td>{prospectData.PRECALIFICACIÓN}</td>
              <td>{prospectData.TEL}</td>
              <td></td>
              <td>Llamada: {prospectData.SEGUIMIENTO}</td>
              <td>{prospectData.PROSPECTO}</td>
              <td>{prospectData.ATENCION}</td>
            </tr>
          </tbody>
        </Table>
      </div> */}
    </>
  );
}

export default App;
