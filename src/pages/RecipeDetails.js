// RecipeDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button } from '@mui/material';
import './RecipeDetails.css';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const apiKey = '31bdb396672d40578e2d7c06697328cd';
    const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

    axios.get(apiUrl)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        console.error('Error fetching recipe details:', error);
      });
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const {
    title,
    image,
    servings,
    calories,
    protein,
    fat,
    pricePerServing,
    percentDailyVitamins,
    readyInMinutes,
    analyzedInstructions,
  } = recipe;

  return (
    <Container className="recipe-details">
      <div className="header">
        <Button
          variant="outlined"
          component={Link}
          to="/"
          className="back-button"
        >
          Back to Recipe List
        </Button>
      </div>
      <div className="recipe-content">
        <img src={image} alt={title} className="recipe-image" />
        <div className="recipe-info">
          <Typography variant="h4" className="recipe-title">
            {title}
          </Typography>
          <Typography variant="subtitle1" className="recipe-subtitle">
            Serves {servings} | Ready in {readyInMinutes} minutes
          </Typography>
          <Typography variant="body1" className="recipe-info">
            Calories: {calories} | Protein: {protein} | Fat: {fat}
          </Typography>
          <Typography variant="body1" className="recipe-info">
            Price per Serving: {pricePerServing} | {percentDailyVitamins}% of daily requirements
          </Typography>
        </div>
      </div>
      <div className="recipe-instructions">
        <strong>Instructions:</strong>
        <ol>
          {analyzedInstructions[0]?.steps.map((step, index) => (
            <li key={index}>{step.step}</li>
          ))}
        </ol>
      </div>
    </Container>
  );
}

export default RecipeDetails;
