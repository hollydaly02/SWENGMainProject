
import Dropdown from 'react-bootstrap/Dropdown';

function BasicExample() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        View APIs
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Area</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Weather</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Air Pollution</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    
  );
}

export default BasicExample;