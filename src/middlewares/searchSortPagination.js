"use strict";
module.exports = (req, res, next) => {
  //?SEARCHING

  const search = req.query?.search || {};

  for (let key in search) search[key] = { $regex: search[key], $options: "i" };

  //?sorting
  // url?sort[key1]=1&sort2[key2]=-1  (ASC=1,DESC=-1)

  const sort = req.query?.sort || {};

  //?LIMIT&PAGE
  console.log(req.query.limit);
  console.log(req.query.page);

  let limit = Number(req.query?.limit);
  limit = limit > 0 ? limit : process.env.LIMIT || 10;

  let page = Number(req.query?.page);
  page = (page > 0 ? page : 1) - 1;

  let skip = Number(req.query?.skip);
  skip = skip > 0 ? skip : page * limit;

  res.getModelList = async (Model, populate = Null) => {
    return await Model.find(search).skip(skip).limit(limit).populate(populate);
  };
  res.getModelListDetail = async (Model) => {
    const data = await Model.find(search);

    let details = {
      search,
      sort,
      limit,
      skip,
      page,
      pages: {
        current: page + 1,
        next: page + 2,
        previous: page,
        total: Math.ceil(data.length / limit),
      },
      totalRecords: data.length,
    };

    return details;

    // return await Model.find(search).skip(skip).limit(limit);
  };
  next();
};
