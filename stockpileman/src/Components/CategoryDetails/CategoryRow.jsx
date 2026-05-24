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
import { useEffect, useState } from "react";
import { supabase } from "../../client";

/**
 * @typedef {object} Category
 * @property {number} Id The category's ID.
 * @property {string} Name The name of the category.
 */

/**
 * @typedef {object} Item
 * @property {number} CategoryId The ID of the related category.
 */

/**
 * @typedef {import("@supabase/supabase-js").PostgrestResponse<Category>} CategoryResponse
 */

/**
 * @typedef {import("@supabase/supabase-js").PostgrestResponse<Item>} ItemResponse
 */

/**
 * @param {object} props The props.
 * @param {number} props.catId The category id.
 */
function CategoryRow({ catId }) {
  const [catName, setCatName] = useState('');
  const [items, setItems] = useState(0);

  useEffect(() => {
    const setup = async () => {
      /**
       * The response.
       * @type {CategoryResponse}
       */
      const { data: [entry], error } = await supabase
        .from('Categories')
        .select()
        .eq('Id', catId);
      if (!entry) {
        console.error(error);
        return;
      }
      /**
       * @type {number}
       */
      let count;
      /**
       * The item counting response.
       * @type {ItemResponse}
       */
      const { data: result, error: err } = await supabase
        .from('Items')
        .select('CategoryId')
        .eq('CategoryId', catId);
      if (!result) {
        console.error(err);
        count = 0;
      } else {
        count = result.length;
      }
      setCatName(entry.Name);
      setItems(count);
    };
    setup();
  });

  return (
    <tr>
      <td>{catId}</td>
      <td>{catName}</td>
      <td>{items}</td>
    </tr>
  );
}

export default CategoryRow;