import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostApiService } from "../../services/post.api.service";
import { Post } from "../../lib/types/types";

interface PostSliceInterface {
  activePost: Post | null;
  list: {
    loading: boolean;
    error: null | { message: string };
    data: Post[];
    pagination: {
      hasMore: boolean;
      page:number;
      limit:number;
    };
  };
}

const initialState: PostSliceInterface = {
  activePost: null,
  list: {
    loading: false,
    error: null,
    data: [],
    pagination: { hasMore: true, page:1, limit:10},
  },
};

export const fetchPosts = createAsyncThunk("Posts/fetchPosts", async (_, thunkApi:any) => {
    const postList = thunkApi.getState().post.list;
    if(postList.pagination.hasMore){
        let limit = 10;
        let page = postList.pagination.page;
        const res = await PostApiService.getPosts(page,limit);
        return res.data;
    }
});

export const fetchPostById = createAsyncThunk("Posts/fetchPostById", async (postId: string) => {
    const res = await PostApiService.getPostById(postId);
    return res.data;
  }
);

const PostSlice = createSlice({
  name: "Posts",
  initialState,
  reducers: {
    setActivePost(state, action:PayloadAction<Post>){
      state.activePost = action.payload;
    },
    resetActivePost(state){
      state.activePost = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.list.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.list.loading = false;
      if(action.payload){
        state.list.data = [...state.list.data, ...action.payload!.data];
        state.list.pagination.page++;
      }
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.list.loading = false;
      state.list.error = {
        message: action.error.message!,
      };
    });
  },
});

export const {setActivePost, resetActivePost} = PostSlice.actions;
export default PostSlice.reducer;
