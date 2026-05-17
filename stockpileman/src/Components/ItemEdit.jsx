import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { supabase } from "../client";

function ItemEdit() {
  const { id } = useParams();

  const { category, setCategory } = useState('');
  const { item, setItem } = useState('');
  const { dateBought, setDateBought } = useState(new Date());
  const { life, setLife } = useState(new Date());

  const dataSetup = async () => {
    /**
     * The fetched data from the database.
     * @type {{
     *   Id: number,
     *   Name: string,
     *   BoughtAt: Date,
     *   ExpireDate: Date,
     *   CategoryId: number,
     * }}
     */
    const data = await supabase
      .from('Items')
      .select()
      .eq('Id', Number(id));
    const categoryData = await supabase
      .from('Categories')
      .select()
      .eq('Id', data.CategoryId);
    setCategory(categoryData.Name);
    setItem(data.Name);
    setDateBought(data.BoughtAt);
    setLife(data.ExpireDate);
  };

  supabase.auth.onAuthStateChange(
    dataSetup
  );

  return (
    <Form>
      <Form.Group className="mb-3" controlId="NameCat">
        <Form.Label>名称</Form.Label>
        <Form.Control type="text" value={category} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="NameIt">
        <Form.Label>商品名</Form.Label>
        <Form.Control type="text" value={item} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="DateBought">
        <Form.Label>購入日</Form.Label>
        <Form.Control type="date" value={dateBought} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Expire">
        <Form.Label>賞味期限</Form.Label>
        <Form.Control type="date" value={life} />
      </Form.Group>
    </Form>
  );
}

export default ItemEdit;