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
    navigate('/View');
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