/**
 * @fileoverview This is a part of StockpileMan
 * @copyright Copyright (C) 2026 Tayra Sakurai
 * @license This is a part of StockpileMan
 * Copyright (C) 2026 Tayra Sakurai
 * 
 * StockpileMan is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * 
 * StockpileMan is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License along with StockpileMan. If not, see <https://www.gnu.org/licenses/>.
 */
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