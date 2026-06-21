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

/**
 * @typedef {object} Item
 * @property {number} CategoryId The ID of the related category.
 */

/**
 * @typedef {object} Category
 * @property {number} Id The category's ID.
 * @property {string} Name The name of the category.
 * @property {Array<Item>} Items The related Items.
 */

/**
 * @typedef {import("@supabase/supabase-js").PostgrestResponse<Category>} CategoryResponse
 */

/**
 * @typedef {import("@supabase/supabase-js").PostgrestResponse<Item>} ItemResponse
 */

/**
 * @param {object} props The props.
 * @param {Category} props.category The category.
 */
function CategoryRow({ category }) {
  return (
    <tr>
      <td>{category.Id}</td>
      <td>{category.Name}</td>
      <td>{category.Items.length}</td>
    </tr>
  )
}

export default CategoryRow;