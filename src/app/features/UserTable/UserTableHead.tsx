import React from "react";
import { TableCell, TableHead, TableRow, TableSortLabel, Theme, withStyles, createStyles } from "@material-ui/core";
import { userData } from "./userSlice";
import { Order } from "./UserTable";

type HeadCell = {
  disablePadding: boolean;
  id: keyof userData;
  label: string;
  numeric: boolean;
};

type EnhancedTableProps = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof userData) => void;
  order: Order;
  orderBy: string;
};

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#fafaf9",
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const UserTableHead = ({ order, orderBy, onRequestSort }: EnhancedTableProps) => {
  const createSortHandler = (property: keyof userData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  const headCells: HeadCell[] = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Name",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "website",
      numeric: false,
      disablePadding: false,
      label: "Website",
    },
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : "asc"} onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? <span className="visuallyHidden">{order === "desc" ? "sorted descending" : "sorted ascending"}</span> : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default UserTableHead;
