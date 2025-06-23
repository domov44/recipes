export default async (req, res) => {
  const { reqHandler } = await import('../dist/compet/server/server.mjs');
  return reqHandler(req, res);
};