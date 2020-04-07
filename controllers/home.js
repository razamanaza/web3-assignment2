module.exports = {
  index(req, res){
    res.status(200).render('index', { title: 'Express' });
  }
}