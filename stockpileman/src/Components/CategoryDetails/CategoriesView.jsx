import { useEffect, useState } from "react";
import CategoriesTable from "./CategoriesTable";
import { supabase } from "../../client";

function CategoriesView() {
  /**
   * @type {[
   *   Array<{
   *     Id: number,
   *     Name: string,
   *   }>,
   *   import("react").Dispatch<import("react").SetStateAction<Array<{
   *     Id: number,
   *     Name: string,
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
       * }>}
       */
      const { data, error } = await supabase
        .from('Categories')
        .select();
      if (!data) {
        console.error(error.message);
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