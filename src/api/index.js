import ajax from "./ajax";
// 请求接口

const BASE = "";

export const reqLogin = (username, password) =>
  ajax(BASE + "/login", { username, password }, "POST");

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

export const reqDeleteImg = (name) =>
  ajax(BASE + "/manage/img/delete", { name }, "POST");
// 请求所有角色,前台分页
export const reqRoles = () => ajax(BASE + "/manage/role/list");
//添加角色
export const reqAddRoles = (roleName) => ajax(BASE + "/manage/role/add",{roleName},"POST");
//更新角色
export const reqUpdateRoles = (_id,menus,auth_time,auth_name) => ajax(BASE + "manage/role/update",{_id,menus,auth_time,auth_name},"POST");
//获取用户列表
export const reqGetusers = () => ajax(BASE + "/manage/user/list");
//添加用户
export const reqAddUser = (username,password,phone,email,role_id) => ajax(BASE + "/manage/user/add",{username,password,phone,email,role_id},"POST");
//删除用户
export const reqDeleteUser = (userId) => ajax(BASE + "/manage/user/delete",{userId},"POST");
//更新用户
export const reqUpdateUser = (_id,username,phone,email,role_id) => ajax(BASE + "/manage/user/update",{_id,username,phone,email,role_id},"POST");
