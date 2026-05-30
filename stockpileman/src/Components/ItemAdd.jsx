/**
 * @fileoverview This is a part of StockpileMan
 * @copyright Copyright (C) 2026 Tayra Sakurai
 * @license This is a part of StockpileMan
 * Copyright (C) 2026 Tayra Sakurai
 * 
 * StockpileMan is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * 
 * StockpileMan is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License along with StockpileMan. If not, see <https://www.gnu.org/licenses/>.
 */
import AddCmd from './AddCmd';
import { Form } from "react-bootstrap";
import ItemDetail from './ItemDetail';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import dateInputString from '../Utilities/DateInputString';

/**
 * @typedef {import("react-hook-form").FieldValues} SuperFormData
 * @property {string} category The category number.
 * @property {string} item The item name.
 * @property {string} dateBought The date when the item was bought.
 * @property {string} life The expiring date.
 * @property {string} notes The notes.
 */

function ItemAdd() {
  const currentDate = dateInputString(new Date());
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      category: null,
      item: '',
      dateBought: currentDate,
      life: currentDate,
      notes: '',
    },
  });
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
        BoughtAt: new Date(data.dateBought).toISOString(),
        ExpireDate: new Date(data.life).toISOString(),
        Notes: data.notes,
      });
    navigate('/View/Items');
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
          setValue={setValue}
        />
        <AddCmd />
      </Form>
    </>
  );
}

export default ItemAdd;