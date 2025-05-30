import React from "react"
import Table from "react-bootstrap/Table"
import "./TablePage.sass"

const TableContent = ({ tableData, setIsEdit }) => {
	return (
		<div className="table-content">
			<Table striped bordered hover responsive>
				<thead>
					<tr>
						<th>Name</th>
						<th>Visa Type</th>
						<th>Check Date</th>
						<th>Clear Date</th>
						<th>Location</th>
						<th>Degree</th>
						<th>
							<button
								className="add-new"
								onClick={() => setIsEdit(true)}
							>
								+
							</button>
						</th>
					</tr>
				</thead>
				<tbody className="tableBody">
					{tableData &&
						tableData.map((item, i) => {
							const {
								email,
								name,
								checkDate,
								location,
								status,
								clearDate,
								degree,
								visaType,
							} = item
							return (
								<tr key={email}>
									<td>{name}</td>
									<td>{visaType}</td>
									<td>{checkDate}</td>
									<td>{clearDate ? clearDate : "Pending"}</td>
									<td>{location}</td>
									<td>{degree}</td>
								</tr>
							)
						})}
				</tbody>
			</Table>
		</div>
	)
}

export default TableContent
