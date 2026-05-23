import { Col, Form, Row } from "react-bootstrap";
import CategorySelect from "./CategoryDetails/CategorySelect";
import dateInputString from '../Utilities/DateInputString';

/**
 * @param {object} param0 The parameters given as attributes.
 * @param {string} param0.categoryId The identifier of category selector.
 * @param {string} param0.nameId The name input's id.
 * @param {string} param0.dateBId The ID for the input for the date when you bought the item.
 * @param {string} param0.dateEId The identifier of the date input of the expiring date.
 * @param {string} param0.notesId The identifier for the note input.
 * @param {import("react-hook-form").UseFormRegister<import("react-hook-form").FieldValues>} param0.register The registration function for forms.
 * @param {import("react-hook-form").FieldErrors<import("react-hook-form").FieldValues>} param0.errors The errors of the form.
 */
function ItemDetail({ categoryId, nameId, dateBId, dateEId, notesId, register, errors }) {
  const currentDate = dateInputString(new Date());
  return (
    <>
      <CategorySelect
        controlId={categoryId}
        isInvalid={!!errors[categoryId]}
        name={categoryId}
        {...register(categoryId, {
          required: '名称を選択してください．',
        })}
      />
      <Form.Group className="mb-3" controlId={nameId}>
        <Form.Label>商品名</Form.Label>
        <Form.Control
          name={nameId}
          isInvalid={!!errors[nameId]}
          {...register(nameId, {
            required: '商品名を入力してください．',
            maxLength: {
              value: 50,
              message: '50 文字以内で入力してください．',
            },
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors[nameId]?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} controlId={dateBId}>
          <Form.Label>購入日</Form.Label>
          <Form.Control
            type="date"
            isInvalid={!!errors[dateBId]}
            {...register(dateBId, {
              required: '購入日を設定してください．',
              max: {
                value: currentDate,
                message: '購入日は今日までの日付である必要があります．',
              },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors[dateBId]?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId={dateEId}>
          <Form.Label>賞味期限</Form.Label>
          <Form.Control
            type="date"
            isInvalid={!!errors[dateEId]}
            {...register(dateEId, {
              min: {
                value: currentDate,
                message: '本日以降の日付を入力してください．',
              },
              required: '賞味期限を入力してください．',
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors[dateEId]?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId={notesId}>
        <Form.Label>備考</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          {...register(notesId)}
        />
      </Form.Group>
    </>
  );
}

export default ItemDetail;