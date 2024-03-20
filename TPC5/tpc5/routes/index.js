var express = require('express');
var router = express.Router();
var axios = require('axios');

///////////////////////////////////////////////////////////

// Obtem todos os compositores de um periodo
function obterCompositoresPeriodo(periodo){
  return axios.get("http://localhost:3000/compositores?periodo=" + periodo)
      .then(function(response){
          return response.data;
      })
      .catch(function(erro){
          throw erro;
      });
}

// Aux functions
function collectRequestBodyData(request, callback) {
  if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
      let body = '';
      request.on('data', chunk => {
          body += chunk.toString();
      });
      request.on('end', () => {
          callback(parse(body));
      });
  } else {
      callback(null);
  }
}

///////////////////////////////////////////////////////////

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('PaginaInicial', {});
});

/* Compositores */
router.get('/compositores', function(req, res, next) {
    axios.get('http://localhost:3000/compositores')
    .then(resposta => {
      res.render('paginaCompositores', {dados: resposta.data});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro ao recuperar os compositores"});
    })
});

/* Compositor */
router.get(/compositores\/C\d+/, function(req, res, next) {
  axios.get('http://localhost:3000' + req.path)
  .then(resposta => {
    res.render('paginaCompositor', {dados: resposta.data});
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro ao recuperar o compositor"});
  })
});

/* Periodos */
router.get('/periodos', function(req, res, next) {
  axios.get('http://localhost:3000/periodos')
  .then(resposta => {
    res.render('paginaPeriodos', {dados: resposta.data});
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro ao recuperar os compositores"});
  })
});

/* Periodo */
router.get(/periodos\/\d+/, function(req, res, next) {
  axios.get('http://localhost:3000' +  req.path)
  .then(resposta => {
    obterCompositoresPeriodo(resposta.data.periodo)
      .then(function(compositores){
        res.render('paginaPeriodo', {dados: resposta.data, compositores});
      });
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro ao recuperar os periodos"});
  })
});

/* Periodos exp */
router.get(/compositores\?periodo=([a-zA-Z])*/, function(req, res, next) {
  axios.get('http://localhost:3000' +  req.path)
  .then(resposta => {
    res.render('paginaPeriodosExp', {dados: resposta.data});
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro ao recuperar os compositores"});
  })
});

/* Compositor delete */
router.get(/compositores\/delete\/C\d+/, function(req, res, next) {
  var id = req.url.split("/")[3]
  axios.delete('http://localhost:3000/compositores/' + id)
  .then(resposta => {
    res.render('paginaCompositorDelete', {dados: resposta.data});
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro ao recuperar compositor a eliminar"});
  })
});

/* Compositor adicionar */
router.get("/compositores/add", function(req, res, next) {
    res.render('paginaCompositorAdd', {});
});

/* Pedido post do compositor adicionar */
router.post('/compositores/add', (req, res) => {
      axios.post("http://localhost:3000/compositores", req.body)
        .then(response => {
          res.render('paginaCompositor', {dados: response.data});
        })
        .catch(erro => {
          res.render('error', { error: erro, message: "Erro ao adicionar compositor" });
        });
    } 
);

/* Compositor editar */
router.get(/compositores\/edit\/C\d+/, function(req, res, next) {
  var id = req.url.split("/")[3]
  axios.get('http://localhost:3000/compositores/' + id)
  .then(resposta => {
    res.render('paginaCompositorEdit', {dados: resposta.data});
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro ao recuperar o compositor"});
  })
});

/* Compositor editar pedido post */
router.post('/compositores/edit/:id', (req, res) => {
  var id = req.params.id; // Captura o ID da URL
  axios.put(`http://localhost:3000/compositores/${id}` , req.body)
    .then(response => {
      res.render('paginaCompositor', {dados: response.data});
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro ao editar compositor" });
    });
} 
);

/* Periodo delete */
router.get('/periodos/delete/:id', function(req, res, next) {
  var id = req.params.id; // Captura o ID da URL
  axios.delete(`http://localhost:3000/periodos/${id}`)
  .then(resposta => {
    res.render('paginaPeriodoDelete', {dados: resposta.data});
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro ao eliminar periodo"});
  })
});

/* Periodo editar */
router.get("/periodos/edit/:id", function(req, res, next) {
  var id = req.params.id; // Captura o ID da URL
  axios.get(`http://localhost:3000/periodos/${id}`)
  .then(resposta => {
    res.render('paginaPeriodoEdit', {dados: resposta.data});
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro obter pagina para editar o periodo"});
  })
});

/* Periodo put */
router.post("/periodos/edit/:id", function(req, res, next) {
  var id = req.params.id; // Captura o ID da URL
  axios.put(`http://localhost:3000/periodos/${id}`, req.body)
    .then(resposta => {
      obterCompositoresPeriodo(resposta.data.periodo)
        .then(compositores => {
          res.render('paginaPeriodo', { dados: resposta.data, compositores });
        })
        .catch(erro => {
          res.render('error', { error: erro, message: "Erro ao editar periodo" });
        });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro ao editar periodo" });
    });
});

/* Periodo adicionar */
router.get("/periodos/add", function(req, res, next) {
  res.render('paginaPeriodoAdd', {});
});

/* Periodo adicionar put */
router.post("/periodos/add", function(req, res, next) {
  axios.post(`http://localhost:3000/periodos`, req.body)
    .then(resposta => {
      obterCompositoresPeriodo(resposta.data.periodo)
        .then(compositores => {
          res.render('paginaPeriodo', { dados: resposta.data, compositores });
        })
        .catch(erro => {
          res.render('error', { error: erro, message: "Erro ao adicionar periodo" });
        });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro ao adicionar periodo" });
    });
});

module.exports = router;