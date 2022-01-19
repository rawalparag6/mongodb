####
-to find name,id,borough,cuisin in restaurant collection 
db.resturant.find()

-db.restaurants.find({resturant_id:1,name:1,borough:1,cuisine:1})
-query to display first 5 restaurants in borough Bronx
db.restaurants.aggregate([
    {$match:{borough:"Bronx"}},
    {$limit:5}
        ])

-all resturants in Bronx
db.restaurants.aggregate([
    {$match:{borough:"Bronx"}}
        ])

-next 5 after skipping the first 5
db.restaurants.aggregate([
    {$match:{borough:"Bronx"}},
    {$skip:5}
        ])

43-score more than 80 but less than 100
db.restaurants.find(
    {grades : 
        { $elemMatch:
            {"score":{$gt : 80 , $lt :100}
        }
    }});

44-lattitude value less than 95
db.restaurants.find(
    {"address.coord" : {$lt : -95.754168}
});

-does not prepare American food and reside 70 lattitude and achived score more than 70
db.restaurants.find(
    {$and:
         [
            {"cuisine" : {$ne :"American "}},
            {"grades.score" : {$gt : 70}},
            {"address.coord" : {$lt : -65.754168}}
         ]
     }
         );

-does not prepare American food and reside -65 lattitude and achived score more than 70
db.restaurants.find(
    {
      "cuisine" : {$ne : "American "},
      "grades.score" :{$gt: 70},
      "address.coord" : {$lt : -65.754168}
     }
);

-does not prepare american does not reside in brooklyn achived grade A and  must be descending order
db.restaurants.find( {
    "cuisine" : {$ne : "American "},
    "grades.grade" :"A",
    "borough": {$ne : "Brooklyn"}
} 
).sort({"cuisine":-1});

-find res_id,name,cuisine,borough of those restaurant which contain 'Wil' as their first 3 letters
db.restaurants.find(
    {name: /^Wil/},
    {
    "restaurant_id" : 1,
    "name":1,"borough":1,
    "cuisine" :1
    }
    );
-find res_id,name,cuisine,borough of those restaurant which contain 'ces' as their last 3 letters
db.restaurants.find(
    {name: /ces$/},
    {
    "restaurant_id" : 1,
    "name":1,"borough":1,
    "cuisine" :1
    }
    );
-belonged to borough bronx prepared either american or chinese
db.restaurants.find(
    { 
    "borough": "Bronx" , 
    $or : [
    { "cuisine" : "American " },
    { "cuisine" : "Chinese" }
    ] 
    } 
    );
-resturant rside in staten island,queens,brooklyn
db.restaurants.find(
    {"borough" :{$in :["Staten Island","Queens","Bronx","Brooklyn"]}},
    {
    "restaurant_id" : 1,
    "name":1,"borough":1,
    "cuisine" :1
    }
    );
-restaurant does not belong to staten Island,queens,Bronx,Brroklyn
db.restaurants.find(
    {"borough" :{$nin :["Staten Island","Queens","Bronx","Brooklyn"]}},
    {
    "restaurant_id" : 1,
    "name":1,"borough":1,
    "cuisine" :1
    }
    );

- restaurant Id, name, borough and cuisine for those restaurants which achieved a score which is not more than 10
db.restaurants.find(
    {"grades.score" : 
    { $not: 
    {$gt : 10}
    }
    },
    {
    "restaurant_id" : 1,
    "name":1,"borough":1,
    "cuisine" :1
    }
    );
-those restaurants which prepared dish except 'American' and 'Chinees' or restaurant's name begins with letter 'Wil'.
db.restaurants.find(
    {$or: [
      {name: /^Wil/}, 
      {"$and": [
           {"cuisine" : {$ne :"American "}}, 
           {"cuisine" : {$ne :"Chinees"}}
       ]}
    ]}
    ,{"restaurant_id" : 1,"name":1,"borough":1,"cuisine" :1}
    );
-achieved a grade of "A" and scored 11 on an ISODate "2014-08-11T00:00:00Z" among many of survey dates.
db.restaurants.find( 
    {
     "grades.date": ISODate("2014-08-11T00:00:00Z"), 
     "grades.grade":"A" , 
     "grades.score" : 11
    }, 
    {"restaurant_id" : 1,"name":1,"grades":1}
 );
 -contains a grade of A and score 9 on a specific date
 db.restaurants.find( 
    { "grades.1.date": ISODate("2014-08-11T00:00:00Z"), 
      "grades.1.grade":"A" , 
      "grades.1.score" : 9
    }, 
     {"restaurant_id" : 1,"name":1,"grades":1}
 );
 -location of the restaurants where 2nd element contains a value between 42 and 52
 db.restaurants.find( 
    { 
      "address.coord.1": {$gt : 42, $lte : 52}
    },
      {"restaurant_id" : 1,"name":1,"address":1,"coord":1}
 );
 - restaurants in ascending order along with all the columns
 db.restaurants.find().sort({"name":1});
 -in ascending order and for that same cuisine borough should be in descending order
 db.restaurants.find().sort(
    {"cuisine":1,"borough" : -1,}
   );
-Test whether all the addresses contains the street or not
db.restaurants.find(
    {"address.street" : 
        { $exists : true } 
    } 
  );
-he restaurants collection where the coord field value is double
db.restaurants.find(
    {"address.coord" : 
       {$type : 1}
    }
   );
-restaurants which returns 0 as a remainder after dividing the score by 7
db.restaurants.find(
    {"grades.score" :
       {$mod : [7,0]}
    },
       {"restaurant_id" : 1,"name":1,"grades":1}
  );
-restaurants which contains 'mon' as three letters somewhere in its name.
db.restaurants.find(
    { name : 
      { $regex : "mon.*", $options: "i" } 
    },
        {
          "name":1,
          "borough":1,
          "address.coord":1,
          "cuisine" :1
         }
    );

- restaurants which contain Mad as first three letters of its name
db.restaurants.find(
    { name : 
      { $regex : /^Mad/i, } 
    },
        {
          "name":1,
          "borough":1,
          "address.coord":1,
          "cuisine" :1
         }
    );
######