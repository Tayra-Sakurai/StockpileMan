import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { supabase } from "../../client";

/**
 * @typedef {Object} ParamType
 * @property {?string} controlId The control's identifier.
 * @property {number} value The displaying ID of the selected category.
 * @property {import("react").ChangeEventHandler<HTMLSelectElement, HTMLSelectElement>} onChange Changed event handler.
 * @property {object=} ref The additional parameters.
 * @property {string} name The element's name.
 * @property {import("react").FocusEventHandler<HTMLSelectElement>} onBlur The blur event.
 * @property {boolean=} isInvalid Whether the select fulfills the conditions.
 */

/**
 * @typedef {Object} Category
 * @property {number} Id
 * @property {string} Name
 */

/**
 * @typedef {Object} CategoryResponse
 * @property {?Array<Category>} data
 * @property {?Error} error
 */

/**
 * @param {ParamType} params The props.
 */
function CategorySelect({ controlId, value, onChange, ref = {}, name, onBlur, isInvalid }) {
  /**
   * @type {[
   *   Array<Category>,
   *   import("react").Dispatch<import("react").SetStateAction<Array<Category>>>
   * ]}
   */
  const [categories, setCategories] = useState([]);
  /**
   * @type {[?string, import("react").Dispatch<import("react").SetStateAction<?string>>]}
   */
  const [newCategory, setNewCategory] = useState('');

  const handleAdd = async () => {
    /**
     * @type {CategoryResponse}
     */
    const { data, error } = await supabase
      .from('Categories')
      .select()
      .eq('Name', newCategory);
    if (!data) {
      console.error(error);
      return;
    } else if (data.length > 0) {
      return;
    } else {
      await supabase
        .from('Categories')
        .insert({ Name: newCategory });
      /**
       * @type {CategoryResponse}
       */
      const {
        data: arr
      } = await supabase
        .from('Categories')
        .select();
      setCategories(arr ?? []);
    }
  };

  useEffect(
    () => {
      const setup = async () => {
        /**
         * @type {CategoryResponse}
         */
        const { data } = await supabase
          .from('Categories')
          .select();
        data.sort((a, b) => a.Name.localeCompare(b.Name));
        setCategories(data ?? []);
      };
      setup();
    }
  );

  return (
    <>
      <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>名称</Form.Label>
        <Form.Select
          value={value}
          onChange={onChange}
          ref={ref}
          name={name}
          onBlur={onBlur}
          isInvalid={isInvalid}
        >
          <option>名称を選択</option>
          {categories.map(value => (
            <option value={value.Id}>{value.Name}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="addCategory">
        <Form.Label>名称を追加する</Form.Label>
        <InputGroup>
          <Form.Control value={newCategory} onChange={event => setNewCategory(event.target.value)} />
          <Button variant="secondary" type="button" onClick={handleAdd}>追加</Button>
        </InputGroup>
      </Form.Group>
    </>
  );
}

export default CategorySelect;