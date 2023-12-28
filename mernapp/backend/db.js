const mongoose = require('mongoose');
//const mongoURI='mongodb+srv://gofood:mern123@cluster0.tmm8nf3.mongodb.net/gofoodmern?retryWrites=true&w=majority';
const mongoURI='mongodb://gofood:mern123@ac-lbz2fp5-shard-00-00.tmm8nf3.mongodb.net:27017,ac-lbz2fp5-shard-00-01.tmm8nf3.mongodb.net:27017,ac-lbz2fp5-shard-00-02.tmm8nf3.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-e2tooi-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.set('strictQuery', true);
const mongoDB=async ()=>{
    await mongoose.connect(mongoURI,{useNewUrlParser : true},async(err,result)=>{
        if(err) console.log("---",err)
        else{  
            console.log("connected");
            const fetched_data= await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function(err,data){
            const foodCategory= await mongoose.connection.db.collection("foodCategory")
            foodCategory.find({}).toArray(function(err,catData){
                if(err) console.log(err)
                else{ 
                    global.food_items=data;
                    global.foodCategory=catData;
            }
            })
            //     if(err) console.log(err)
            //     else{ 
            //         global.food_items=data;
            // }
            })
        }
    });
}
module.exports= mongoDB;
