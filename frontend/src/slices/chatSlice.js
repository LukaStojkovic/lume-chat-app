import { axiosInstance } from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk(
  "messages/users",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/messages/users");

      return res.data;
    } catch (err) {
      console.log("Error in getUsers: ", err);
      toast.error(err.response?.data?.message);
      return rejectWithValue(err.response?.data || "Unknown error");
    }
  }
);

export const getMessages = createAsyncThunk(
  "messages/usersId",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);

      return res.data;
    } catch (err) {
      console.log("Error in getMessages: ", err);
      toast.error(err.response?.data?.message);
      return rejectWithValue(err.response?.data || "Unknown error");
    }
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ messageData, selectedUserId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUserId}`,
        messageData
      );

      return res.data;
    } catch (err) {
      console.log("Error in sendMessage: ", err);
      toast.error(err.response?.data?.message);
      return rejectWithValue(err.response?.data || "Unknown error");
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    users: [],
    selectedUser: null,

    isUsersLoading: false,
    isMessagesLoading: false,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isUsersLoading = false;
      })
      .addCase(getMessages.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state) => {
        state.isMessagesLoading = false;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages = [...state.messages, action.payload];
      });
  },
});

export const { setSelectedUser, setMessages } = chatSlice.actions;

export default chatSlice.reducer;
