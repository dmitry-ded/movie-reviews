import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Разрешаем запросы с этого домена
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Разрешаем методы
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Разрешаем заголовки
  next();
});

server.get('/films/:id/reviews', (req, res) => {
  const db = router.db; 
  const filmId = parseInt(req.params.id, 10);

  const film = db.get('films').find({ id: filmId }).value();

  if (film) {
    res.jsonp(film.reviews || []);
  } else {
    res.status(404).jsonp({ error: 'Film not found' });
  }
});

server.post('/films/:id/review', (req, res) => {
  const db = router.db;
  const filmId = parseInt(req.params.id, 10);

  const film = db.get('films').find({ id: filmId }).value();

  if (film) {
    const newReview = {
      id: Date.now(), 
      ...req.body,  
    };

    film.reviews = film.reviews || []; 
    film.reviews.push(newReview);


    db.write();


    res.status(201).jsonp(newReview);
  } else {
 
    res.status(404).jsonp({ error: 'Film not found' });
  }
});

server.delete('/films/:filmId/review/:reviewId', (req, res) => {
  const db = router.db;
  const filmId = parseInt(req.params.filmId, 10);
  const reviewId = parseInt(req.params.reviewId, 10);

  const film = db.get('films').find({ id: filmId }).value();

  if (film) {
    if (film.reviews && film.reviews.length > 0) {
      const reviewIndex = film.reviews.findIndex((review) => review.id === reviewId);

      if (reviewIndex !== -1) {
        film.reviews.splice(reviewIndex, 1);

        db.write();

        res.status(200).jsonp({ message: 'Review deleted successfully' });
      } else {
        res.status(404).jsonp({ error: 'Review not found' });
      }
    } else {
      res.status(404).jsonp({ error: 'No reviews found for this film' });
    }
  } else {
    res.status(404).jsonp({ error: 'Film not found' });
  }
});

server.use(middlewares);
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running on http://localhost:3001');
});