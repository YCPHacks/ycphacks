<template>
  <div class="container-fluid">
    <div class="row">
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
export default {
  name: "HardwarePage",
  data() {
    return {
      searchQuery: "",
      hardwareSections: [
        {
          id: "arduino",
          title: "Arduino",
          items: [
            {
              name: "Arduino Uno",
              image: "/images/arduino-uno.png",
              description: "A microcontroller board based on the ATmega328P, great for beginners."
            },
            {
              name: "Arduino Mega",
              image: "/images/arduino-mega.png",
              description: "A larger board with more pins and memory, ideal for complex projects."
            }
          ]
        },
        {
          id: "raspberry-pi",
          title: "Raspberry Pi",
          items: [
            {
              name: "Raspberry Pi 4",
              image: "/images/raspberry-pi4.png",
              description: "A powerful single-board computer used for IoT and embedded systems."
            }
          ]
        }
      ]
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
  }
};
</script>

<style scoped>
/* TOC pushed down even more */
.toc-box {
  margin-top: 12rem !important; /* increase this if you want it lower */
}

/* Main content slightly lower */
.main-box {
  margin-top: 6rem !important;
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