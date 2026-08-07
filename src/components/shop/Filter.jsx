import React from 'react';
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, Slider, Typography } from '@mui/material';

export default function Filter({ filters, setFilters }) {
  return (
    <Card className="h-fit rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <CardContent className="space-y-5 p-5">
        <Typography variant="h6" className="font-semibold text-slate-800">Filters</Typography>

        <FormControl fullWidth size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={filters.category}
            label="Category"
            onChange={(event) => setFilters({ ...filters, category: event.target.value })}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="tech">Tech</MenuItem>
            <MenuItem value="design">Design</MenuItem>
            <MenuItem value="marketing">Marketing</MenuItem>
          </Select>
        </FormControl>

        <div>
          <Typography variant="body2" className="mb-2 text-slate-600">Max Price: ${filters.maxPrice}</Typography>
          <Slider
            value={filters.maxPrice}
            min={50}
            max={500}
            step={10}
            onChange={(_, value) => setFilters({ ...filters, maxPrice: value })}
            valueLabelDisplay="auto"
          />
        </div>

        <div>
          <Typography variant="body2" className="mb-2 text-slate-600">Minimum Rating: {filters.minRating}</Typography>
          <Slider
            value={filters.minRating}
            min={0}
            max={5}
            step={0.5}
            onChange={(_, value) => setFilters({ ...filters, minRating: value })}
            valueLabelDisplay="auto"
          />
        </div>
      </CardContent>
    </Card>
  );
}
