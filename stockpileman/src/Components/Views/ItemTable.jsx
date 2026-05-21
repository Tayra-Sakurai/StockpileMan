import { Table } from "react-bootstrap";
import ItemRow from "./ItemRow";

/**
 * @param {Object} props The properties.
 * @param {Array<Item>} props.items The items which are to be displayed.
 */
function ItemTable(props) {
  /**
   * @typedef Item
   * @type {object}
   * @property {string} Name
   * @property {number} Id
   * @property {number} CategoryId
   * @property {string} BoughtAt
   * @property {string} ExpireDate
   * @property {?string} Notes
   * @property {{
   *   Name: string,
   *   Id: number
   * }} Categories
   */

  /**
   * The raw item data.
   * @type {Array<Item>}
   */
  const items = props.items;

  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>登録 ID</th>
          <th>名称</th>
          <th>商品名</th>
          <th>賞味期限</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <ItemRow
            dataId={item.Id}
            name={item.Name}
            expireDate={item.ExpireDate}
            category={item.Categories.Name}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default ItemTable;