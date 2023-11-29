"use client";

import cx from "classnames";
import Search from "./search";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch";
import { useState } from "react";
import { steps } from "../data/steps";
import Highlight from "react-highlight";

const searchClient = algoliasearch(
  "PVXYD3XMQP",
  "69636a752c16bee55133304edea993f7"
);

const tabs = [
  {
    name: "Complementary reco",
    href: "#",
    title: "Complementary recommendations",
    description: "Try to edit the code to see the results",
    storyObject: [
      {
        id: "1",
        name: "Add instantSearch",
        content: steps[0],
      },
      {
        id: "2",
        name: "Add your SearchBox",
        content: steps[1],
      },
    ],
  },
  {
    name: "Alternative reco",
    href: "#",
    title: "foo bar baz",
    description: "bar baz qux",
    storyObject: {},
  },
  {
    name: "Trending items",
    href: "#",
    title: "foo bar baz",
    description: "bar baz qux",
    storyObject: {},
  },
  {
    name: "Trending facets value",
    href: "#",
    title: "foo bar baz",
    description: "bar baz qux",
    storyObject: {},
  },
  {
    name: "Looking similar",
    href: "#",
    title: "foo bar baz",
    description: "bar baz qux",
    storyObject: {},
  },
];

const Story = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentCodeSample, setCurrentCodeSample] = useState(
    tabs[currentTab].storyObject[0].content
  );

  const handleTabs = (index) => {
    setCurrentTab(index);
  };

  return (
    <InstantSearch searchClient={searchClient} indexName="games">
      <div className="w-full border border-gray-300 bg-gray-200">
        <div className="grid grid-cols-2">
          <div className="p-4 bg-white">
            <Search />
          </div>

          <div>
            <div className="hidden sm:block">
              <nav className="flex space-x-4" aria-label="Tabs">
                {tabs.map((tab, index) => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    className={cx(
                      currentTab === index
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-500 hover:text-gray-700",
                      "rounded-md px-1 py-2 text-sm font-medium"
                    )}
                    aria-current={currentTab === index ? "page" : undefined}
                    onClick={() => handleTabs(index)}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>

              <div className="px-4 py-6 sm:px-0">
                <header className="p-4">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    {tabs[currentTab].title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {tabs[currentTab].description}
                  </p>
                </header>

                <div>
                  <div className="p-4 bg-white">
                    <Highlight className="javascript">
                      {currentCodeSample}
                    </Highlight>
                  </div>

                  <footer>
                    <div className="flex justify-end px-4">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 mt-4 mr-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none"
                        // onClick go to the next step, and display the next code snippet

                        onClick={() => {
                          setCurrentCodeSample(
                            tabs[currentTab].storyObject[0].content
                          );
                        }}
                      >
                        Previous step
                      </button>

                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none"
                        // onClick go to the next step, and display the next code snippet

                        onClick={() => {
                          setCurrentCodeSample(
                            tabs[currentTab].storyObject[1].content
                          );
                        }}
                      >
                        Add your searchbox
                      </button>
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

export default Story;
