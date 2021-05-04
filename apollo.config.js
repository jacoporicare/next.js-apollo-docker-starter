module.exports = {
  client: {
    service: {
      name: 'api',
      localSchemaFile: './schema.json',
    },
    excludes: ['src/generated/**', 'src/apollo/**'],
  },
};
