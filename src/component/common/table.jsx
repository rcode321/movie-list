import React from "react";

import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Table from "react-bootstrap/Table";

const Tables = ({ columns, sortColumn, onSort, data }) => {
	return (
		<Table responsive="sm">
			<TableHeader
				columns={columns}
				sortColumn={sortColumn}
				onSort={onSort}
			/>
			<TableBody columns={columns} data={data} />
		</Table>
	);
};

export default Tables;
