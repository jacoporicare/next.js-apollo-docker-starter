import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { withApollo } from '../../apollo';
import { useRecipeDetailQuery } from '../../generated/graphql';

function RecipeDetailPage() {
  const router = useRouter();

  const querySlug = router.query.slug?.toString();

  const { data, error, loading } = useRecipeDetailQuery({
    variables: { slug: querySlug! },
    skip: !querySlug,
  });

  if (error) {
    return (
      <div style={{ color: 'red' }}>An unexpected error has occurred.</div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const recipe = data?.recipe;

  if (!recipe) {
    return <div style={{ color: 'red' }}>Recipe not found.</div>;
  }

  return (
    <>
      <Link href="/">⬅ Back</Link>
      <h1>{recipe.title}</h1>
      <pre>{recipe.directions || 'No directions'}</pre>
    </>
  );
}

export default withApollo()(RecipeDetailPage);
