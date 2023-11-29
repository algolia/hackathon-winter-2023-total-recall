const algoliasearch = require("algoliasearch");

const client1 = algoliasearch("94HE6YATEI", "473ed43952f78955d6cf0ea73bc6cc63");
const index1 = client1.initIndex("steamdb");

const client2 = algoliasearch("PVXYD3XMQP", "6e7c0f06fd1de7cccb6baecf8665b911");
const index2 = client2.initIndex("hackathon_steamdb");

index1.search("", {}).then(({ hits }) => {
  console.log(hits);
});
