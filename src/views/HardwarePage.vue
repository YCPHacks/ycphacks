<template>
  <div class="container-top">
    <header class="main-header">
      <div class="text-center py-4">
        <h1 class="mb-2">Hardware</h1>
        <hr class="header-line" />
      </div>
    </header>
  </div>
  <div class="container-fluid">
    <div class="row align-items-start mt-5">
      <main class="col-md-12 col-lg-8 offset-lg-2">
        <div class="p-4 border rounded bg-white shadow-sm main-box">
          
          <div class="mb-4">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control"
              placeholder="Search hardware..."
            />
          </div>

          <template v-if="filteredItems.length > 0">
            <div id="hardwareAccordion" class="accordion">
                <div 
                    v-for="(item, index) in filteredItems" 
                    :key="item.name" 
                    class="accordion-item mb-3"
                >
                    
                    <h2 :id="'heading-' + getSafeId(item.name)" class="accordion-header">
                      <button
                          class="accordion-button collapsed hardware-item-header"
                          type="button"
                          data-bs-toggle="collapse"
                          :data-bs-target="'#collapse-' + getSafeId(item.name)"
                          aria-expanded="false"
                          :aria-controls="'collapse-' + getSafeId(item.name)"
                      >
                      <span class="me-3">
                        <i
                          :class="['bi', getAvailabilityIconClass(item.availabilityStatus).icon, getAvailabilityIconClass(item.availabilityStatus).color]"
                          style="font-size: 1.1rem;"
                        ></i>
                      </span>
                      <div class="fw-bold">{{ item.name }}</div>
                          
                      </button>
                    </h2>

                  <div
                    :id="'collapse-' + getSafeId(item.name)"
                    class="accordion-collapse collapse"
                    :aria-labelledby="'heading-' + getSafeId(item.name)"
                    data-bs-parent="#hardwareAccordion"
                  >
                    <div class="accordion-body">
                      <div class="d-flex align-items-start">
                        <div class="flex-shrink-0 me-4">
                            <img
                                :src="item.image"
                                :alt="item.name"
                                class="img-thumbnail"
                                style="width: 150px; height: 150px; object-fit: contain;"
                            />
                        </div>

                        <div class="flex-grow-1">
                            
                            <div class="text-end small fw-semibold mb-2">
                                <span :class="{'text-danger': item.isUnavailable, 'text-success': !item.isUnavailable}">
                                    {{ item.availabilityText }}
                                </span>
                            </div>
                            
                            <p class="mb-3">
                                {{ item.description }}
                            </p>
                            
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </template>
          <div v-else class="text-center p-5 not-found-box">
            </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import hardwareService from "@/services/hardwareService";

export default {
  name: "HardwarePage",
  data() {
    return {
      searchQuery: "",
      hardwareItems: []
    };
  },
  computed: {
    filteredItems() {
      // If there is no search query, return the original, full list of hardware sections.
      if (!this.searchQuery) {
          return this.hardwareItems;
      }

      const query = this.searchQuery.toLowerCase();
      
      return this.hardwareItems.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }
  },
  mounted() {
    this.fetchHardware();
  },
  methods: {
    async fetchHardware() {
      try {
        const groups = await hardwareService.getHardware();
        
        if (!Array.isArray(groups)) {
            console.warn("Unexpected backend response, expected an array:", groups);
            this.hardwareItems = [];
            return;
        }

        const allRawItems = groups.flatMap(group => {
            
            // Assume items are nested in 'items' array, or the group itself is the item.
            const itemsSource = Array.isArray(group.items) ? group.items : [group];
            
           return itemsSource.map(p => {
              const fullName = p.fullName || p.name || group.title || "Unknown Hardware";

              return {
                  name: fullName, 
                  description: p.description || "No description available.",
                  image: p.image || null,
                  isUnavailable: p.isUnavailable
              };
            });
        });
        
        this.hardwareItems = this.getAvailabilityData(allRawItems);
          
      } catch (err) {
          console.error("Failed to fetch hardware:", err); 
      }
    },
    getAvailabilityData(allProducts){
      const grouped = {};

      allProducts.forEach(p => {
        const name = p.name;

        if(!grouped[name]){
          grouped[name] = {
            name: name,
            description: p.description,
            image: p.image,
            totalCount: 0,
            unavailableCount: 0,
          };
        }
        grouped[name].totalCount += 1;
        if(p.isUnavailable){
          grouped[name].unavailableCount += 1;
        }
      });

      return Object.values(grouped).map(item => {
        const availableCount = item.totalCount - item.unavailableCount;
        let availabilityText;
        let isUnavailable = false;
        let availabilityStatus;

        if (availableCount === 0) {
          availabilityText = "Unavailable";
          isUnavailable = true;
          availabilityStatus = 'none';
        } else if (availableCount === item.totalCount){
          availabilityText = `${availableCount} / ${item.totalCount}`;
          availabilityStatus = 'all';
        }else{
          availabilityText = `${availableCount} / ${item.totalCount}`;
          availabilityStatus = 'some';
        }

        return {
          ...item,
          availableCount,
          availabilityText,
          isUnavailable,
          availabilityStatus
        };
      });
    },
    getAvailabilityIconClass(status){
      switch (status) {
        case 'none':
          // Red X mark: bi-x-circle-fill
          return { icon: 'bi-x-circle-fill', color: 'text-danger' };
        case 'some':
          // Yellow circle/dot: bi-dash-circle-fill (or bi-dot, bi-circle-fill)
          return { icon: 'bi-dash-circle-fill', color: 'text-warning' };
        case 'all':
          // Green checkmark: bi-check-circle-fill
          return { icon: 'bi-check-circle-fill', color: 'text-success' };
        default:
          return { icon: '', color: '' };
      }
    },
    getSafeId(name) {
        return name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';
    }
  },
};
</script>

<style scoped>
body {
    font-family: Lato, sans-serif;
    color: #fff;
    font-weight: 300;
    font-size: 18px;
    overflow-y: scroll;
    overflow-x: hidden;
}
.container-top{
    background-color: #64965d;
    position: relative;
    overflow: hidden;
}
.container-fluid {
  background-color: #93dda3;
  position: relative; /* Ensure this is the context for absolute positioning */
  overflow: hidden;
  min-height: 100vh;
}
/* TOC pushed down even more */
.toc-box {
  margin-top: 0; /* increase this if you want it lower */
}

/* Main content slightly lower */
.main-box {
  margin-top: 0;
}
/* background-color: #64965d; */
.main-header{
    margin-top: 6rem;
    margin-bottom: 0;
    color: #6c757d;
    width: 100%;
}
.main-header h1 {
    color: #f8f9fa;
}
.header-line{
    width: 60%;
    margin: 0.5rem auto 0;
    border-top: 3px solid #f8f9fa;
}

/* Sidebar min width */
aside {
  min-width: 200px;
}

/* Card hover effect */
.hardware-card {
  transition: box-shadow 0.2s ease-in-out;
}
.hardware-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}
.not-found-box{
  padding: 30px !important;
  margin-top: 30px;
  border: 1px dashed #ced4da;
  border-radius: 8px;
  background-color: #f8f9fa;
}
.not-found-box h2, .not-found-box o{
  color: #495057 !important;
}

html, body{
  height: 100%;
}
</style>