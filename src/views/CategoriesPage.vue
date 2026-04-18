<!-- Template -->
<template>

  <div class="container-top">

    <!-- Header -->
    <header class="main-header">
      <div class="text-center py-4">
        <h1 class="mb-2">Hacks Categories</h1>
        <hr class="header-line" />
      </div>
    </header>

  </div>

    <div class="container-fluid">

        <!-- Centered dropdown -->
        <div class="dropdown-row">
          <div class="event-dropdown">
            <label for="event-select-label">Select Event:</label>
            <select id="event-select" v-model="selectedEventId" @change="fetchCategories">
              <option :value="null" disabled>Select an event</option>
              <option :value="null">None</option>
              <option v-for="event in events" :key="event.id" :value="event.id">
                {{ event.eventName }}
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
                {{ category.categoryName }}
                <span>{{ category.open ? "▲" : "▼" }}</span>
              </div>


              <!-- if open show list of prizes -->
              <div v-show="category.open">
                <ul class="prize-list" v-if="prizes && prizes.length">
                  <li v-for="(prize, pIndex) in prizes
                      .filter(p => p.categoryId === category.id)
                      .sort((a, b) => a.placement - b.placement)"
                      :key="pIndex">
                    {{ formatPlacement(prize.placement) }}: {{ prize.prizeName }}
                  </li>
                </ul>
                <div v-else>
                  No prizes found for this category.
                </div>
              </div>


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

</template> 
<!-- end Template -->


<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: [],
      prizes: [],
      events: [],
      selectedEventId: null
    };
  },
  created() {
    axios.get(`http://45.55.167.149:3000/event/all`)
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
      if (!this.selectedEventId) {
        this.categories = []; // clear categories if no event is selected
        console.log(this.categories);
        return;
      }
        axios.get(`http://45.55.167.149:3000/category/by-event/${this.selectedEventId}`)
        .then(response => {
          this.categories = response.data.categories
            ? response.data.categories.map(category => ({ ...category, open: false }))
            : [];
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    },
    async toggle(index) {
      const category = this.categories[index];
      category.open = !category.open;

      if (category.open) {
        try {
          const response = await axios.get(
            'http://45.55.167.149:3000/prize/by-event/' + this.selectedEventId
          );
          // Sort prizes by placement
          this.prizes = (response.data.prizes || []).sort(
            (a, b) => a.placement - b.placement
          );
        } catch (error) {
          console.error('Error fetching prizes:', error);
          this.prizes = [];
        }
      }
    },
    formatPlacement(num) {
      if (!num) return '';
      const j = num % 10,
            k = num % 100;
      if (j === 1 && k !== 11) return num + "st";
      if (j === 2 && k !== 12) return num + "nd";
      if (j === 3 && k !== 13) return num + "rd";
      return num + "th";
    }


  }//end methods
};
</script>

<style>
.category {
  margin-top: 30px;
  height: 100%;
  margin-bottom: 20px;
  text-align: left;
  padding: 10px 15px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.category-header {
  cursor: pointer;
  font-weight: bolder;
  font-size: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.categories-list {
  list-style-type: none;
  width: 70%;
  align-self: center;
  padding: 0;
  margin: 0 auto;
}

.event-dropdown label {
  font-weight: bolder;
  font-size: clamp(1rem, 10vw, 2rem);
}

.event-dropdown select {
  border: 1px solid;
  border-radius: 5px;
  font-size: clamp(1rem, 2vw, 2rem);
  font-weight: bold;
}

.no-events-message,
.no-categories-message {
  font-size: 50px;
  margin: auto 0;
  font-weight: bolder;
}

.event-dropdown {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0;
}

.prize-list {
  margin-top: 10px;
  margin-left: 20px;
  list-style-type: circle;
  font-size: 24px;
}

/* Mobile Support */
@media (max-width: 768px) {

  .categories-list {
    list-style-type: none;
    width: 100%;
    align-self: center;
    padding: 0;
    margin: 0 auto;
  }

  .event-dropdown label {
    border-radius: 5px;
    font-size: 20px;
    font-weight: bold;
  }

}
</style>