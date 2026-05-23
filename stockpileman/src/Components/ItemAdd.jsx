import AddCmd from './AddCmd';
import { Form } from "react-bootstrap";
import ItemDetail from './ItemDetail';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

/**
 * @typedef {import("react-hook-form").FieldValues} SuperFormData
 * @property {string} category The category number.
 * @property {string} item The item name.
 * @property {string} dateBought The date when the item was bought.
 * @property {string} life The expiring date.
 * @property {string} notes The notes.
 */

function ItemAdd() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  /**
   * The form submission handler.
   * @param {SuperFormData} data The form data.
   */
  const addItem = async data => {
    await supabase
      .from('Items')
      .insert({
        CategoryId: parseInt(data.category),
        Name: data.item,
        BoughtAt: new Date(data.boughtAt).toISOString(),
        ExpireDate: new Date(data.life).toISOString(),
        Notes: data.notes,
      });
    navigate('/View');
  };

  return (
    <>
      <h1>項目を追加する</h1>
      <p>以下のフォームから項目を追加します．</p>
      <Form onSubmit={handleSubmit(addItem)}>
        <ItemDetail
          categoryId="category"
          nameId="item"
          dateBId="dateBought"
          dateEId="life"
          notesId="notes"
          register={register}
          errors={errors}
        />
        <AddCmd />
      </Form>
    </>
  );
}

export default ItemAdd;