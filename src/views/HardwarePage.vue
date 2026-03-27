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
                            class="img-thumbnail hardware-image"
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
              image: p.image || null,
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
          };
        }
        grouped[name].totalCount += 1;
        if(p.isUnavailable){
          grouped[name].unavailableCount += 1;
        }
        if (p.isNonFunctional) {
          grouped[name].nonFunctionalCount += 1;
        }
      });

      return Object.values(grouped).map(item => {
        // 1. Calculate the total pool of functional items
        const functionalCount = item.totalCount - item.nonFunctionalCount;

        // 2. Calculate the available count (Functional MINUS Unavailable)
        const availableCount = functionalCount - item.unavailableCount;

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
/* ... (existing styles above hardware-image) ... */

/* --- NEW CSS CLASS FOR LARGER IMAGE SIZE --- */
.hardware-image {
  /* Increased from 150px to 200px */
  width: 250px !important;
  height: 250px !important;
  object-fit: contain !important;
}
/* ------------------------------------------ */

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


</style>