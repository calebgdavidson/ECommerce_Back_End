const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
// find all tags
// be sure to include its associated Product data
await Tag.findAll({
attributes: ["id", "tag_name"],
include: [{
model: Product,
attributes: ["id", "product_name", "price", "stock", "category_id"],
through: "ProductTag",
},],})
.then((parsedTagData) => {
res.json(parsedTagData);
})});

router.get('/:id', (req, res) => {
// find a single tag by its `id`
// be sure to include its associated Product data
Tag.findByPk(req.params.id, {
include: [{
model: Product,
attributes: ["id", "product_name", "price", "stock", "category_id"],
through: "ProductTag",
}],})
.then((retrievedTag) => {
res.json(retrievedTag);
})});

router.post('/', (req, res) => {
// create a new tag
Tag.create({
tag_name: req.body.tag_name,
})
.then((tag) => {
res.json(tag);
})
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;