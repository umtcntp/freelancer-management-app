import { TextField, Grid, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { setSearchName, setMinJobs, setMaxJobs, clearFilters } from '../Redux/cardSlice';

function FreelancerFilters() {
    const dispatch = useDispatch();
    const { searchName, minJobs, maxJobs } = useSelector((state: RootState) => state.card);

    const handleSearchNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchName(e.target.value));
    };

    const handleMinJobsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setMinJobs(Number(e.target.value) || null));
    };

    const handleMaxJobsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setMaxJobs(Number(e.target.value) || null));
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
    };

    return (
        <Box sx={{ marginBottom: 2 }}>
            <TextField
                label="Search by name"
                variant="outlined"
                value={searchName}
                onChange={handleSearchNameChange}
                fullWidth
            />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={6}>
                    <TextField
                        label="Min Jobs"
                        variant="outlined"
                        value={minJobs ?? ''}
                        onChange={handleMinJobsChange}
                        fullWidth
                        type="number"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Max Jobs"
                        variant="outlined"
                        value={maxJobs ?? ''}
                        onChange={handleMaxJobsChange}
                        fullWidth
                        type="number"
                    />
                </Grid>
            </Grid>
            <Button onClick={handleClearFilters} sx={{ marginTop: 2 }}>Clear Filters</Button>
        </Box>
    );
}

export default FreelancerFilters;
