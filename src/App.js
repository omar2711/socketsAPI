import React from 'react';
import ServerComponent from './components/servercomponent.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      servers: [],
      ip: '',
      puerto: ''
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  agregarServer = () => {
    const { servers, ip, puerto } = this.state;
    this.setState({ 
      servers: [...servers, <ServerComponent key={servers.length} totalAlmacenamiento="100 GB" espacioLibre="30 GB" espacioOcupado="70 GB" />],
      ip: '',
      puerto: ''
    });
  }

  render() {
    const { servers, ip, puerto } = this.state;

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
          <Form style={{ marginBottom: '20px' }}>
            <Form.Group controlId="ip">
              <Form.Label>IP:</Form.Label>
              <Form.Control type="text" name="ip" value={ip} onChange={this.handleChange} placeholder="Ingrese la dirección IP" />
            </Form.Group>
            <Form.Group controlId="puerto">
              <Form.Label>Puerto:</Form.Label>
              <Form.Control type="text" name="puerto" value={puerto} onChange={this.handleChange} placeholder="Ingrese el puerto" />
            </Form.Group>
            <Button onClick={this.agregarServer}>Agregar Servidor</Button>
          </Form>
          {servers.map((server, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              {server}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
