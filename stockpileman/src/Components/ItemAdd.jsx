import AddCmd from './AddCmd';
import { useState } from "react";
import { Form } from "react-bootstrap";
import CategorySelect from './CategoryDetails/CategorySelect';

function ItemAdd() {
  const [category, setCategory] = useState(1);
  const [item, setItem] = useState('');
  const [dateBought, setDateBought] = useState(new Date().toISOString().replace(/T.*$/, ''));
  const [life, setLife] = useState(new Date().toISOString().replace(/T.*$/, ''));
  const [notes, setNotes] = useState('');

  return (
    <>
      <h1>項目を追加する</h1>
      <p>以下のフォームから項目を追加します．</p>
      <Form>
        <CategorySelect value={category} onChange={event => setCategory(parseInt(event.target.value))} />
        <Form.Group className="mb-3" controlId="NameIt">
          <Form.Label>商品名</Form.Label>
          <Form.Control type="text" value={item} onChange={evt => setItem(evt.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="DateBought">
          <Form.Label>購入日</Form.Label>
          <Form.Control type="date" value={dateBought} onChange={evt => setDateBought(`${evt.target.valueAsDate.toISOString().replace(/T.*$/i, '')}`)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Expire">
          <Form.Label>賞味期限</Form.Label>
          <Form.Control type="date" value={life} onChange={evt => setLife(`${evt.target.valueAsDate.toISOString().replace(/T.*$/i, '')}`)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Notes">
          <Form.Label>備考</Form.Label>
          <Form.Control as="textarea" rows={3} value={notes} onChange={evt => setNotes(evt.target.value)} />
        </Form.Group>
        <AddCmd
          data={{
            Name: item,
            CategoryId: category,
            BoughtAt: new Date(dateBought).toISOString(),
            ExpireDate: new Date(life).toISOString(),
            Notes: notes,
          }}
          table="Items"
        />
      </Form>
    </>
  );
}

export default ItemAdd;