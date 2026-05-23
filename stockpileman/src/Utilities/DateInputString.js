/**
 * The date input string generator.
 * @public
 * @param {Date} date The date to be parsed.
 * @returns {string} The date string.
 */
function dateInputString(date) {
  /**
   * The year.
   * @type {string}
   */
  const year = date.getFullYear().toString();
  /**
   * The month.
   * @type {string}
   */
  const month = (date.getMonth() + 1).toString();
  /**
   * The date.
   * @type {string}
   */
  const dateInMonth = date.getDate().toString();
  return `${year.padStart(4, '0')}-${month.padStart(2, "0")}-${dateInMonth.padStart(2, "0")}`;
}

export default dateInputString;