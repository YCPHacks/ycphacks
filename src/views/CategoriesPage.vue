<!-- Template -->
<template>
  <div class="categories-page">
    <div class="categories">
      <div class="container">

        <!-- Header -->
        <div class="header">
            <p>Hack Categories</p>
        </div>


        <!-- Spacer to push dropdown lower -->
        <div style="height: 60px;"></div>

        <!-- Centered dropdown -->
        <div class="dropdown-row">
          <div class="event-dropdown">
            <label for="event-select">Select Event:</label>
            <select id="event-select" v-model="selectedEventId" @change="fetchCategories">
              <option v-for="event in events" :key="event.id" :value="event.id">
                {{ event.name }}
              </option>
            </select>
          </div>
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

        <!-- No events or categories message -->
        <div v-if="!events.length" class="no-events-message">
          No events found.
        </div>
        <div v-if="!categories.length && selectedEventId" class="no-categories-message">
          No categories found for this event.
        </div>

        
      </div>
    </div>
  </div>  

</template> 
<!-- end Template -->


<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: [],
      events: [],
      selectedEventId: null
    };
  },
  created() {
    axios.get('http://localhost:3000/event/all')
      .then(response => {
        this.events = response.data.events
          ? response.data.events.map(event => ({ ...event }))
          : [];
        if (this.events.length > 0) {
          this.selectedEventId = this.events[0].id;
          this.fetchCategories();
        }
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  },
  methods: {
    fetchCategories() {
      if (!this.selectedEventId) return;
      axios.get(`http://localhost:3000/event/${this.selectedEventId}/categories`)
        .then(response => {
          this.categories = response.data.categories
            ? response.data.categories.map(category => ({ ...category, open: false }))
            : [];
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    },
    toggle(index) {
      this.categories[index].open = !this.categories[index].open;
    }
  }
};
</script>





<!-- Styling  -->
<style scoped>

.dropdown-row {
  display: flex;
  justify-content: right;
  margin-bottom: 30px;
}

.event-dropdown {
  display: flex;
  align-items: right;
  gap: 8px;
  margin: 0;
}
.header {
  position: relative;
}


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

.no-events-message,
.no-categories-message {
  color: #444;
  font-size: 20px;
  margin: 30px 0;
  font-style: italic;
}
</style>
<!-- end Styling  -->
