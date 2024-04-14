import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserApiService } from "../../services/user.api.service";

interface UserSlice{
    loading:boolean;
    error:null | {message:string};
    data:{}[]
};

const initialState:UserSlice = {
    loading:false,
    error:null,
    data:[]
}

export const fetchUsers = createAsyncThunk('User/fetchUsers',async ()=>{
    const res = await UserApiService.getUsers();
    return res.data;
})


const usersSlice = createSlice({
    name:'User',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action)=>{
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action)=>{
            state.loading = false;
            state.error = {
                message:action.error.message!
            }
        });
    }
});

export default usersSlice.reducer;
