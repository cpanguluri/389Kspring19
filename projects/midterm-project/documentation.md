
# Restaurants Around College Park

---

Name: Chandan Panguluri

Date: 04/12/2019

Project Topic: Restaurants Around College Park

URL: 

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`:     Name       `Type: String`
- `Field 2`:     Location       `Type: String`
- `Field 3`:     Price Range       `Type: Number`
- `Field 4`:     Tags       `Type: Array`
- `Field 5`:     Stars       `Type: Number`
- `Field 5`:     Authors       `Type: String`
- `Field 5`:     Comments       `Type: String`

Schema: 
```javascript
{
	name: {
		type: String,
		required: true
	}, 
	location: {
		type: String
	}, 
	price: {
		type: Number
	},
	tags:[String],
	stars: {
		type: Number
	},
	author: {
		type: String
	},
	comment: {
		type: String
	}
}
```

### 2. Add New Data

HTML form route: `/add`

POST endpoint route: `/add/:name/location/:location/price/:price/tags/:tags/stars/:stars/author/:author/comment/:comment'`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");
//Seperate Tags with _
var options = { 
    method: 'POST',
    url: 'http://localhost:3000/add/:name/location/:location/price/:price/tags/:tags/stars/:stars/author/:author/comment/:comment',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       name: 'Taco Bell',
       location: 'Baltimore Ave',
       price: 1,
       tags: ['Fast Food', 'Mexican'],
       stars: 5,
       author: "Me",
       comment: "Delicious"
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getRestaurants`

### 4. Search Data

Search Field: ...

### 5. Navigation Pages

Navigation Filters
1. Fast Food -> `  /tag/Fast%20Food  `
2. ... -> `  /tag/Mexican  `
3. ... -> `  /tag/American  `
4. ... -> `  /Asian%20Fusion  `
5. ... -> `  /Fine%20Dining  `

