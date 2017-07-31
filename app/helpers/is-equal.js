import Ember from 'ember';

export function isEqual(params, options) {
  let collection = params[0];
  let value = params[1];
  console.log(params)
  if(options.collection === 'true'){
    let match = value.filter((item)=>{
      if(item.get('id').toString() === value.toString()){
        return item;
      }
    })[0];
    if(match){
      return true;
    }
  } else {
    return params[0].toString() === params[1].toString();
  }
  return false
}

export default Ember.Helper.helper(isEqual);
