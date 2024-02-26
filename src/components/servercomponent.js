import React from 'react';
import Card from 'react-bootstrap/Card';

class ServerComponent extends React.Component {
  render() {
    const { total, libre, utilizado, pid } = this.props;

    return (
      <Card className="server-card" style={{ marginLeft:'10px' ,border: '1px solid #ccc',justifyContent: 'center', alignItems: 'center', display:'flex', borderRadius: '5px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '200px', height: '200px' }}>
        <Card.Img variant="top" src="/images/server.png" alt="" style={{ maxHeight: '20px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Text>
            <p><strong>PID:</strong> {pid}</p>
            <p><strong>Total:</strong> {total}</p>
            <p><strong>Espacio Libre:</strong> {libre}</p>
            <p><strong>Espacio Ocupado:</strong> {utilizado}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default ServerComponent;


