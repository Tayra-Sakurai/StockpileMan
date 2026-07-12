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
import { useSearchParams } from "react-router-dom";
import FilterForm from "./FilterForm";
import { supabase } from "../client";
import ItemTable from './Views/ItemTable';
import CategoriesView from "./CategoryDetails/CategoriesView";
import Collapse from "react-bootstrap/Collapse";

function FilteredResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [opened, setOpened] = useState(true);

  useEffect(
    () => {
      const search = async () => {
        /**
         * @typedef Item
         * @property {number} Id
         * @property {string} Name
         * @property {string} BoughtAt
         * @property {string} ExpireDate
         * @property {number} CategoryId
         * @property {{
         *   Name: string,
         * }} Categories
         */

        const category = searchParams.get('category');
        const name = searchParams.get('q');
        const d1 = searchParams.get('d1');
        const d2 = searchParams.get('d2');
        /**
         * @type {{
         *   data: ?Array<Item>,
         *   error: ?Error,
         * }}
         */
        const { data: matches, error } = await supabase
          .from('Items')
          .select('*, Categories(Name)');
        /**
         * @type {Array<Item>}
         */
        const result = new Array();
        if (!(matches instanceof Array)) {
          console.error('An error occurred in FilteredResult.jsx.');
          console.error(error);
          return;
        }
        for (const datumn of matches) {
          if (category) {
            if (datumn.Categories.Name != category) {
              continue;
            }
          }
          if (name) {
            const phrases = name.split(/\s/g);
            /**
             * The OR search operation.
             * @type {Array<boolean>}
             */
            const sResult = phrases.map(value => datumn.Name.search(value) > -1);
            if (!sResult.includes(true)) {
              continue;
            }
          }
          if (d1) {
            if (new Date(d1) > new Date(datumn.ExpireDate)) {
              continue;
            }
          }
          if (d2) {
            console.group(['Data']);
            console.info('d2=');
            console.info(new Date(d2));
            console.info('ExpireDate=');
            console.info(new Date(datumn.ExpireDate));
            console.groupEnd();
            if (new Date(d2) < new Date(datumn.ExpireDate)) {
              continue;
            }
          }
          result.push(datumn);
        }
        setItems(result);
      };
      search();
    }, [searchParams]
  );

  return (
    <>
      <h1
        onClick={() => setOpened(!opened)}
        aria-aria-controls="collapse-table"
        aria-aria-expanded={opened}
      >
        在庫が少ない品目
      </h1>
      <Collapse in={opened}>
        <div id="collapse-table">
          <CategoriesView maxItems={1} />
        </div>
      </Collapse>
      <h1>検索</h1>
      <h2>検索フォーム</h2>
      <FilterForm
        searchParam={searchParams}
        setSearchParam={setSearchParams}
      />
      <h2>検索結果</h2>
      <ItemTable items={items} />
    </>
  );
}

export default FilteredResult;