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
      <!-- TOC Sidebar -->
      <aside class="col-md-3">
        <div class="p-3 border rounded bg-light toc-box">
            <h2 class="fs-5 fw-bold mb-3">Hardware Contents</h2>
            <ul class="list-unstyled">
              <li v-for="section in hardwareSections" :key="section.id" class="mb-2">
                <a
                  :href="'#' + section.id"
                  class="text-primary text-decoration-none"
                >
                  {{ section.title }}
                </a>
              </li>
            </ul>
        </div>
       </aside>

      <!-- Main Content -->
      <main class="col-md-9">
        <div class="p-4 border rounded bg-white shadow-sm main-box">
          <!-- Search Bar -->
          <div class="mb-4">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control"
              placeholder="Search hardware..."
            />
          </div>

          <!-- Hardware Sections -->
          <section
            v-for="section in filteredSections"
            :key="section.id"
            :id="section.id"
            class="mb-5"
          >
            <h2 class="fs-3 fw-bold mb-4">{{ section.title }}</h2>

            <div class="row g-4">
              <div
                v-for="item in section.items"
                :key="item.name"
                class="col-md-6 col-lg-4"
              >
                <div class="card h-100 shadow-sm hardware-card">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="card-img-top p-3"
                    style="height: 200px; object-fit: contain;"
                  />
                  <div class="card-body">
                    <h3 class="card-title fs-5 fw-semibold">{{ item.name }}</h3>
                    <p class="card-text text-muted">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
      hardwareSections: []
    };
  },
  computed: {
    filteredSections() {
      if (!this.searchQuery) return this.hardwareSections;
      const query = this.searchQuery.toLowerCase();
      return this.hardwareSections
        .map(section => ({
          ...section,
          items: section.items.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
          )
        }))
        .filter(section => section.items.length > 0);
    }
  },
  mounted() {
    this.fetchHardware();
  },
  methods: {
    async fetchHardware() {
      try {
        const res = await hardwareService.getHardware();
        console.log("Raw backend data:", res);

        let hardwareArray = [];

        if (Array.isArray(res)) {
          hardwareArray = res;
        } else if (typeof res === "object" && res !== null) {
          hardwareArray = Object.keys(res).map(title => ({
            title,
            products: res[title]
          }));
        } else {
          console.warn("Unexpected backend response:", res);
          return;
        }

        this.hardwareSections = hardwareArray.map(group => ({
          id: group.title.toLowerCase().replace(/\s+/g, "-"),
          title: group.title,
          items: group.items.map(p => ({
            name: p.hardwareName,
            description: p.description || "No description available.",
            image: p.imageUrl || null
          }))
        }));
      } catch (err) {
        console.error("Failed to fetch hardware:", err);
      }
    }
  }
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
</style>