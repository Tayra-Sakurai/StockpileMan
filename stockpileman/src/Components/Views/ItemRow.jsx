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
import { Link } from "react-router-dom";

/**
 * The item table row component.
 * @param {Object} props The props.
 * @param {number} props.dataId The data entry ID.
 * @param {string} props.name The nameof the item.
 * @param {string} props.category The category name.
 * @param {string} props.expireDate The string which represents the life.
 * @returns
 */
function ItemRow(props) {
  const dId = props.dataId;
  const name = props.name;
  const category = props.category;
  const expireDate = new Date(props.expireDate).toISOString().replace(/T.*$/, '');
  const life = new Date(props.expireDate).getTime();
  const today = new Date();
  today.setTime(today.getTime() + 86400000 * 7);

  return (
    <tr>
      <td className={life < today ? "text-danger" : ""}>{dId}</td>
      <td className={life < today ? "text-danger" : ""}>{category}</td>
      <td className={life < today ? "text-danger" : ""}>
        {
          life < today ?
            (
              <strong>{name}</strong>
            ) :
            name
        }
      </td>
      <td className={life < today ? "text-danger" : ""}>
        {
          life < today ?
            (
              <strong>{expireDate}</strong>
            ) : expireDate
        }
      </td>
      <td>
        <Link to={`/Edit/${dId}`}>編集</Link>
      </td>
    </tr>
  );
}

export default ItemRow;