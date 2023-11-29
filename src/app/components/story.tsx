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

  const handleTabs = (e, clickedTabIndex) => {
    e.preventDefault();

    setTabs((prevTabs) =>
      prevTabs.map((tab, index) => {
        tab.current = index === clickedTabIndex;
        return tab;
      })
    );
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
                      tab.current
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-500 hover:text-gray-700",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={tab.current ? "page" : undefined}
                    onClick={(e) => handleTabs(e, index)}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </InstantSearch>
  );
};

export default Story;
