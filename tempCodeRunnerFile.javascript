const array = [5,7,9,5]

let count = 0,
for(let currentItem = 0, range = 0; (array.length <= range); range++){
  if(array[range] === currentItem){
  count++
  }
  if(array[range] > currentItem){
  currentItem = array[range]
  }
}
console.log(count)