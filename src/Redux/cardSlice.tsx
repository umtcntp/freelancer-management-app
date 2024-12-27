import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { cardType } from '../types/Types';
import axios from 'axios';

export const fetchFreelancers = createAsyncThunk('fetchFreelancers', async () => {
    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const userPostsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const userPhotosResponse = await axios.get('https://jsonplaceholder.typicode.com/photos');
    const userResponseData = await usersResponse.data;
    const userPostsResponseData = await userPostsResponse.data;
    const userPhotosResponseData = await userPhotosResponse.data;


    return userResponseData.map((user: cardType) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        finishedJobCount: userPostsResponseData.filter((post: any) => post.userId === user.id).length,
        city: user.address?.city || 'Unknown',
        photo: userPhotosResponseData.find((photo: any) => photo.id === user.id).url
    }));
});

export const fetchFreelancerPosts = createAsyncThunk('fetchFreelancerPosts', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
});

export const fetchFreelancerComments = createAsyncThunk('fetchFreelancerComments', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
    return response.data;
});


const freelancerSlice = createSlice({
    name: 'freelancers',
    initialState: {
        cards: [] as cardType[],
        savedFreelancers: [] as cardType[],
        selectedFreelancer: null as cardType | null,
        selectedFreelancerPosts: [] as any[],
        selectedPostComments: [] as any[],
        isDetailView: false,
        searchName: '',
        minJobs: null as number | null,
        maxJobs: null as number | null
    },
    reducers: {
        selectFreelancer: (state, action) => {
            state.selectedFreelancer = action.payload;
            state.isDetailView = true;
        },
        resetView: (state) => {
            state.selectedFreelancer = null;
            state.isDetailView = false;
        },
        setSearchName: (state, action: PayloadAction<string>) => {
            state.searchName = action.payload;
        },
        setMinJobs: (state, action: PayloadAction<number | null>) => {
            state.minJobs = action.payload;
        },
        setMaxJobs: (state, action: PayloadAction<number | null>) => {
            state.maxJobs = action.payload;
        },
        clearFilters: (state) => {
            state.searchName = '';
            state.minJobs = null;
            state.maxJobs = null;
        },
        saveFreelancer: (state, action: PayloadAction<cardType>) => {
            const existingFreelancer = state.savedFreelancers.find(freelancer => freelancer.id === action.payload.id);
            if (!existingFreelancer) {
                state.savedFreelancers.push(action.payload);
            }
        },
        removeFreelancer: (state, action: PayloadAction<number>) => {
            state.savedFreelancers = state.savedFreelancers.filter(freelancer => freelancer.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFreelancers.fulfilled, (state, action) => {
                state.cards = action.payload;
            })
            .addCase(fetchFreelancers.rejected, (state) => {
                state.cards = [];
            })
            .addCase(fetchFreelancers.pending, (state) => {
                state.cards = [];
            })
            .addCase(fetchFreelancerPosts.fulfilled, (state, action) => {
                state.selectedFreelancerPosts = action.payload;
            })
            .addCase(fetchFreelancerPosts.rejected, (state) => {
                state.selectedFreelancerPosts = [];
            })
            .addCase(fetchFreelancerPosts.pending, (state) => {
                state.selectedFreelancerPosts = [];
            })
            .addCase(fetchFreelancerComments.fulfilled, (state, action) => {
                state.selectedPostComments = action.payload;
            })
            .addCase(fetchFreelancerComments.rejected, (state) => {
                state.selectedPostComments = [];
            })
            .addCase(fetchFreelancerComments.pending, (state) => {
                state.selectedPostComments = [];
            });
    }
});
export const { selectFreelancer, resetView, setSearchName, setMaxJobs, setMinJobs, clearFilters, saveFreelancer, removeFreelancer } = freelancerSlice.actions;
export default freelancerSlice.reducer;
