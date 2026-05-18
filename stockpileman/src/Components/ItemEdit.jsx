import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";
import OpCmd from "./OpCmd";
import CategorySelect from './CategoryDetails/CategorySelect';

function ItemEdit() {
  const { id } = useParams();
  let itid = parseInt(id);

  const [ category, setCategory ] = useState(1);
  const [ item, setItem ] = useState('');
  const curDate = new Date();
  const curStr = curDate.toISOString().replace(/T.*$/, '');
  const [ dateBought, setDateBought ] = useState(curStr);
  const [life, setLife] = useState(curStr);
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  useEffect(
    () => {
      const dataSetup = async () => {
        const { data: [i], error } = await supabase
          .from("Items")
          .select()
          .eq('Id', parseInt(id));
        if (error != null)
          console.error(error);
        else if (i == null) {
          console.error('No data has been returned.');
          return;
        }
        console.log(item);
        setCategory(i.CategoryId);
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
  );

  const updateCallback = async () => {
    await supabase
      .from('Items')
      .update({
        Name: item,
        CategoryId: category,
        Notes: notes,
        BoughtAt: new Date(dateBought).toISOString(),
        ExpireDate: new Date(life).toISOString()
      })
      .eq('Id', itid);
    navigate('/View');
  };

  return (
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
      <OpCmd
        identity={id}
        table="Items"
        updateCallback={updateCallback}
      />
    </Form>
  );
}

export default ItemEdit;