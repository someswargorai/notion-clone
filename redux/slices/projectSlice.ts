import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getSession } from "next-auth/react";

interface Project {
  name: string | undefined;
  id: number;
  _id: string;
  title: string;
  description:string,
  createdAt:string,
  updatedAt:string,
  lastVisitedAt: string;
}

interface ProjectState {
  load: boolean;
  addProject: boolean;
  projects: Project[];
}

const initialState: ProjectState = {
  load: false,
  addProject: false,
  projects: [],
};

export const projectInitialize = createAsyncThunk(
  "project/initialize",
  async () => {
    const session = await getSession();
    if (!session || !session.token)
      throw new Error("Not authenticated");

    const response = await axios.get("http://localhost:3001/project/get-projects", {
      headers: {
        Authorization: `Bearer ${session.token}`, // ✅ correct usage
      },
    });

    return response.data;
  }
);

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    toggleProjectState: (state, action) => {
      state.addProject = action.payload;
    },
    addNewProject: (state, action) => {
      state.projects = [...state.projects, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(projectInitialize.pending, (state) => {
        state.load = true;
      })
      .addCase(projectInitialize.fulfilled, (state, action) => {
        state.load = false;
        state.projects = action.payload;
      })
      .addCase(projectInitialize.rejected, (state) => {
        state.load = false;
      });
  },
});

export const { toggleProjectState, addNewProject } = projectSlice.actions;
export default projectSlice.reducer;
