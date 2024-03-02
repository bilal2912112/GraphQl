import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import _db from "./_db.js";

// server setup
const resolvers = {
  Query: {
    games() {
      return _db.games;
    },
    game(_,args){
      return _db.games.find((game)=>game.id===args.id)
   },
    reviews() {
      return _db.reviews;
    },
    review(_,args){
       return _db.reviews.find((review)=>review.id===args.id)
    },
    authors() {
      return _db.authors;
    },
    author(_,args){
      return _db.authors.find((author)=>author.id===args.id)
   },
  },
  Game:{
    reviews(parent){
      return _db.reviews.filter((r)=>r.game_id===parent.id)
    }
  },
  Author:{
    reviews(parent){
      return _db.reviews.filter((r)=>r.author_id===parent.id)
    }
  },
  Review:{
    author(parent){
      return _db.authors.find((a)=>a.id===parent.author_id)
    }, 
    game(parent){
      return _db.games.find((g)=>g.id===parent.game_id)
    }
  },
  Mutation:{
    deleteGame(_,args){
      _db.games=_db.games.filter((g)=>g.id!==args.id)
      return _db.games
    }
  }
};
const server = new ApolloServer({
  // typeDefs
  typeDefs,
   resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);
