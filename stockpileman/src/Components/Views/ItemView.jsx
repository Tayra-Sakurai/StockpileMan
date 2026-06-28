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
import ItemTable from './ItemTable';
import { useEffect, useState } from "react";
import { supabase } from "../../client";
import { Link } from 'react-router-dom';

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
      <p><Link to="/Add">新規</Link></p>
      <ItemTable items={items} />
    </>
  );
}

export default ItemView;