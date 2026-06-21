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
import CategoryRow from "./CategoryRow";

/**
 * @typedef {Object} Items
 * @property {number} count The number of related items.
 */

/**
 * @typedef {object} Category
 * @property {number} Id The identifier.
 * @property {string} Name The name.
 * @property {Items} Items The related items.
 */

/**
 * @param {object} props
 * @param {Array<Category>} props.categories The categories to be displayed.
 */
function CategoriesTable({ categories }) {
  categories.sort((a, b) => a.Items.count - b.Items.count || a.Name.localeCompare(b.Name) || a.Id - b.Id);
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>登録 ID</th>
          <th>名称</th>
          <th>数量</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(c => (
          <CategoryRow category={c} />
        ))}
      </tbody>
    </Table>
  );
}

export default CategoriesTable;