import ajax from "./ajax";
// 请求接口

const BASE = "";

export const reqLogin = (username, password) =>
  ajax(BASE + "/login", { username, password }, "POST");
export const reqAddUser = (user) =>
  ajax(BASE + "/manage/user/add", user, "POST");

// 获取分类列表
export const reqCategorys = (parentId) =>
  ajax(BASE + "/manage/category/list", { parentId });
export const reqAddCategory = (categoryName, parentId) =>
  ajax(BASE + "/manage/category/add", { categoryName, parentId }, "POST");
export const reqUpdateCategory = (categoryName, categoryId) =>
  ajax(BASE + "/manage/category/update", { categoryId, categoryName }, "POST");

// 获取商品分页列表
export const reqProductPage = (pageNum, pageSize) =>
  ajax(BASE + "/manage/product/list", { pageNum, pageSize });
//搜索商品分页列表
export const reqSearchProduct = (
  pageNum,
  productName,
  productDesc,
  pageSize = 5
) =>
  ajax(BASE + "/manage/product/search", {
    pageNum,
    pageSize,
    [productDesc]: productName,
  });
//添加商品
export const reqAddProduct = (
  categoryId,
  pCategoryId,
  name,
  desc = "",
  price = "",
  detail = "",
  imgs = []
) =>
  ajax(
    BASE + "/manage/product/add",
    {
      categoryId,
      pCategoryId,
      name,
      desc,
      price,
      detail,
      imgs,
    },
    "POST"
  );
//更新商品
export const reqUpdateProduct = (
  categoryId,
  pCategoryId,
  name,
  desc = "",
  price = "",
  detail = "",
  imgs = []
) =>
  ajax(
    BASE + "/manage/product/update",
    {
      categoryId,
      pCategoryId,
      name,
      desc,
      price,
      detail,
      imgs,
    },
    "POST"
  );
