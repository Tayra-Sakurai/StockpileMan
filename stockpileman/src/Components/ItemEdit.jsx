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
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";
import OpCmd from "./OpCmd";
import ItemDetail from "./ItemDetail.jsx";
import { useForm } from "react-hook-form";

function ItemEdit() {
  const { id } = useParams();
  let itid = parseInt(id);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    setValue,
  } = useForm({
    async defaultValues() {
      const {
        data: [entry],
        error,
      } = await supabase
        .from('Items')
        .select()
        .eq('Id', itid);
      if (!entry) {
        console.error(error);
        return;
      }
      else {
        return {
          Category: entry.CategoryId.toString(),
          Name: entry.Name,
          DateBought: new Date(entry.BoughtAt).toISOString().replace(/T.*$/i, ''),
          Life: new Date(entry.ExpireDate).toISOString().replace(/T.*$/i, ''),
          Notes: entry.Notes,
        };
      }
    },
  });

  /**
   * @param {import("react-hook-form").FieldValues} data The data.
   */
  const updateCallback = async data => {
    await supabase
      .from('Items')
      .update({
        Name: data.Name,
        CategoryId: parseInt(data.Category),
        Notes: data.Notes,
        BoughtAt: new Date(data.DateBought).toISOString(),
        ExpireDate: new Date(data.Life).toISOString(),
      })
      .eq('Id', itid);
    navigate('/View/Items');
  };

  return (
    <Form onSubmit={handleSubmit(updateCallback)}>
      <ItemDetail
        categoryId="Category"
        nameId="Name"
        dateBId="DateBought"
        dateEId="Life"
        notesId="Notes"
        register={register}
        errors={errors}
        setValue={setValue}
      />
      <OpCmd
        identity={id}
        table="Items"
      />
    </Form>
  );
}

export default ItemEdit;