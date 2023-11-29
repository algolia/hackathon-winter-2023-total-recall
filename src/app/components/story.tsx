"use client";

import cx from "classnames";
import Search from "./search";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch";
import { useState } from "react";

const searchClient = algoliasearch(
  "PVXYD3XMQP",
  "69636a752c16bee55133304edea993f7"
);

const tabs = [
  {
    name: "Complementary reco",
    href: "#",
    title: "foo bar baz",
    description: "bar baz qux",
    storyObkect: {},
  },
  {
    name: "Alternative reco",
    href: "#",
    title: "foo bar baz",
    description: "bar baz qux",
    storyObkect: {},
  },
  {
    name: "Trending items",
    href: "#",
    title: "foo bar baz",
    description: "bar baz qux",
    storyObkect: {},
  },
  {
    name: "Trending facets value",
    href: "#",
    title: "foo bar baz",
    description: "bar baz qux",
    storyObkect: {},
  },
  {
    name: "Looking similar",
    href: "#",
    title: "foo bar baz",
    description: "bar baz qux",
    storyObkect: {},
  },
];

const Story = () => {
  const [currentTab, setCurrentTab] = useState(0);

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
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={currentTab === index ? "page" : undefined}
                    onClick={() => handleTabs(index)}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>

              <div className="px-4 py-6 sm:px-0">
                <header>
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    {tabs[currentTab].title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {tabs[currentTab].description}
                  </p>
                </header>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InstantSearch>
  );
};

export default Story;
