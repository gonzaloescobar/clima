import React, { Component } from 'react';
import Header from './Header';
import Formulario from './Formulario';
import Clima from './Clima';
import Error from './Error';

class App extends Component {

  state = {
    error: '',
    consulta: {},
    resultado: {}
  }

  componentDidMount(){
    this.setState({
      error: false
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.consulta !== this.state.consulta){
      this.consultarApi();
    }
  }

  consultarApi = () => {
    const {ciudad, pais} = this.state.consulta;
    if(!ciudad || !pais) return null;

    const appId = 'ffe4b3ca9884456a0d745a65c5d52a05';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    //query con fetch api
    fetch(url)
    .then(respuesta => {
      return respuesta.json();
    })
    .then(datos => {
      this.setState({
        resultado: datos
      })
    })
    .catch(error => {
      console.log(error)
    })


  }

  datosConsulta = respuesta => {
    if(respuesta.ciudad === '' || respuesta.pais === ''){
      this.setState({
        error: true
      })
    } else {
      this.setState({
        consulta: respuesta,
        error: false
      })
    }
  }

  render() {
    const error = this.state.error;
    let resultado;
    if(error){
      resultado = <Error mensaje="Ambos campos son obligatorios" />
    }else{
      resultado = <Clima resultado = {this.state.resultado}/>
    }

    return (
     <div className="app">
      <Header
        titulo = 'Clima React'
      />
      <Formulario 
        datosConsulta = {this.datosConsulta}
      />
      {resultado}
     </div>
    );
  }
}

export default App;
