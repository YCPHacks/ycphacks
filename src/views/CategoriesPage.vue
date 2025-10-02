<!-- Template -->
<template>
  <div class="categories-page">
    <div class="categories">
      <div class="container">

        <!-- Header -->
        <div class="header">
            <p>Hack Categories</p>
        </div>

        <!-- Categories list -->
        <ul class="categories-list">
          <li v-for="(category, index) in categories" :key="index" class="category">
              <div 
                class="category-header" 
                @click="toggle(index)"
              >
                {{ category.name }}
                <span>{{ category.open ? "▲" : "▼" }}</span>
              </div>


              <!-- if open show description and list of prizes -->
              <div v-show="category.open">
                <div class="category-description">
                  {{ category.description }}
                </div>

                <ul class="prize-list">
                  <li v-for="(prize, i) in category.prizes" :key="i">
                    {{ prize }}
                  </li>
                </ul>
              </div><!-- end if open -->


          </li> 
        </ul> <!-- end categories list -->
        
      </div>
    </div>
  </div>  

</template> 
<!-- end Template -->

<!-- Script -->
<script>
export default {
  data() {
    return {
      categories: [
        { name: "Category 1", description: "Description for Category 1", prizes: ["1st", "2nd", "3rd"], open: false },
        { name: "Category 2", description: "Description for Category 2", prizes: ["1st", "2nd", "3rd"], open: false },
        { name: "Category 3", description: "Description for Category 3", prizes: ["1st", "2nd", "3rd"], open: false }
      ]
    };
  },
  methods: {
    toggle(index) {
      this.categories[index].open = !this.categories[index].open;
    }
  }
};
</script>
<!-- end Script -->


<!-- Styling  -->
<style scoped>

.header{
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #00680a;
}

.categories-page {
  text-align: center;
  background-color: #ccffcc;
  position: relative;
  overflow: hidden;
}

.categories {
  margin-top: 50px;
  background-color: #93dda3;
}

.categories-list {
  list-style-type: none;  
  padding: 0;             
  margin: 0;              
}

.container {
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 38px 20px;
  box-sizing: border-box;
}

.category {
  margin-bottom: 20px;
  text-align: left;
  background: #fff;
  padding: 10px 15px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.category-header {
  cursor: pointer;
  font-weight: bold;
  font-size: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-description {
  margin: 10px 0;
  font-size: 16px;
  font-style: italic;
  color: #444;
}

.prize-list {
  margin-top: 10px;
  margin-left: 20px;
  list-style-type: circle;
  font-size: 18px;
}
</style>
<!-- end Styling  -->
