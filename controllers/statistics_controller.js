var models = require('../models/models.js');

//GET /quizes/statistics
exports.statistics = function(req, res){
  models.Quiz.findAll().then(function(quizes){
    var numPregs = quizes.length;
      models.Comment.findAll().then(function(comments){
        var numComentarios = comments.length;
        var numComentariospublis = 0;
        var numPregsTot = 0;
        var media = 0;
        var sinComments = 0;
        var conComments = 0;
        var array=[];
        var borrado=1;
        for(var i=0; i<numComentarios; i++){
          if (comments[i].QuizId > numPregsTot) numPregsTot=comments[i].QuizId;
        }
        for(var i=0; i<numComentarios; i++){
          for (var j=0; j<numPregs; j++) {
            if (quizes[j].id==comments[i].QuizId) {
              borrado=0;
            }
          }
          if (comments[i].publicado==1 && borrado==0) {
            if(array[comments[i].QuizId]){
              array[comments[i].QuizId]++;
            }else{
              array[comments[i].QuizId] = 1;
            }
            numComentariospublis++;
          }
        }
        for(var i=1; i<=numPregsTot; i++){
          if(array[i]){
            conComments++;
          }
        }
        sinComments = numPregs-conComments;
        media = numComentariospublis/numPregs;
        res.render('quizes/statistics',
          {quizes: quizes, preguntas: numPregs, comentarios: numComentariospublis, media: media, sinComments: sinComments, conComments: conComments, errors: []});
      }).error(function(error){next(error);})
  }).error(function(error){next(error);})
};
