import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterForm from "./FilterForm";
import { supabase } from "../client";
import ItemTable from './Views/ItemTable';

function FilteredResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);

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