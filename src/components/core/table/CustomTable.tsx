import React, { FC } from 'react';

export type CustomTableColumn = {
  title: string;
  dataKey: string;
  row: (data: any, rowIndex: number) => React.ReactNode;
};

export type CustomTableProps = {
  columns: CustomTableColumn[];
  data: any[];
  isLoading: boolean;
};

const CustomTable: FC<CustomTableProps> = ({ columns, data, isLoading }) => {
  return (
    <div className="overflow-x-auto customScrollbar1 max-w-full border rounded-[10px] overflow-hidden">
      <div className="w-full">
        <table className="w-full text-left">
          <thead>
            <tr className='border-b'>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="p-3 tableAction"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full">
            {!isLoading &&
              data &&
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b">
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="tableAction break-words p-2"
                    >
                      {column.row(row, rowIndex)}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {isLoading && (
          <div className="flex justify-center items-center h-10 my-6">
            <p>Loading...</p>
          </div>
        )}
        {!isLoading && data.length === 0 && (
          <div className="flex justify-center items-center my-6">
            <p>No Data Available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTable;
