import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔥 Global API Config (BASE_URL)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

// ✅ Async Thunk for Sending User Data to Express API
export const saveUserToDB = createAsyncThunk(
  "user/saveUserToDB",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to save user");
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ User Slice for Redux
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveUserToDB.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveUserToDB.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(saveUserToDB.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
