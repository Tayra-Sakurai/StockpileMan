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

function ItemRow(props) {
  const dId = props.dataId;
  const name = props.name;
  const category = props.category;
  const expireDate = new Date(props.expireDate).toISOString().replace(/T.*$/, '');

  return (
    <tr>
      <td>{dId}</td>
      <td>{category}</td>
      <td>{name}</td>
      <td>{expireDate}</td>
      <td>
        <Link to={`/Edit/${dId}`}>編集</Link>
      </td>
    </tr>
  );
}

export default ItemRow;