const router = require('express').Router();
const productCtrl = require('../controllers/products');
const { authorize } = require('../middleware/auth');
const { upload } = require('../helpers/file-upload');

router.post('/add-product-info', authorize, productCtrl.addNewProduct);
router.post('/add-product-variation', authorize, productCtrl.addProductVariation);
router.post('/add-product-selling-info', authorize, productCtrl.addProductSellingInfo);
router.post('/add-product-images', authorize, upload.array('producImage', 2), productCtrl.addProductImages);
router.post('/add-product-desc-info', authorize, productCtrl.addProductDesc);
router.post('/get-all-products', productCtrl.listAllProduct);
router.post('/filter-products', productCtrl.filterProducts);
router.get('/search-products', productCtrl.searchFromProducts);
router.get('/get-product-details/:productId', productCtrl.getProductDetails);

module.exports = router;