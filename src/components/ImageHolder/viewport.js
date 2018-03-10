const isInViewPort = element => {
  if (
    element.offsetTop < window.innerHeight &&
    element.offsetTop > -element.offsetHeight &&
    element.offsetLeft > -element.offsetWidth &&
    element.offsetLeft < window.innerWidth
  ) {
    return true;
  }
  return false;
};

export default isInViewPort;
