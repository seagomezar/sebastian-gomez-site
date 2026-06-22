// Stub for *.gql imports in Jest. The real query documents are produced by
// graphql-tag/loader at build time; in unit tests the Apollo client is mocked,
// so the document value is irrelevant — any named export resolves to this stub.
module.exports = new Proxy(
  {},
  {
    get: () => 'MOCK_GQL_DOCUMENT',
  },
);
