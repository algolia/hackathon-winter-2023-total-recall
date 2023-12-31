"use client";

import cx from "classnames";
import algoliasearch from "algoliasearch/lite";
import { Hit as BaseHit } from "instantsearch.js";
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Snippet,
} from "react-instantsearch";
import { useState } from "react";
import HighlightCode from "react-highlight";
import Image from "next/image";

import { RelatedProducts, SearchBox } from "./demo";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const searchClient = algoliasearch(
  "PVXYD3XMQP",
  "69636a752c16bee55133304edea993f7"
);

const tabs = [
  {
    name: "Complementary recommendations",
    title: "Complementary recommendations",
    description:
      "Drive cross sells by showing products that complement the current selection.",
    story: [
      {
        name: "Set up InstantSearch",
        description:
          "Install the <code>react-instantsearch</code> package. And create your DOM structure.",
        app: (
          <div className="flex flex-col gap-4">
            <div className="w-full h-16 border-grey-200 border-4 border-dashed rounded-lg dark:border-slate-900" />
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square border-grey-200 border-4 border-dashed rounded-lg dark:border-slate-900"
                ></div>
              ))}
            </div>
          </div>
        ),
        code: `function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="games">
      {/* ... */}
    </InstantSearch>
  );
}`,
      },
      {
        name: "Add a search box",
        description: "Add a search box to let your users search for products.",
        app: (
          <div className="flex flex-col gap-4">
            <span className="appear">
              <SearchBox />
            </span>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square border-grey-200 border-4 border-dashed rounded-lg dark:border-slate-900"
                ></div>
              ))}
            </div>
          </div>
        ),
        code: `function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="games">
      <SearchBox />
    </InstantSearch>
  );
}`,
      },
      {
        name: "Add hits",
        description: "Add hits display the results of your search.",
        app: (
          <div>
            <SearchBox />
            <span className="appear">
              <Hits
                classNames={{ list: "grid grid-cols-3 gap-2" }}
                hitComponent={({ hit }) => (
                  <pre
                    className="bg-gray-200 overflow-scroll text-sm aspect-square text-grey-600 p-4 rounded-lg appear dark:bg-slate-900 dark:text-gray-200"
                    style={{
                      transitionDelay: hit.__position * 50 + "ms",
                    }}
                  >
                    {JSON.stringify(hit, null, 2)}
                  </pre>
                )}
              />
            </span>
          </div>
        ),
        code: `function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="games">
      <SearchBox />
      <Hits />
    </InstantSearch>
  );
}`,
      },
      {
        name: "Customize hits",
        description:
          "Customize the rendering of your hits with the <code>hitComponent</code> prop.",
        app: (
          <div>
            <SearchBox />
            <span className="appear">
              <Hits classNames={{ list: "space-y-8" }} hitComponent={Hit} />
            </span>
          </div>
        ),
        code: `function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="games">
      <SearchBox />
      <Hits
        hitComponent={({ hit }) => (
          <>
            <img src={hit.image} alt={hit.name} />
            <h2>
              <Highlight hit={hit} attribute="name" />
            </h2>
            <p>
              <Snippet hit={hit} attribute="description" />
            </p>
            {/* … */}
          </>
        )}
      />
    </InstantSearch>
  );
}`,
      },
      {
        name: "Display complementary recommendations",
        description: "Add recommended titles for each search result.",
        app: (
          <div>
            <SearchBox />
            <Hits
              classNames={{ list: "space-y-8" }}
              hitComponent={({ hit }: HitProps) => (
                <Hit hit={hit}>
                  <div className="appear">
                    <h3 className="font-semibold text-lg mb-2">
                      Recommendations
                    </h3>
                    <RelatedProducts
                      indexName="games"
                      objectIDs={[hit.objectID]}
                      maxRecommendations={3}
                      itemComponent={({ item }: { item: HitProps["hit"] }) => (
                        <>
                          <Image
                            src={item.header_image}
                            width={460}
                            height={215}
                            alt={hit.name}
                            className="aspect-video w-full rounded mb-1"
                          />
                          <h3 className="font-semibold">{item.name}</h3>
                        </>
                      )}
                    />
                  </div>
                </Hit>
              )}
            />
          </div>
        ),
        code: `function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="games">
      <SearchBox />
      <Hits
        hitComponent={({ hit }) => (
          <>
            <img src={hit.image} alt={hit.name} />
            <h2>
              <Highlight hit={hit} attribute="name" />
            </h2>
            <p>
              <Snippet hit={hit} attribute="description" />
            </p>
            {/* … */}
            <RelatedProducts
              indexName="games"
              objectIDs={[hit.objectID]}
              maxRecommendations={3}
            />
          </>
        )}
      />
    </InstantSearch>
  );
}`,
      },
    ],
  },
  {
    name: "Alternative recommendations",
    title: "Complementary recommendations",
    description:
      "Maximize conversions, catalog exposure and time spent on site by showcasing alternative products or similar content.",
    story: [],
  },
  {
    name: "Trending items",
    title: "Trending items",
    description:
      "Inspire visitors by showing them specific items throughout the full product catalog and per specific facet value.",
    story: [],
  },
  {
    name: "Trending facets",
    title: "Trending facets",
    description: "Show trending categories like FPS, Adventure or RPG.",
    story: [],
  },
  {
    name: "Looking similar",
    title: "Looking similar",
    description: "Find visual similarities to increase catalog discovery.",
    story: [],
  },
];

const Story = () => {
  const searchParams = useSearchParams();
  const currentTabIndex = Number(searchParams.get("tab"));
  const currentStepIndex = Number(searchParams.get("step"));

  const currentTab = tabs[currentTabIndex];
  const currentStep = currentTab.story[currentStepIndex];

  return (
    <InstantSearch searchClient={searchClient} indexName="games">
      <Configure
        hitsPerPage={9}
        attributesToSnippet={["short_description:20"]}
      />
      <div className="w-full">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-grey-100 shadow-lg rounded-xl text-black dark:bg-slate-800 dark:text-gray-200 max-h-[980px] overflow-auto">
            <div className="p-4 shadow-lg w-full h-full rounded-lg">
              {currentStep.app}
            </div>
          </div>

          <div>
            <div className="hidden sm:block">
              <nav className="flex flex-wrap space-x-2 p-2" aria-label="Tabs">
                {tabs.map((tab, index) => {
                  const isDisabled = tab.story.length === 0;

                  return (
                    <Link
                      key={tab.name}
                      href={isDisabled ? "#" : `?tab=${index}`}
                      className={cx(
                        currentTabIndex === index
                          ? "bg-xenon-100 text-xenon-500"
                          : "text-grey-600 hover:text-grey-700",
                        "rounded-full px-3 py-2 text-xs font-medium uppercase",
                        isDisabled && "cursor-not-allowed"
                      )}
                      aria-current={
                        currentTabIndex === index ? "page" : undefined
                      }
                      title={isDisabled ? "This demo is not available yet" : ""}
                    >
                      {tab.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="px-4 pt-6 sm:px-0">
                <header className="py-4">
                  <h2 className="text-2xl font-bold leading-7 text-grey-900 sm:text-3xl sm:truncate dark:text-gray-100">
                    {currentTab.title}
                  </h2>
                  <p className="mt-1 text-sm text-grey-500 dark:text-gray-300">
                    {currentTab.description}
                  </p>
                </header>

                <div>
                  <div className="flex flex-col items-start justify-between py-4">
                    <h3 className="text-lg font-bold leading-6 text-grey-800 dark:text-gray-200">
                      <span className="-top-0.5 relative px-3 py-0.5 rounded-full text-sm font-medium bg-xenon-100 border border-xenon-200 text-xenon-700">
                        {currentStepIndex + 1}/{currentTab.story.length}
                      </span>{" "}
                      {currentStep.name}
                    </h3>

                    <p
                      className="mt-1 text-sm text-grey-500 dark:text-gray-300"
                      dangerouslySetInnerHTML={{
                        __html: currentStep.description,
                      }}
                    ></p>
                  </div>

                  <div>
                    <div
                      className={cx(
                        "flex  mb-4",
                        currentStepIndex === 0
                          ? "justify-end"
                          : "justify-between"
                      )}
                    >
                      {currentStepIndex > 0 && (
                        <Link
                          className="inline-flex items-center px-4 py-2 mr-4 text-sm font-medium text-white bg-grey-300 border border-transparent transition-colors rounded-md shadow-sm hover:bg-grey-400 focus:outline-none"
                          href={`?tab=${currentTabIndex}&step=${
                            currentStepIndex - 1
                          }`}
                        >
                          Previous step
                        </Link>
                      )}

                      {currentStepIndex !== currentTab.story.length - 1 && (
                        <Link
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-xenon-600 border border-transparent rounded-md shadow-sm transition-colors hover:bg-xenon-700 focus:outline-none"
                          href={`?tab=${currentTabIndex}&step=${
                            currentStepIndex + 1
                          }`}
                        >
                          Next: {currentTab.story[currentStepIndex + 1].name}
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="p-8 rounded-lg bg-grey-100 text-sm overflow-scroll leading-loose shadow-lg dark:bg-slate-800 dark:text-gray-200">
                    <HighlightCode className="javascript">
                      {currentStep.code}
                    </HighlightCode>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InstantSearch>
  );
};

type HitProps = React.PropsWithChildren<{
  hit: BaseHit<{
    header_image: string;
    name: string;
    short_description: string;
    tags: string[];
    genres: string[];
    screenshots: string[];
  }>;
}>;

function Hit({ hit, children }: HitProps) {
  return (
    <div className="space-y-4 border-b pb-4 border-gray-200">
      <div className="grid grid-cols-3 gap-3">
        <Image
          src={hit.header_image}
          width={460}
          height={215}
          alt={hit.name}
          className="aspect-video w-full rounded bg-slate-300 shadow animate-pulse dark:bg-slate-900"
          onLoad={(event) => {
            (event.target as HTMLImageElement).classList.remove(
              "animate-pulse"
            );
          }}
        />
        <div className="col-span-2">
          <h2 className="text-xl font-bold">
            <Highlight hit={hit} attribute="name" />
          </h2>
          <p className="text-sm text-gray-500">
            <Snippet hit={hit} attribute="short_description" />
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <Tags tags={hit.tags} />
        <div>
          <h3 className="font-semibold text-lg mb-2">Screenshots</h3>
          {hit.screenshots.length && (
            <ul className="grid grid-cols-5 -mx-1">
              {hit.screenshots.slice(0, 5).map((screenshot) => (
                <li key={screenshot} className="block mx-1">
                  <Image
                    src={screenshot}
                    width={479}
                    height={262}
                    alt={screenshot}
                    className="aspect-ratio bg-slate-300 rounded shadow animate-pulse dark:bg-slate-900"
                    onLoad={(event) => {
                      (event.target as HTMLImageElement).classList.remove(
                        "animate-pulse"
                      );
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        {children}
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
        <span
          key={tag}
          className="inline-block bg-grey-200 rounded py-1 px-2 mx-0.5 text-xs text-grey-500"
        >
          {tag}
        </span>
      ))}{" "}
      {tags.length > limit && (
        <button
          className="text-sm underline"
          onClick={() => {
            setShouldShowMore((state) => !state);
          }}
        >
          See {shouldShowMore ? "less" : "more"}
        </button>
      )}
    </>
  );
}

export default Story;
