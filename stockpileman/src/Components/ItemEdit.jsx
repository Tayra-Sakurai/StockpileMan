import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";
import OpCmd from "./OpCmd";
import ItemDetail from "./ItemDetail";

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
      <ItemDetail
        category={category}
        categoryId="Category"
        onCategoryChange={event => setCategory(parseInt(event.target.value))}
        name={item}
        nameId="Name"
        onNameChange={event => setItem(event.target.value)}
        dateB={dateBought}
        dateBId="DateBought"
        onDateBChange={event => setDateBought(event.target.value)}
        dateE={life}
        dateEId="Life"
        onDateEChange={event => setLife(event.target.value)}
        notes={notes}
        notesId="Notes"
        onNotesChange={event => setNotes(event.target.value)}
      />
      <OpCmd
        identity={id}
        table="Items"
        updateCallback={updateCallback}
      />
    </Form>
  );
}

export default ItemEdit;