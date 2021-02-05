// class APIFeatures {
//   constructor(query, queryString) {
//     this.query = query
//     this.queryString = queryString
//   }

//   sort() {
//     if (this.queryString.sort) {
//       const sortBy = this.queryString.sort.split(',').join(' ')
//       return this.query.orderBy(sortBy).get()
//     }
//     return this.get()
//   }

//   paginate() {
//     const page = this.queryString.page * 1 || 1
//     const limit = this.queryString.limit * 1 || 10
//     const skip = (page - 1) * limit

//     return this.query.startAt(skip).limit(limit).get()
//   }

//   // Field Limiting ex: -----/user?fields=name,email,address
//   // limitFields() {
//   //   if (this.queryString.fields) {
//   //     const fields = this.queryString.fields.split(',').join(' ')
//   //     return this.query.select(fields).get()
//   //   }
//   //   return this.get()
//   // }
// }

// export default APIFeatures
