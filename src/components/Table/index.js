import { useState } from "react";

import useTable from "../../hooks/useTable";
import TableFooter from "./TableFooter";

import "./Table.css";

const Table = ({ columns, rows, data, amount }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, amount || 10);

  return data ? (
    <div className="main-table">
      <table>
        <thead>
          <tr>
            {columns.map(({ name, label, render: Component }, index) =>
              Component ? (
                <th key={`${name}-column`}>
                  <Component key={index} />
                </th>
              ) : (
                <th key={`${name}-column`}>{label}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {slice.map((question, index) => (
            <tr key={index}>
              {rows.map(({ name, render: Component }, index) =>
                Component ? (
                  <Component key={index} question={question} />
                ) : (
                  <td key={index}>{question[name]}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </div>
  ) : null;
};

export default Table;
