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
        .eq('CategoryId', catId)
        .select('CategoryId');
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