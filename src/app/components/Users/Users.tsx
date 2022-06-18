import React, { useEffect, useRef } from "react";
import UserTable from "../../features/UserTable/UserTable";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { pageData, fetchUsers } from "../../features/UserTable/userSlice";
import Loader from "../Loader/Loader";

function Users() {
  const dispatch = useAppDispatch();
  const initialRender = React.useRef(true);

  const loading = useAppSelector((state) => state.user.loading);
  const page = useAppSelector((state) => state.user.page);
  const rowsPerPage = useAppSelector((state) => state.user.rowsPerPage);
  const filterBy = useAppSelector((state) => state.user.filterBy);
  const searchBy = useAppSelector((state) => state.user.searchBy);

  useEffect(() => {
    let pageData: pageData = {
      pageNo: page + 1,
      pageSize: rowsPerPage,
      filterBy,
    };
    dispatch(fetchUsers(pageData));
  }, [page, rowsPerPage, filterBy]);

  //Search after timeout
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!initialRender.current) {
        let pageData: pageData = {
          pageNo: page + 1,
          pageSize: rowsPerPage,
          filterBy,
          searchBy,
        };
        dispatch(fetchUsers(pageData));
      } else {
        initialRender.current = false;
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchBy]);

  return (
    <>
      <UserTable />
      {loading && <Loader />}
    </>
  );
}

export default Users;
