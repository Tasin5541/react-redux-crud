import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export type createUserData = {
  name: string;
  email: string;
  website: string;
};

export type userData = {
  id: number;
} & createUserData;

type InitialState = {
  loading: boolean;
  userList: userData[];
  totalCount: number;
  error: string;
  page: number;
  rowsPerPage: number;
  filterBy: unknown;
  searchBy: string;
  openPopUp: boolean;
  selectedUserData: userData;
};

const initialState: InitialState = {
  loading: false,
  userList: [],
  totalCount: 0,
  error: "",
  page: 0,
  rowsPerPage: 10,
  filterBy: "All",
  searchBy: "",
  openPopUp: false,
  selectedUserData: null,
};

export type pageData = {
  pageNo: number;
  pageSize: number;
  filterBy: unknown;
  searchBy?: string;
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", (pageData: pageData) => {
  const { pageNo, pageSize, filterBy, searchBy } = pageData;
  let url = `${process.env.API_URL}/users?_page=${pageNo}&_limit=${pageSize}`;
  if (filterBy === "Recent") {
    url += "&_sort=id&_order=desc";
  }
  if (searchBy && searchBy !== "") {
    url += `&name_like=${searchBy}`;
  }
  return fetch(url).then((response) => response.json());
});

export const createUser = createAsyncThunk("user/createUser", (data: createUserData, { dispatch, getState }) => {
  let url = `${process.env.API_URL}/users`;
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  return fetch(url, requestOptions).then((response) => {
    const state = getState() as { user: InitialState };
    let pageData: pageData = {
      pageNo: state.user.page,
      pageSize: state.user.rowsPerPage,
      filterBy: state.user.filterBy,
    };
    dispatch(fetchUsers(pageData));
    return response.json();
  });
});

export const updateUser = createAsyncThunk("user/updateUser", (data: userData, { dispatch, getState }) => {
  let url = `${process.env.API_URL}/users/${data.id}`;
  const requestOptions = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  return fetch(url, requestOptions).then((response) => {
    const state = getState() as { user: InitialState };
    let pageData: pageData = {
      pageNo: state.user.page,
      pageSize: state.user.rowsPerPage,
      filterBy: state.user.filterBy,
    };
    dispatch(fetchUsers(pageData));
    return response.json();
  });
});

export const deleteUser = createAsyncThunk("user/deleteUser", (userId: number, { dispatch, getState }) => {
  let url = `${process.env.API_URL}/users/${userId}`;
  return fetch(url, {
    method: "DELETE",
  }).then((response) => {
    const state = getState() as { user: InitialState };
    let pageData: pageData = {
      pageNo: 1,
      pageSize: state.user.rowsPerPage,
      filterBy: state.user.filterBy,
    };
    dispatch(fetchUsers(pageData));
    return response.json();
  });
});

const userSlice = createSlice({
  name: "userTableData",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
    },
    handleFilterByChange: (state, action: PayloadAction<unknown>) => {
      state.filterBy = action.payload;
    },
    handleSearchByChange: (state, action: PayloadAction<string>) => {
      state.searchBy = action.payload;
    },
    clearSerach: (state) => {
      state.searchBy = "";
    },
    handleUserFormPopUp: (state, action: PayloadAction<boolean>) => {
      state.openPopUp = action.payload;
      if (!action.payload) {
        state.selectedUserData = null;
      }
    },
    handleEditUserFormPopUp: (state, action: PayloadAction<userData>) => {
      state.selectedUserData = action.payload;
      state.openPopUp = true;
    },
  },
  extraReducers: (builder) => {
    //get
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<userData[]>) => {
      state.loading = false;
      state.userList = action.payload;
      state.totalCount = 10;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.userList = [];
      state.totalCount = 0;
      state.error = action.error.message || "Something went wrong";
      alert(state.error);
    });

    //create
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUser.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.openPopUp = false;
      alert("Created user");
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
      alert(state.error);
    });

    //update
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.selectedUserData = null;
      state.openPopUp = false;
      alert("Updated user");
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
      alert(state.error);
    });

    //delete
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      alert("Deleted user");
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
      alert(state.error);
    });
  },
});

export default userSlice.reducer;
export const {
  setPage,
  setRowsPerPage,
  handleFilterByChange,
  handleSearchByChange,
  clearSerach,
  handleUserFormPopUp,
  handleEditUserFormPopUp,
} = userSlice.actions;
