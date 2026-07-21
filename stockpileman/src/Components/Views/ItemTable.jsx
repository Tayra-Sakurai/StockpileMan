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
import { Table } from "react-bootstrap";
import ItemRow from "./ItemRow";

/**
 * @param {Object} props The properties.
 * @param {Array<Item>} props.items The items which are to be displayed.
 */
function ItemTable(props) {
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
   * The raw item data.
   * @type {Array<Item>}
   */
  const items = props.items;
  items.sort(
    function (a, b) {
      if (a.ExpireDate.toLocaleLowerCase() == 'infinity' && b.ExpireDate.toLocaleLowerCase() != 'infinity') {
        return -1;
      } else if (b.ExpireDate.toLocaleLowerCase() == 'infinity' && a.ExpireDate.toLocaleLowerCase() != 'infinity') {
        return 1;
      } else if (a.ExpireDate == b.ExpireDate || Date.parse(a.ExpireDate) == Date.parse(b.ExpireDate)) {
        return a.Name.localeCompare(b.Name) || a.Id - b.Id;
      } else {
        return Date.parse(b.ExpireDate) - Date.parse(a.ExpireDate);
      }
    }
  );

  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>登録 ID</th>
          <th>名称</th>
          <th>商品名</th>
          <th>賞味期限</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <ItemRow
            dataId={item.Id}
            name={item.Name}
            expireDate={item.ExpireDate}
            category={item.Categories.Name}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default ItemTable;