import Link from 'next/link';
import React from 'react';

import { withApollo } from '../apollo';
import { useRecipeListQuery } from '../generated/graphql';

function RecipeListPage() {
  const { data, error, loading } = useRecipeListQuery();

  if (error) {
    return (
      <div style={{ color: 'red' }}>An unexpected error has occurred.</div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Recipes</h1>
      <ul>
        {data?.recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link href={`/recipe/${recipe.slug}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default withApollo()(RecipeListPage);
