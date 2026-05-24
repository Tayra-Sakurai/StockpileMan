import { Table } from "react-bootstrap";
import CategoryRow from "./CategoryRow";

/**
 * @typedef {object} Category
 * @property {number} Id The identifier.
 * @property {string} Name The name.
 */

/**
 * @param {object} props
 * @param {Array<Category>} props.categories The categories to be displayed.
 */
function CategoriesTable({ categories }) {
  categories.sort((a, b) => a.Name.localeCompare(b.Name) || a.Id - b.Id);

  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>登録番号</th>
          <th>名称</th>
          <th>在庫点数</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(value => (
          <CategoryRow catId={value.Id} />
        ))}
      </tbody>
    </Table>
  );
}

export default CategoriesTable;