export class PostDto {
  id
  rating
  recommend
  text
  country
  city

  constructor(model) {
    this.id = model._id
    this.rating = model.rating
    this.recommend = model.recommend
    this.text = model.text
    this.country = model.country
    this.city = model.city
  }
}
