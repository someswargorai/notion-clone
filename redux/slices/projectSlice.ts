import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  addProject: false,
  projects:[{
    id: 1,
    name: "NextGen Dashboard",
    description:
      "A modern analytics dashboard built with Next.js and Tailwind CSS.",
    createdAt: "2025-10-15T10:32:00Z",
    lastVisitedAt: "2025-11-02T08:45:00Z",
  },
  {
    id: 2,
    name: "AI Chat Companion",
    description: "An AI-powered chat assistant built using OpenAI’s GPT-5 API.",
    createdAt: "2025-09-10T12:00:00Z",
    lastVisitedAt: "2025-10-31T14:22:00Z",
  },
  {
    id: 3,
    name: "TaskFlow Manager",
    description:
      "A simple Kanban board app to manage tasks and productivity workflows.",
    createdAt: "2025-08-21T09:15:00Z",
    lastVisitedAt: "2025-11-01T18:00:00Z",
  },
  {
    id: 4,
    name: "CodeCollab",
    description:
      "A collaborative code editing and sharing platform for developers.",
    createdAt: "2025-07-05T16:45:00Z",
    lastVisitedAt: "2025-10-29T22:10:00Z",
  }]
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    toggleProjectState: (state, action) => {
      state.addProject = action.payload;
    },
    addNewProject:(state,action)=>{
        state.projects=[...state.projects,action.payload];
    }
  },
});

export const { toggleProjectState, addNewProject } = projectSlice.actions;
export default projectSlice.reducer;
