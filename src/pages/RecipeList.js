import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import './RecipeList.css';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const observer = useRef();

  const categoryOptions = [
    { label: 'All', value: '' },
    { label: 'Breakfast', value: 'breakfast' },
    { label: 'Lunch', value: 'lunch' },
    { label: 'Dinner', value: 'dinner' },
  ];

  useEffect(() => {
    setLoading(true);
    const apiKey = '31bdb396672d40578e2d7c06697328cd';
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${
      searchTerm ? searchTerm : selectedCategory ? selectedCategory : ''
    }&number=10&addRecipeInformation=false&instructionsRequired=false&page=${pageNumber}`;

    axios.get(apiUrl)
      .then(response => {
        setRecipes(prevRecipes => [...prevRecipes, ...response.data.results]);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [searchTerm, selectedCategory, pageNumber]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };

    observer.current = new IntersectionObserver(handleObserver, options);
    if (observer.current && loading) {
      observer.current.observe(document.getElementById("bottom-of-page"));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading]);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Container>
      <div className="filter-bar">
        <TextField
          label="Search Recipes"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="search-input"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControl variant="outlined" className="category-select">
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {categoryOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Grid container spacing={3}>
        {recipes.map(recipe => (
          <Grid key={recipe.id} item xs={12} sm={6} md={4} lg={3}>
            <Link to={`/recipes/${recipe.id}`}>
              <Card className="card">
                <CardMedia
                  component="img"
                  height="140"
                  image={recipe.image}
                  alt={recipe.title}
                />
                <CardContent className="card-content">
                  <Typography variant="h6" className="card-title">
                    {recipe.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      {loading && <p>Loading...</p>}
      <div id="bottom-of-page" style={{ minHeight: "10px" }}></div>
    </Container>
  );
}

export default RecipeList;