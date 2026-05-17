import { Form } from "react-bootstrap";

function ItemEdit() {
  return (
    <Form>
      <Form.Group className="mb-3" controlI="NameCat">
        <Form.Label>名称</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
    </Form>
  );
}

export default ItemEdit;