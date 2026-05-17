import ItemTable from './ItemTable';
import { useEffect, useState } from "react";
import { supabase } from "../../client";

function ItemView() {
  /**
   * @typedef Item
   * @type {object}
   * @property {string} Name
   * @property {number} Id
   * @property {number} CategoryId
   * @property {string} BoughtAt
   * @property {string} ExpireDate
   * @property {?string} Notes
   * @property {{
   *   Name: string,
   *   Id: number
   * }} Categories
   */

  /**
   * The items to be displayed.
   * @type {[Array<Item>, Function]}
   */
  const [items, setItems] = useState([]);

  useEffect(
    () => {
      const setupItems = async () => {
        /**
         * The data and the value.
         * @type {{
         *   data: Array<Item>,
         *   error:Error
         * }}
         */
        const { data, error } = await supabase
          .from('Items')
          .select('*, Categories(Id, Name)');
        if (error) {
          console.error('No data found');
          return;
        } else if (!data) {
          console.error('No data.');
          return;
        } else {
          setItems(data);
        }
      };
      setupItems();
    }
  );

  return (
    <>
      <h1>在庫一覧</h1>
      <ItemTable items={items} />
    </>
  );
}

export default ItemView;