
import { Product } from "../models/product.js"

const getAllProductsStatic = async (req,res)=>{
   // throw new Error('testing error')
  
   const product = await Product.find({price:{$gt:30},rating:{$gte:4.5}}).sort('price').select('price name rating')
    res.status(200).json({product,nbHits:product.length})

}
const getAllProducts =async (req,res)=>{
   const {featured,company,name,sort,fields,numericFilters} = req.query
   const queryObject = {}
   if(featured){
    queryObject.featured = featured === 'true'?true:false;
   }
   if(company){
    queryObject.company = company
   }
   if(name){
       queryObject.name = {$regex:name,$options:'i'}
    }
    if (numericFilters) {
      const operatorMap = {
        '>': '$gt',
        '<': '$lt',
        '=': '$eq',
        '>=': '$gte',
        '<=': '$lte'
      };
      const regEx = /\b(<|>|>=|=|<|<=)\b/g;
      let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
      const options = ['price','rating']
      filters = filters.split(',').forEach((item) => {
        const [field,operator,value] = item.split('-')
        if(options.includes(field)){
          queryObject[field] = {[operator] : Number(value)}
        }
        
      });
  
    //   const regEx = /([a-zA-Z]+)([><=]+)(\d+(\.\d+)?)/;
    //   const filters = numericFilters.split(',');
  
    //   filters.forEach(filter => {
    //     const match = filter.match(regEx);
    //     if (match && match.length >= 4) {
    //       const field = match[1];
    //       const operator = match[2];
    //       const value = Number(match[3]);
  
    //       if (operatorMap[operator]) {
    //         queryObject[field] = { [operatorMap[operator]]: value };
    //       }
    //     }
    //   });
    // }
  
    }
  
    console.log(req.query)
    
    let result = Product.find(queryObject)
    if(sort){
     
        let sortList = sort.split(',').join(' ')
      result = result.sort(sortList)
      //console.log(sortList)
    }else{
      result=result.sort('createdAt')
    }
    if(fields){
     
      let fieldList = fields.split(',').join(' ')
    result = result.select(fieldList)
    
  }
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page-1) * limit
  result = result.skip(skip).limit(limit)
  
  const product = await result
  console.log(queryObject)
    
    res.status(200).json({product,nbHits:product.length})

}
export {getAllProducts,getAllProductsStatic}