import React from 'react';
import Card from 'react-bootstrap/Card';

class ServerComponent extends React.Component {
  render() {
    const { totalAlmacenamiento, espacioLibre, espacioOcupado } = this.props;

    return (
      <Card className="server-card" style={{ border: '1px solid #ccc',justifyContent: 'center', alignItems: 'center', display:'flex', borderRadius: '5px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '200px', height: '200px' }}>
        <Card.Img variant="top" src="/images/server.png" alt="" style={{ maxHeight: '20px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Text>
            <p><strong>Total:</strong> {totalAlmacenamiento}</p>
            <p><strong>Espacio Libre:</strong> {espacioLibre}</p>
            <p><strong>Espacio Ocupado:</strong> {espacioOcupado}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default ServerComponent;


