'use client';

import cx from 'classnames';
import algoliasearch from 'algoliasearch/lite';
import { Highlight, Hits, InstantSearch, SearchBox } from 'react-instantsearch';
import { Hit } from 'instantsearch.js';
import { useState } from 'react';
import HighlightCode from 'react-highlight';
import Image from 'next/image';

const searchClient = algoliasearch(
  'PVXYD3XMQP',
  '69636a752c16bee55133304edea993f7'
);

const tabs = [
  {
    name: 'Complementary reco',
    href: '#',
    title: 'Complementary recommendations',
    description: 'Try to edit the code to see the results',
    story: [
      {
        id: '1',
        name: 'Set up InstantSearch',
        app: (
          <div>
            <h1>Search</h1>
          </div>
        ),
        code: `function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="instant_search">
      {/* ... */}
    </InstantSearch>
  );
}`,
      },
      {
        id: '2',
        name: 'Add a search box',
        app: (
          <div>
            <h1>Search</h1>
            <SearchBox />
          </div>
        ),
        code: `function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="instant_search">
      <SearchBox />
    </InstantSearch>
  );
}`,
      },
      {
        id: '3',
        name: 'Add hits',
        app: (
          <div>
            <h1>Search</h1>
            <SearchBox />
            <Hits />
          </div>
        ),
        code: `function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="instant_search">
      <SearchBox />
      <Hits />
    </InstantSearch>
  );
}`,
      },
      {
        id: '4',
        name: 'Customize hits',
        app: (
          <div>
            <h1>Search</h1>
            <SearchBox />
            <Hits hitComponent={Hit} />
          </div>
        ),
        code: `function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="instant_search">
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
}

function Hit({ hit }) {
  {/* ... */}
}`,
      },
    ],
  },
  {
    name: 'Alternative reco',
    href: '#',
    title: 'foo bar baz',
    description: 'bar baz qux',
    story: [],
  },
  {
    name: 'Trending items',
    href: '#',
    title: 'foo bar baz',
    description: 'bar baz qux',
    story: [],
  },
  {
    name: 'Trending facets value',
    href: '#',
    title: 'foo bar baz',
    description: 'bar baz qux',
    story: [],
  },
  // {
  //   name: "Looking similar",
  //   href: "#",
  //   title: "foo bar baz",
  //   description: "bar baz qux",
  //   story: [],
  // },
];

const Story = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentTab = tabs[currentTabIndex];
  const currentStep = currentTab.story[currentStepIndex];

  return (
    <InstantSearch searchClient={searchClient} indexName="games">
      <div className="w-full">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-grey-100 shadow-lg rounded-xl text-black">
            <div className="p-4 shadow-lg w-full h-full rounded-lg">
              {currentStep.app}
            </div>
          </div>

          <div>
            <div className="hidden sm:block">
              <nav className="flex flex-wrap space-x-4 p-2" aria-label="Tabs">
                {tabs.map((tab, index) => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    className={cx(
                      currentTabIndex === index
                        ? 'bg-xenon-100 text-xenon-500'
                        : 'text-grey-600 hover:text-grey-700',
                      'rounded-full px-3 py-2 text-xs font-medium uppercase'
                    )}
                    aria-current={
                      currentTabIndex === index ? 'page' : undefined
                    }
                    onClick={() => setCurrentTabIndex(index)}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>

              <div className="px-4 py-6 sm:px-0">
                <header className="p-4">
                  <h2 className="text-2xl font-bold leading-7 text-grey-900 sm:text-3xl sm:truncate">
                    {currentTab.title}
                  </h2>
                  <p className="mt-1 text-sm text-grey-500">
                    {currentTab.description}
                  </p>
                </header>

                <div>
                  <div className="p-8 rounded-lg bg-grey-100 text-sm overflow-scroll leading-loose">
                    <HighlightCode className="javascript">
                      {currentStep.code}
                    </HighlightCode>
                  </div>

                  <footer>
                    <div className="flex justify-end px-4">
                      {currentStepIndex > 0 && (
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 mt-4 mr-4 text-sm font-medium text-white bg-grey-300 border border-transparent transition-colors rounded-md shadow-sm hover:bg-grey-400 focus:outline-none"
                          onClick={() => {
                            setCurrentStepIndex(currentStepIndex - 1);
                          }}
                        >
                          Previous step
                        </button>
                      )}

                      {currentStepIndex !== currentTab.story.length - 1 && (
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-xenon-600 border border-transparent rounded-md shadow-sm transition-colors hover:bg-xenon-700 focus:outline-none"
                          onClick={() => {
                            setCurrentStepIndex(currentStepIndex + 1);
                          }}
                        >
                          {currentTab.story[currentStepIndex + 1].name}
                        </button>
                      )}
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InstantSearch>
  );
};

type HitProps = {
  hit: Hit<{
    header_image: string;
    name: string;
    short_description: string;
    tags: string[];
    screenshots: string[];
  }>;
};

function Hit({ hit }: HitProps) {
  return (
    <div className="grid grid-cols-3 my-4 gap-3">
      <Image
        src={hit.header_image}
        width={460}
        height={215}
        alt={hit.name}
        className="aspect-video w-full"
      />
      <div className="col-span-2">
        <h2 className="text-xl font-bold">
          <Highlight hit={hit} attribute="name" />
        </h2>
        <p>{hit.short_description}</p>
        <Tags tags={hit.tags} />
        {hit.screenshots.length && (
          <ul className="grid grid-cols-4 -mx-1">
            {hit.screenshots.slice(0, 4).map((screenshot) => (
              <li key={screenshot} className="block mx-1">
                <Image
                  src={screenshot}
                  width={479}
                  height={262}
                  alt={screenshot}
                  className="aspect-ratio"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

type TagsProps = {
  tags: string[];
};

function Tags({ tags }: TagsProps) {
  const [shouldShowMore, setShouldShowMore] = useState(false);
  const limit = 5;

  return (
    <>
      {tags.slice(0, shouldShowMore ? Infinity : limit).map((tag) => (
        <span className="inline-block bg-grey-200 rounded py-1 px-2 mx-0.5 text-xs text-grey-500">
          {tag}
        </span>
      ))}{' '}
      {tags.length > limit && (
        <button
          className="text-sm underline"
          onClick={() => {
            setShouldShowMore((state) => !state);
          }}
        >
          See {shouldShowMore ? 'less' : 'more'}
        </button>
      )}
    </>
  );
}

export default Story;
