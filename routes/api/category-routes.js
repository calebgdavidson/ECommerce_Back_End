const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// 1
router.get('/', (req, res) => {
// find all categories
await Category.findAll({
attributes: ["id", "category_name"],
include: [{
model: Product,
// be sure to include its associated Products
attributes: ["id", "product_name", "price", "stock", "category_id"]
}]})
.then((categories) => {
res.json(categories);
})});
//2
router.get('/:id', (req, res) => {
// find one category by its `id` value
await Category.findByPk(req.params.id, {
attributes: ["id", "category_name"],
include: [
{
model: Product,
// be sure to include its associated Products
attributes: ["id", "product_name", "price", "stock", "category_id"],
}],})
.then((category) => {
res.json(category);
})
.catch((err) => {
res.json(err);
});});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
// update a category by its `id` value
await Category.update(req.body, {
where: {
id: req.params.id,
},})
.then(cat => Category.findByPk(req.params.id))
.then((updatedCategory) => res.status(200).json(updatedCategory))
.catch((err) => {res.json(err);});
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;