import { Hits, Index, IndexProps } from 'react-instantsearch';
import { reverseHighlight } from 'instantsearch.js/es/helpers';

type QuerySuggestionsProps = IndexProps;

export function QuerySuggestions({ indexName }: QuerySuggestionsProps) {
  return (
    <Index indexName={indexName}>
      <Hits hitComponent={QuerySuggestion} />
    </Index>
  );
}

type QuerySuggestionProps = {
  hit: {
    objectID: string;
    query: string;
    popularity: number;
    nb_words: number;
  };
};

function QuerySuggestion({ hit }: QuerySuggestionProps) {
  return (
    <button
      dangerouslySetInnerHTML={{
        __html: reverseHighlight({
          attribute: 'query',
          hit,
        }),
      }}
    />
  );
}
