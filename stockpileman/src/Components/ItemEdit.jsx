import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { supabase } from "../client";

function ItemEdit() {
  const { id } = useParams();

  const [ category, setCategory ] = useState('');
  const [ item, setItem ] = useState('');
  const curDate = new Date();
  const curStr = curDate.toISOString().replace(/T.*$/, '');
  const [ dateBought, setDateBought ] = useState(curStr);
  const [life, setLife] = useState(curStr);
  const [notes, setNotes] = useState('');

  useEffect(
    () => {
      const dataSetup = async () => {
        const { data: [i], error } = await supabase
          .from("Items")
          .select('*, Categories(Name)')
          .eq('Id', parseInt(id));
        if (error != null)
          console.error(error);
        else if (i == null || i === undefined) {
          console.error('No data has been returned.');
          return;
        }
        console.log(item);
        setCategory(i.Categories.Name);
        setItem(i.Name);
        /**
         * The date when the item was bought.
         * @type {string}
         */
        const bDate = i.BoughtAt;
        /**
         * The expiration date.
         * @type {string}
         */
        const eDate = i.ExpireDate;
        setDateBought(`${bDate.replace(/T.*$/i, '')}`);
        setLife(`${eDate.replace(/T.*$/i, '')}`);
        setNotes(i.Notes ?? '');
      };
      dataSetup();
    }, [id]
  )

  return (
    <Form>
      <Form.Group className="mb-3" controlId="NameCat">
        <Form.Label>名称</Form.Label>
        <Form.Control type="text" value={category} onChange={evt => setCategory(evt.target.value)} />
      </Form.Group>
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
    </Form>
  );
}

export default ItemEdit;