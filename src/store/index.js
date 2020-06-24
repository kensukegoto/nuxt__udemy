import Vuex from 'vuex';
import Cookie from "js-cookie";
const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts(state,posts){
        state.loadedPosts = posts
      },
      addPost(state,post) {
        // idを持ってなく無い？
        state.loadedPosts.push(post);
      },
      editPost(state,editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);
        state.loadedPosts[postIndex] = editedPost;
      },
      setToken(state,token){
        state.token = token;
      },
      clearToken(state){
        state.token = null;
      }
    },
    actions: {

      nuxtServerInit(vuexContext,context) {

        return context.app.$axios
          .$get(`/posts.json`)
          .then(data => {
            const postsArray = [];
            for (const key in data){
              postsArray.push({...data[key], id: key});
            }
            vuexContext.commit('setPosts',postsArray);
          })
          .catch(e => context.error(e))
      },
      addPost(vuexContext,post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        };
        return this.$axios.$post(`/posts.json?auth=${vuexContext.state.token}`,createdPost)
        .then(data => {
          vuexContext.commit("addPost",{ ...createdPost,id: data.name });
          
        })
        .catch(e => console.log(e))
      },
      editPost(vuexContext,editedPost) {
        return this.$axios.$put(`/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`,editedPost)
        .then(() => {
          vuexContext.commit("editPost",editedPost)
        })
        .catch(e => {
          console.log(e);
        })
      },
    // dispatchするとこれが呼ばれる？
    // dispatch時の第一引数は勝手に挿入される？
    // dispatch時の第二引数は呼び出す側でセットする？
      setPosts(vuexContext,posts){
        vuexContext.commit('setPosts',posts);
      },
      authenticateUser(vuexContext, authData) {

        let authUrl = !authData.isLogin ? 
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`
        :`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`;
  
        return this.$axios.$post(
          authUrl,
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then(result => {
          vuexContext.commit("setToken",result.idToken);

          localStorage.setItem("token",result.idToken);
          localStorage.setItem("tokenExpiration",new Date().getTime() + Number.parseInt(result.expiresIn * 1000));
          Cookie.set("jwt",result.idToken);
          Cookie.set("expirationDate",new Date().getTime() + Number.parseInt(result.expiresIn * 1000));

          return this.$axios.$post("http://localhost:3000/api/track-data",{
            data: "Authenticated !!"
          });
        })
        .catch(e => {
          throw e;
        })
      },
      // 有効なトークンをローカルに持っているならばそれを使うよ
      initAuth(vuexContext,req) {
        let token;
        let expirationDate;

        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
          if(!jwtCookie){
            return;
          }
          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
          .split(";")
          .find(c => c.trim().startsWith("expirationDate="))
          .split("=")[1];

        } else if (process.client) {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        } else {
          token = null;
          expirationDate = null;
        }

        if(new Date().getTime() > +expirationDate || !token) {
          console.log("No Token or Invalid Token");
          vuexContext.dispatch("logout");
          return;
        }
        vuexContext.commit("setToken",token);
      },
      logout(vuexContext){
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        if(process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }

      }
    },
    getters: {
    // つまり引数を渡す？
      loadedPosts(state){
        return state.loadedPosts
      },
      isAuthenticated(state){
        return state.token != null
      }
    }
  })
}

export default createStore;