import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterForm from "./FilterForm";
import { supabase } from "../client";
import ItemTable from './Views/ItemTable';

function FilteredResult() {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);

  useEffect(
    () => {
      const search = async () => {
        const { data: [category], error } = await supabase
          .from('Categories')
          .select()
          .eq('Name', searchParams.get('category'));
        if (!category) {
          console.error(error);
          return;
        }
        /**
         * @type {number}
         */
        const id = category.Id;
        const {
          data: items,
          error: err
        } = await supabase
          .from('Items')
          .select(`
              *,
              Categories(
                Id,
                Name
              )
          `)
          .eq('CategoryId', id);
        if (items.length == 0) {
          console.error(err);
          return;
        } else {
          setItems(items);
        }
      };
      search();
    }, [searchParams]
  );

  return (
    <>
      <h1>検索</h1>
      <h2>検索フォーム</h2>
      <FilterForm />
      <h2>検索結果</h2>
      <ItemTable items={items} />
    </>
  );
}

export default FilteredResult;