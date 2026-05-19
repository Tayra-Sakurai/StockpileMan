import AddCmd from './AddCmd';
import { useState } from "react";
import { Form } from "react-bootstrap";
import ItemDetail from './ItemDetail';

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
        <ItemDetail
          category={category}
          onCategoryChange={event => setCategory(parseInt(event.target.value ?? '1'))}
          categoryId="category"
          name={item}
          nameId="item"
          onNameChange={event => setItem(event.target.value)}
          dateB={dateBought}
          dateBId="dateBought"
          onDateBChange={evt => setDateBought(evt.target.value)}
          dateE={life}
          dateEId="life"
          onDateEChange={evt => setLife(evt.target.value)}
          notes={notes}
          notesId="notes"
          onNotesChange={evt => setNotes(evt.target.value)}
        />
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