import React, { useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  IconButton,
} from "@material-ui/core";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { useAppSelector, useAppDispatch } from "../../hooks";
import UserTableToolbar from "./UserTableToolbar";
import UserTableHead from "./UserTableHead";
import { userData, setPage, setRowsPerPage, deleteUser, handleEditUserFormPopUp } from "./userSlice";
import "./userTable.scss";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: "0px",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(0),
    },
    customColumnStyle: {
      wordWrap: "break-word",
      width: "190px",
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    densePadding: {
      marginBottom: "0",
    },
  }),
);

export type Order = "asc" | "desc";

const UserTable = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof userData>();

  const dataList = useAppSelector((state) => state.user.userList);
  const totalCount = useAppSelector((state) => state.user.totalCount);
  const page = useAppSelector((state) => state.user.page);
  const rowsPerPage = useAppSelector((state) => state.user.rowsPerPage);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataList.length);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof userData) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
  };

  const handleEdit = (data) => {
    let selectedUserData: userData = {
      id: data.id,
      name: data.name,
      email: data.email,
      website: data.website,
    };
    dispatch(handleEditUserFormPopUp(selectedUserData));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <UserTableToolbar />
        <TableContainer className="table-container">
          <Table stickyHeader className="table-container" aria-labelledby="tableTitle" size="small" aria-label="user table">
            <UserTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody className="table-body">
              {stableSort(dataList, getComparator(order, orderBy)).map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell>{row.name}</TableCell>

                    <TableCell>{row.email}</TableCell>
                    <TableCell className="pr-0">
                      <span className="d-flex align-items-center justify-space-between">
                        <span>{row.website}</span>
                        <span className="action-button-conatiner">
                          <IconButton onClick={() => handleEdit(row)} color="primary" aria-label="edit" component="span">
                            <EditOutlinedIcon />
                          </IconButton>
                          <IconButton onClick={() => dispatch(deleteUser(parseInt(String(row.id))))} color="secondary" aria-label="delete" component="span">
                            <DeleteForeverOutlinedIcon />
                          </IconButton>
                        </span>
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 41 * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter className="sticky-footer">
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  count={totalCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default UserTable;
