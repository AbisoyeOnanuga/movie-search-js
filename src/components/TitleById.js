import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_TITLE_BY_ID = gql`
  query titleById {
    title(id: "tt0944947") {
      id
      type
      primary_title
      original_title
      start_year
      end_year
      runtime_minutes
      plot
      rating {
        aggregate_rating
        votes_count
      }
      genres
      posters {
        url
        width
        height
      }
    }
  }
`;

const TitleById = () => {
  const { loading, error, data } = useQuery(GET_TITLE_BY_ID);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>{data.title.primary_title}</h1>
      <p>{data.title.plot}</p>
      {/* Display other data as needed */}
    </div>
  );
};

export default TitleById;