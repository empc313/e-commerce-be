const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//GET
router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: ['id', 'category_name'],
    // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes:['id', 'product_name', 'category_id', 'stock', 'price']
      }
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'category_name'],
    // be sure to include its associated Products
    include:[{
model: Product,
      attributes: ['id', 'product_name', 'category_id', 'stock', 'price']
    }]
  })
.then(dbCategoryData => {
  if (!dbCategoryData) {
    res.status(404).json({message:"No category avalible"});
    return;
  }
  res.json(dbCategoryData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
})
});

//POST
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then((dbProductData) => res.json(dbProductData))
  .catch((err)=> {
    console.log(err);
    res.status(500).json(err);
  });
});

//PUT UPDATE
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData[0]) {
      res.status(404).json({message: 'No category'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//DELETE
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
