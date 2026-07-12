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
import { Button } from "react-bootstrap";
import { supabase } from '../client';
import { useNavigate } from "react-router-dom";

function OpCmd(props) {
  /**
   * @callback Update
   * @param {Event} event The event object of the click event.
   */

  const navigate = useNavigate();

  /**
   * Deletes the data.
   * @param {number} id The identifier of the element.
   * @param {string} table The name of the table.
   */
  async function DeleteData(id, table) {
    await supabase
      .from(table)
      .delete()
      .eq('Id', id);
    navigate(-1);
  }

  /**
   * The identifier.
   * @type {string}
   */
  const id = props.identity;
  /**
   * The table's name.
   * @type {string}
   */
  const table = props.table;

  return (
    <>
      <Button
        variant="danger"
        type="button"
        onClick={async () => await DeleteData(parseInt(id), table)}
      >
        使用
      </Button>
      <Button
        variant="primary"
        type="submit"
      >
        更新
      </Button>
    </>
  );
}

export default OpCmd;