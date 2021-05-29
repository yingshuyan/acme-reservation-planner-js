export const createEle = (tagName, attList, text) => {
  const ele = document.createElement(tagName);
  Object.assign(ele, attList);
  if (!!text) {
    ele.innerHTML = text;
  }

  return ele;
};
