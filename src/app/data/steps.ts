export const steps = [
  `function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="instant_search">
      {/* ... */}
    </InstantSearch>
  );
}`,
  `function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="instant_search">
      <SearchBox />
    </InstantSearch>
  );
}`,
];
