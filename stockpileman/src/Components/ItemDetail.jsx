import { Col, Form, Row } from "react-bootstrap";
import CategorySelect from "./CategoryDetails/CategorySelect";

/**
 * @param {object} param0 The parameters given as attributes.
 * @param {string} param0.categoryId The identifier of category selector.
 * @param {number} param0.category The category value.
 * @param {string} param0.name The name of the item.
 * @param {string} param0.nameId The name input's id.
 * @param {string} param0.dateB The 'YYYY-MM-DD' style string which represents when the item was bought.
 * @param {string} param0.dateBId The ID for the input for the date when you bought the item.
 * @param {string} param0.dateEId The identifier of the date input of the expiring date.
 * @param {string} param0.dateE The expiring date.
 * @param {string} param0.notesId The identifier for the note input.
 * @param {string} param0.notes Notes.
 * @param {import("react").ChangeEventHandler<HTMLSelectElement, HTMLSelectElement>} param0.onCategoryChange The event handler which is called when category changed.
 * @param {import("react").ChangeEventHandler<HTMLInputElement, HTMLInputElement>} param0.onNameChange The handler called when the name changes.
 * @param {import("react").ChangeEventHandler<HTMLInputElement, HTMLInputElement>} param0.onDateBChange The handler called when dateB changes.
 * @param {import("react").ChangeEventHandler<HTMLInputElement, HTMLInputElement>} param0.onDateEChange The handler called when the expiring date has changed.
 * @param {import("react").ChangeEventHandler<HTMLTextAreaElement, HTMLTextAreaElement>} param0.onNotesChange The handler called when the notes have changed.
 */
function ItemDetail({ categoryId, category, name, nameId, dateBId, dateB, dateEId, dateE, notesId, notes, onCategoryChange, onNameChange, onDateBChange, onDateEChange, onNotesChange }) {
  return (
    <>
      <CategorySelect
        value={category}
        controlId={categoryId}
        onChange={onCategoryChange}
      />
      <Form.Group className="mb-3" controlId={nameId}>
        <Form.Label>商品名</Form.Label>
        <Form.Control value={name} onChange={onNameChange} />
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} controlId={dateBId}>
          <Form.Label>購入日</Form.Label>
          <Form.Control type="date" value={dateB} onChange={onDateBChange} />
        </Form.Group>
        <Form.Group as={Col} controlId={dateEId}>
          <Form.Label>賞味期限</Form.Label>
          <Form.Control type="date" value={dateE} onChange={onDateEChange} />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId={notesId}>
        <Form.Label>備考</Form.Label>
        <Form.Control as="textarea" value={notes} onChange={onNotesChange} rows="3" />
      </Form.Group>
    </>
  );
}

export default ItemDetail;