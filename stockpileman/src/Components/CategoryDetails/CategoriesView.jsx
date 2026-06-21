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
import CategoriesTable from "./CategoriesTable";
import { supabase } from "../../client";

/**
 * @param {object} props
 * @param {number=} props.maxItems The maximum number of items to filter.
 */
function CategoriesView({ maxItems = null }) {
  /**
   * @type {[
   *   Array<{
   *     Id: number,
   *     Name: string,
   *     Items: Array<{
   *       CategoryId: number,
   *     }>,
   *   }>,
   *   import("react").Dispatch<import("react").SetStateAction<Array<{
   *     Id: number,
   *     Name: string,
   *     Items: Array<{
   *       CategoryId: number,
   *     }>,
   *   }>>
   * ]}
   */
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const setup = async () => {
      /**
       * @type {import("@supabase/supabase-js").PostgrestResponse<{
       *   Id: number,
       *   Name: string,
       *   Items: {
       *     count: number,
       *   },
       * }>}
       */
      const { data, error } = await supabase
        .from('Categories')
        .select('*, Items(count)');
      if (!data) {
        console.error(error.message);
        return;
      }
      if (maxItems) {
        const filteredItems = data
          .filter(v => v.Items.count <= maxItems);
        setCategories(filteredItems);
        return;
      }
      setCategories(data);
    };
    setup();
  });

  return (
    <CategoriesTable categories={categories} />
  );
}

export default CategoriesView;