module.exports = (
  temp,
  {
    id,
    productName,
    image,
    quantity,
    product,
    organic,
    description,
    from,
    nutrients,
    price,
  }
) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, productName);
  output = output.replace(/{%IMAGE%}/g, image);
  output = output.replace(/{%NUTRIENTS%}/g, nutrients);
  output = output.replace(/{%QUANTITY%}/g, quantity);
  output = output.replace(/{%DESCRIPTION%}/g, description);
  output = output.replace(/{%FROM%}/g, from);
  output = output.replace(/{%PRODUCT%}/g, product);
  output = output.replace(/{%ID%}/g, id);
  output = output.replace(/{%PRICE%}/g, price);

  if (!organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output;
};
