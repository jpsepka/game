import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import characterService from './characterService'

const initialState = {
  characters: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new character
export const createCharacter = createAsyncThunk(
  'characters/create',
  async (characterData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await characterService.createCharacter(characterData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user characters
export const getCharacters = createAsyncThunk(
  'characters/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await characterService.getCharacters(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user character
export const deleteCharacter = createAsyncThunk(
  'characters/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await characterService.deleteCharacter(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateCharacter = createAsyncThunk(
  "characters/update",
  async (character, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await characterService.updateCharacter(character, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCharacter.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCharacter.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.characters.push(action.payload)
      })
      .addCase(createCharacter.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCharacters.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.characters = action.payload
      })
      .addCase(getCharacters.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteCharacter.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCharacter.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.characters = state.characters.filter(
          (character) => character._id !== action.payload.id
        )
      })
      .addCase(deleteCharacter.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateCharacter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCharacter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        var test = action.payload.id
        for(var i = 0; i < state.characters.length; i++) {
          console.log(state.characters[i]._id)
          console.log(action.payload._id)
          if (state.characters[i]._id === action.payload._id) {
            console.log("hi");
            state.characters[i] = action.payload
          }
        }
      })
      .addCase(updateCharacter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });

  },
})

export const { reset } = characterSlice.actions
export default characterSlice.reducer