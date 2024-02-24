import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class ServerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: '',
      puerto: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { ip, puerto } = this.state;
    // Aquí puedes hacer lo que necesites con la IP y el puerto, como enviarlos a través de un socket
    console.log('IP:', ip);
    console.log('Puerto:', puerto);
    // Limpiar el formulario después de enviar
    this.setState({ ip: '', puerto: '' });
  }

  render() {
    const { ip, puerto } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="ip">
          <Form.Label>IP:</Form.Label>
          <Form.Control type="text" name="ip" value={ip} onChange={this.handleChange} placeholder="Ingrese la dirección IP" />
        </Form.Group>
        <Form.Group controlId="puerto">
          <Form.Label>Puerto:</Form.Label>
          <Form.Control type="text" name="puerto" value={puerto} onChange={this.handleChange} placeholder="Ingrese el puerto" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    );
  }
}

export default ServerForm;
