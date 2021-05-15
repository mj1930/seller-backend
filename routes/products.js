const router = require('express').Router();
const productCtrl = require('../controllers/products');
const { authorize } = require('../middleware/auth');
const { upload } = require('../helpers/file-upload');

router.post('/add-product-info', authorize, productCtrl.addNewProduct);
router.post('/add-product-variation', authorize, productCtrl.addProductVariation);
router.post('/add-product-selling-info', authorize, productCtrl.addProductSellingInfo);
router.post('/add-product-images', authorize, upload.array('files', 5), productCtrl.addProductImages);
router.post('/add-product-desc-info', authorize, productCtrl.addProductDesc);
router.post('/get-all-products', authorize, productCtrl.listAllProduct);
router.post('/get-all-products-admin', authorize, productCtrl.listAllProductAdmin);
router.post('/filter-products', authorize, productCtrl.filterProducts);
router.get('/search-products', productCtrl.searchFromProducts);
router.get('/get-product-details/:productId', productCtrl.getProductDetails);
router.post('/v2/add-product', authorize, productCtrl.addProductNew);
router.post('/edit-product', authorize, productCtrl.editProductNew);
router.post('/update-product-price', authorize, productCtrl.updateProductPrice);

module.exports = router;