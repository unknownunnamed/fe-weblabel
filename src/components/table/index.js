import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import color from "../../utility/color";

const { SearchBar } = Search;

const TableData = (props) => {
  const { data, columns, defaultSorted } = props;

  return (
    <ToolkitProvider
      bootstrap4
      keyField="id"
      data={data}
      columns={columns}
      defaultSorted={defaultSorted}
      // onDataSizeChange={}
      search
    >
      {(props) => (
        <div>
          <div
            className="mb-2"
            style={{
              float: "right",
            }}
          >
            <SearchBar
              {...props.searchProps}
              style={{
                borderColor: color.black,
                outline: 0,
                boxShadow: "none",
              }}
              placeholder="Search ..."
            />
          </div>
          <BootstrapTable
            {...props.baseProps}
            pagination={paginationFactory({
              active: false,
            })}
            style={{
              overflowX: "auto",
            }}
           
          />
        </div>
      )}
    </ToolkitProvider>
  );
};

export default TableData;
