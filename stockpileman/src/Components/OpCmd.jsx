import { Button } from "react-bootstrap";
import { supabase } from '../client';

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
}

function OpCmd(props) {
  /**
   * @callback Update
   * @param {Event} event The event object of the click event.
   */

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
  /**
   * The callback function of update button.
   * @type {Update}
   */
  const updateCallback = props.updateCallback;

  return (
    <>
      <Button
        variant="danger"
        onClick={async () => await DeleteData(parseInt(id), table)}
      >
        使用
      </Button>
      <Button
        variant="primary"
        onClick={updateCallback}
      >
        更新
      </Button>
    </>
  );
}

export default OpCmd;