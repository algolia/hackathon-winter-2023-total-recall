import { useRelatedProducts } from '@algolia/recommend-react/dist/esm/useRelatedProducts';
import recommend from '@algolia/recommend';
import type { RelatedProductsProps } from '@algolia/recommend-react';
import { Fragment, createElement } from 'react';
import { Pragma } from '@algolia/recommend-vdom';

const recommendClient = recommend(
  'PVXYD3XMQP',
  '69636a752c16bee55133304edea993f7'
);

export function RelatedProducts<TObject>(props: RelatedProductsProps<TObject>) {
  const {
    indexName,
    objectIDs,
    maxRecommendations,
    threshold,
    queryParameters,
    transformItems,
    itemComponent: ItemComponent = () => null,
  } = props;

  const { recommendations } = useRelatedProducts({
    indexName,
    objectIDs,
    maxRecommendations,
    threshold,
    queryParameters,
    transformItems,
    recommendClient,
  });

  return (
    <div>
      {recommendations.length > 0 && (
        <ol className="flex gap-4">
          {recommendations.map((recommendation) => (
            <li key={recommendation.objectID} className="flex-1">
              <ItemComponent
                item={recommendation}
                createElement={createElement as Pragma}
                Fragment={Fragment}
              />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
