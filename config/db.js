if(process.env.NODE_ENV == "production"){
   module.exports = {mongoURI:"mongodb+srv://jacksonblogapp:k2b7nm25@cluster0-ylzgp.mongodb.net/test?retryWrites=true&w=majority"}
}else{
    module.exports = {mongoURI:"mongodb://localhost/herokutest"}
}
