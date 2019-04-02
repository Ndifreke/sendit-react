const v = Array.prototype.map.call({me: "you", them:"use"}, (value) => {
  return value;
});
console.log(v)