<template>
  <div class="home-page">
    <section class="intro">
      <h1><span>Get the latest tech news!?</span></h1>
    </section>
    <section>
      <div class="your-class">
        <div>your content1</div>
        <div>your content2</div>
        <div>your content3</div>
      </div>
    </section>
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from '@/components/Posts/PostList';

export default {
  head () {
    return {
      script: [
        { 
          src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' 
        },
        {
          src: '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js'
        }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap' },
        { rel: 'stylesheet', href: '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css' }
      ]
    }
  },
  components: {
    PostList
  },
  computed: {
    loadedPosts(){
      return this.$store.getters.loadedPosts
    }
  },
  mounted(){
    
    if(process.client){

      const intro = document.querySelector(".intro");
      // $("h1").css({color:"green"});
      $(".your-class").slick();
      const myFunc = () => {
        const str = "後藤";
        console.log(`${str}`);
      }
      myFunc();
      console.log(intro);

    };

    
  }
}
</script>

<style scoped lang="scss">
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url("~assets/images/bg--title.jpg");
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
  span{
    color: blue;
  }
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

</style>