###-db.zipcodes.aggregate([{$match:{city:"ATLANTA",state:"GA"}}]).pretty()
-population of ATLANTA
db.zipcodes.aggregate( [
    {$match:{city:"ATLANTA"}},
   { $group: { _id: { city: "$city"}, pop: { $sum: "$pop" } } }
] )

-calculate population of each state
db.zipcodes.aggregate( [
    { $group: { _id: { state: "$state"}, pop: { $sum: "$pop" } } }
 ] )

- sorting of each State by highest population first
 db.zipcodes.aggregate( [
    { $group: { _id: { state: "$state"}, pop: { $sum: "$pop" } } },
    {$sort:{pop:-1}} 
 ] )

-limit result for 1st 3
 db.zipcodes.aggregate( [
    { $group: { _id: { state: "$state"}, pop: { $sum: "$pop" } } },
    {$sort:{pop:-1}},
    {$limit:3}
 ] )

-total population of each city and sort by hightest to limit=3
 db.zipcodes.aggregate( [
    { $group: { _id: {city:"$city",state: "$state"},pop: { $sum: "$pop" } } },
    {$sort:{pop:-1}},
    {$limit:3}
 ] )
#####
