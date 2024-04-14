import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserApiService } from "../../services/user.api.service";

interface UserSlice{
    activePost:{
        loading:boolean;
        error:null | {message:string};
        data:any
    },
    list:{
        loading:boolean;
        error:null | {message:string};
        data:[],
    }
};

const initialState:UserSlice = {
    activePost:{loading:false, error:null, data:{}},
    list:{loading:false, error:null, data:[]}
}

export const fetchPosts = createAsyncThunk('Posts/fetchPosts',async ()=>{
    const res = await UserApiService.getUsers();
    return res.data;
})

export const fetchPostById = createAsyncThunk('Posts/fetchPostById',async ()=>{
    const res = await UserApiService.getUsers();
    return res.data;
})


const usersSlice = createSlice({
    name:'Posts',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchPosts.pending, (state)=>{
            state.list.loading = true;
        });
        builder.addCase(fetchPosts.fulfilled, (state, action)=>{
            state.list.loading = false;
            state.list.data = action.payload;
        });
        builder.addCase(fetchPosts.rejected, (state, action)=>{
            state.list.loading = false;
            state.list.error = {
                message:action.error.message!
            }
        });

        builder.addCase(fetchPosts.pending, (state)=>{
            state.activePost.loading = true;
        });
        builder.addCase(fetchPosts.fulfilled, (state, action)=>{
            state.activePost.loading = false;
            state.activePost.data = action.payload;
        });
        builder.addCase(fetchPosts.rejected, (state, action)=>{
            state.activePost.loading = false;
            state.activePost.error = {
                message:action.error.message!
            }
        });
    }
});

export default usersSlice.reducer;
