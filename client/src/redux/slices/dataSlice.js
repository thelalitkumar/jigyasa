import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const STORAGE_KEY = "redux-store";

// Load the initial state from session storage, if it exists
const initialState = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY)) || {
  data: [],
  identity: [],
  status: "idle", // idle, loading, success, failed
  error: null,
  index: 0,
  answered: 0,
  notAnswered: 0,
  notVisited: 0,
  markedReview: 0,
  ansReview: 0,
  userClickedArray: [],
  correct: 0,
  incorrect: 0,
  attemptedOptions: [],
  timer: 0,
  correctOptions:[]
};

export const fetchData = createAsyncThunk("data/fetch", async () => {
  const response = await axios.get("/questions");
  return response.data;
});

const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    jump2idx: (state, action) => {
      state.index = action.payload;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    incIdx: (state) => {
      if (state.index < state.data.length - 1) state.index++;
      else state.index = 0;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    decIdx: (state) => {
      if (state.index) state.index--;
      else state.index = state.data.length - 1;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    storeArray: (state, action) => {
      const index = action.payload.index;
      const clickedAns = action.payload.clickedAns;
      state.userClickedArray.fill(clickedAns, index, index + 1);
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    changePresent: (state, action) => {
      const index = action.payload.index;
      const color = action.payload.present;
      state.data[index].present = color;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    countUpdate: (state) => {
      state.answered = 0;
      state.notAnswered = 0;
      state.notVisited = 0;
      state.ansReview = 0;
      state.markedReview = 0;
      for (let i = 0; i < state.data.length; i++) {
        switch (state.data[i].present) {
          case "Answered":
            state.answered++;
            break;
          case "notAnswered":
            state.notAnswered++;
            break;
          case "notVisited":
            state.notVisited++;
            break;
          case "ansmark":
            state.ansReview++;
            break;
          case "mark":
            state.markedReview++;
            break;
        }
      }
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    solvedOptions: (state) => {
      for (let i = 0; i < state.data.length; i++) {
        const q = state.data[i];
        if (q.present == "Answered" || q.present == "ansmark") {
          q.userClicked=state.userClickedArray[i];
          state.attemptedOptions.push({
            id: q._id,
            option: state.userClickedArray[i],
          });
        }
        else{
          q.userClicked="not answered";
        }
      }
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    AllOptions: (state) => {
      for (let i = 0; i < state.data.length; i++) {
        const q = state.data[i];

        state.identity.push({
          id: q._id
        });
      }
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    setCorrect: (state, action) => {
      state.correctOptions = action.payload;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    scoreUpdate: (state, action) => {
      state.correct = action.payload;
      state.incorrect = state.answered + state.ansReview - action.payload;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    setTime: (state, action) => {
      state.timer = action.payload;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
        state.data[0].present = "notAnswered";
        state.userClickedArray.length = state.data.length;

        // Save the updated state to session storage
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  jump2idx,
  incIdx,
  decIdx,
  storeArray,
  changePresent,
  countUpdate,
  solvedOptions,
  scoreUpdate,
  setTime,
  AllOptions,
  setCorrect
} = dataSlice.actions;

export default dataSlice.reducer;
