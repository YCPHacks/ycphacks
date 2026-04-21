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
        <div class="p-4">

          <div class="mb-4">
            <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="Search hardware..."
            />
          </div>

          <template v-if="filteredItems.length > 0">
            <div class="row align-items-start">
              <div class="hardware-item-div col-md-4 col-sm-6 col-xs-12 p-2 pt-0" v-for="item in filteredItems">
                <div class="hardware-item-card w-100 h-100 card rounded-4 p-2 d-flex flex-column">

                  <div class="hardware-img-background ratio ratio-1x1 rounded-2">
                    <img
                        class="hardware-img rounded-2"
                        :src="item.image"
                        :alt="item.name"
                    />
                  </div>

                  <div class="hardware-item-info d-flex flex-column mt-1">
                    <h3 class="text-center">{{item.name}}</h3>

                    <div class="container">
                      <div class="row d-flex align-items-center justify-content-center">

                        <div class="col col-6 col-md-12 col-lg-6 mb-0 px-0">
                          <p class="text-center m-0">
                            <span v-if="item.availableCount === 0">None </span>
                            <span v-else>{{item.availableCount}} </span>
                            Open
                          </p>
                        </div>

                        <div class="col col-6 col-md-12 col-lg-6 mb-0 px-0" v-if="item.availableCount!==0">
                          <p class="text-center m-0">
                            <span v-if="item.functionalCount===0">None </span>
                            <span v-else>{{item.functionalCount}} </span>
                            Working
                          </p>
                        </div>
  <!--                      <p class="col col-1"></p>-->
                      </div>
                    </div>

                    <div class="row m-0 mt-4 p-0 d-flex align-items-center">
                      <div class="col m-0 p-0">
                        <h5 class="m-0 p-0 text-start">Description</h5>
                      </div>

                      <div class="hover-pointer col-auto d-flex align-items-end" @click="item.showItemDescription = !item.showItemDescription">
                        <i v-if="item.showItemDescription" class="bi bi-chevron-down icon-bold cursor-pointer"></i>
                        <i v-else class="bi bi-chevron-left icon-bold cursor-pointer"></i>
                      </div>
                    </div>

                    <div class="m-0 mt-1 p-0">
                      <p v-if="item.showItemDescription" class="p-0 m-0">{{item.description}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <div v-else class="text-center p-5 not-found-box"></div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
// ... (script content remains unchanged)
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
          if (!Array.isArray(group.items)) return [];

          return group.items.map(p => {
            const fullName = p.fullName || p.name || group.title || "Unknown Hardware";
            return {
              name: fullName,
              description: p.description || "No description available.",
              image: p.image || new URL('../assets/placeholder.png', import.meta.url).href,
              isUnavailable: p.isUnavailable,
              isNonFunctional: !p.isFunctional,
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
            nonFunctionalCount: 0,
            showItemDescription: false
          };
        }

        grouped[name].totalCount += 1;
        if(p.isUnavailable){
          grouped[name].unavailableCount += 1;
        }
        else if (p.isNonFunctional) {
          grouped[name].nonFunctionalCount += 1;
        }
      });

      return Object.values(grouped).map(item => {
        // 1. Calculate the total pool of functional items
        const functionalCount = item.totalCount - item.nonFunctionalCount;

        // 2. Calculate the available count (Functional MINUS Unavailable)
        const availableCount = item.totalCount - item.unavailableCount;

        let availabilityText;
        let isUnavailable = false;
        let availabilityStatus;

        if (availableCount <= 0) {
          availabilityText = "Unavailable";
          isUnavailable = true;
          availabilityStatus = 'none';
        } else if (availableCount === functionalCount){
          // Status 'all' means ALL functional items are currently available
          availabilityText = `${availableCount} / ${functionalCount} (Functional)`;
          availabilityStatus = 'all';
        }else{
          // Status 'some' means some functional items are unavailable
          availabilityText = `${availableCount} / ${functionalCount} (Functional)`;
          availabilityStatus = 'some';
        }

        return {
          ...item,
          availableCount,
          availabilityText,
          isUnavailable,
          availabilityStatus,
          // Expose the functional count
          functionalCount
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
/* --- NEW CSS CLASS FOR LARGER IMAGE SIZE --- */

.hover-pointer {
  cursor: pointer;
}

.hardware-item-div {
  aspect-ratio: auto;
}

.hardware-item-card {
  background-color: #221F20FF;
}

.hardware-img-background {
  background-color: lightgrey;
}

.hardware-img {
  width: 100%;
}

.hardware-item-info > h3 {
  color: #fff;
}

.hardware-item-info h5 {
  color: #fff;
}

.hardware-item-info p {
  color: #fff;
}

.hardware-item-info i {
  color: #fff;
}

.icon-bold {
  -webkit-text-stroke-width: 0.75px;
}

.p-4 {
  background-color: #008350;
  border: none;
}

.form-control::placeholder {
  color:#fff;
  font-weight: bolder;
  font-size: 22px;
}

.mb-4 input {
  background-color: #008350;
  border-color: #fff;
  color: #fff;
}
.p-5 {
  background-color: #008350;
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
  border: 1px dashed #fff;
  border-radius: 8px;
  background-color: #008350;
}
.not-found-box h2, .not-found-box o{
  color: #495057 !important;
}

.flex {
  font-size: 20px;
  margin-left: 150px;
}

@media (max-width: 768px) {
  .flex {
    margin-left: 0;
    font-size: 15px;
  }

}

</style>