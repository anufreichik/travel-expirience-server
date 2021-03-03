export default function ignoreFavicon(app) {
  console.log('Ignore fav');
  app.get('/favicon.ico', (req, res) => res.status(204));
}
