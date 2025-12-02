<template>
  <div class="landing-page">
    <!-- Intro / Event Header with Top Video -->
    <div v-if="!isLoggedIn" class="intro-container">
      <video id="bgvideo" autoplay loop muted preload="auto">
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div class="intro">
        <h1>{{ activeEvent?.eventName }}</h1>
        <p v-if="activeEvent" class="event-date">
          {{ formatDate(activeEvent.startDate) }} – {{ formatDate(activeEvent.endDate) }}
        </p>
        <h2>York College of Pennsylvania</h2>
        <router-link class="register-button" to="/register">Create Account</router-link>
      </div>
    </div>

    <!-- About Section -->
    <div v-if="!isLoggedIn" class="about" id="about">
      <h3>About</h3>
      <p>
        Conveniently nestled in rural Pennsylvania, YCP Hacks is a college-level hackathon with small-town charm. An hour north of Baltimore, an hour and a half from Philadelphia, and 2 hours from Penn State places it right in the middle of Pennsylvania Dutch Country. Our mission is to promote technical knowledge, innovation, and entrepreneurship in York and beyond.
      </p>
    </div>

    <!-- Recap Videos -->
    <div v-if="!isLoggedIn" class="attend" id="attend">
      <div class="green-box">
        <div class="video-row">
          <div class="video-text">2021 Recap Video</div>
          <iframe width="500" height="380" src="https://www.youtube.com/embed/Ru9zvWGSH8U?autoplay=1&mute=1" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="video-row">
          <div class="video-text">2017 Recap Video</div>
          <iframe width="500" height="380" src="https://www.youtube.com/embed/k5A2QTasITs" frameborder="0" allowfullscreen></iframe>
        </div>

        <h3 class="apply-now-heading">Can't wait to apply?</h3>
        <p>Sign up <a href="http://146.190.66.30:4174/">here</a> and we'll let you know when applications open!</p>
      </div>
    </div>

    <!-- Activities Component -->
    <Activities />

    <!-- FAQ Section -->
    <div class="faq" id="faq">
      <h3>FAQ</h3>
      <div class="question">
        <h4>What's a hackathon?</h4>
        <p>A 36-hour event where you work with a team to make something awesome. Mentors are available to help!</p>
        <h4>Can I come?</h4>
        <p>Any college student 18+ can attend.</p>
        <h4>Where is this going to be?</h4>
        <p>The Willman Business Center of <a href="https://goo.gl/maps/UzhJ14rStMz" target="_blank">York College</a>.</p>
        <h4>When will this be?</h4>
        <p>November 1 - 3, 2024</p>
        <h4>Why?</h4>
        <p>Learn new things, meet new people, and enjoy free food and swag.</p>
      </div>
    </div>

    <!-- Prizes -->
    <div class="prizes" id="prizes">
      <h3>Prizes</h3>
      <div class="prize-titles">
        <div>Quest 3</div>
        <div>Smart TV</div>
        <div>Quest 2</div>
        <div>Nintendo Switch</div>
        <div>Creality Ender 3D Printer</div>
        <div>TECBOSS 3D Pen and filament</div>
        <div>Beats Solo 3 Headphones</div>
        <div>Amazon Echo</div>
        <div>Apple Homepod Mini</div>
        <div>Google Nest Speaker</div>
        <div>Beats Pill</div>
        <div>Gaming Keyboard and Mouse</div>
        <div>Gaming Chair</div>
        <div>Arduino Starter Kit</div>
        <div>Google Swag!</div>
        <div>$200+ in gift cards</div>
        <div>$1000+ in cash prizes</div>
        <div>Sponsored Hacks to Come!</div>
      </div>
    </div>

    <!-- Sponsors -->
    <div class="sponsors" id="sponsors">
      <h3>2024 Sponsors</h3>
      <div class="sponsor-images">
        <a v-for="sponsor in sponsors" :key="sponsor.name" :href="sponsor.website" target="_blank" class="sponsor-link">
          <img v-if="sponsor.logoUrl" :src="sponsor.logoUrl" :alt="`${sponsor.name} Logo`" :style="getSponsorStyle(sponsor)" />
          <span v-else class="sponsor-name" :style="getSponsorStyle(sponsor)">{{ sponsor.name }}</span>
        </a>
        <p v-if="sponsors.length === 0">Be the first! Contact us to become a sponsor.</p>
      </div>
    </div>

    <!-- Staff -->
    <div class="staff-team" id="staff-team">
      <h3>Meet the Staff Team</h3>
      <div class="staff-grid">
        <div v-for="member in staff" :key="member.id" class="staff-member">
          {{ member.firstName }} {{ member.lastName }}
        </div>
      </div>
      <p v-if="staff.length === 0">Staff list coming soon!</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import sponsorService from "../services/sponsorService";
import { mapGetters, useStore } from "vuex";
import Activities from "@/views/ActivitiesPage.vue";

export default {
  name: "LandingPage",
  components: { Activities },
  computed: { ...mapGetters(["isLoggedIn"]) },
  setup() {
    const store = useStore();
    store.dispatch("getActiveEvent");

    const activeEvent = computed(() => {
      const event = store.getters.getEvent;
      return event && Object.keys(event).length ? event : null;
    });

    const sponsors = ref([]);
    const staff = ref([]);
    const CURRENT_EVENT_ID = 1;

    const formatDate = (date) => {
      if (!date) return "";
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };

    const getSponsorStyle = (sponsor) => ({
      width: sponsor.imageWidth + "px",
      height: sponsor.imageHeight + "px",
      objectFit: "contain",
    });

    const fetchSponsors = async (eventId) => {
      try {
        const tierResponse = await sponsorService.getSponsorTiers();
        const rawSponsorResponse = await sponsorService.getSponsors(eventId);
        const tierMap = tierResponse.reduce((map, tier) => {
          map[tier.id] = {
            tierName: tier.tier,
            width: tier.width,
            height: tier.height
          };
          return map;
        }, {});
        sponsors.value = rawSponsorResponse.map((s) => {
          const tierInfo = tierMap[s.sponsorTierId] || {};
          return {
            name: s.name,
            website: s.website,
            logoUrl: s.image || null, tier: tierInfo.tierName || "Unknown",
            imageWidth: tierInfo.width || 50, imageHeight: tierInfo.height || 50 };
        });
      } catch {
        sponsors.value = [];
      }
    };

    const revertUrlFromServer = (url) => {
      if (!url) return "";
      let original = url.trim();

      original = original.replace(/DOTC/g, ':');
      original = original.replace(/DOTS/g, '/');
      original = original.replace(/DOTQ/g, '?');
      original = original.replace(/DOTE/g, '=');
      original = original.replace(/DOTA/g, '&');

      return original;
    };

    onMounted(()=> {
      fetchSponsors();
    });
    return {
      sponsors, 
      eventYear,
      getSponsorStyle
    const fetchStaff = async () => {
      try {
        const fetchedData = await store.dispatch("fetchEventStaff", CURRENT_EVENT_ID);
        staff.value = Array.isArray(fetchedData) ? fetchedData : [];
      } catch {
        staff.value = [];
      }
    };

    watch(activeEvent, (newEvent) => { if (newEvent) fetchSponsors(newEvent.id); });
    onMounted(() => {
      if (activeEvent.value) fetchSponsors(activeEvent.value.id);
      fetchStaff();
    });

    return { sponsors, staff, activeEvent, formatDate, getSponsorStyle };
  },
};
</script>

<style scoped>
/* Video Header */
.intro-container {
  position: relative;
  width: 100%;
  min-height: 95vh;
  overflow: hidden;
}
#bgvideo {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.7;
}
.intro {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 300px 30px;
  color: white;
  text-align: center;
  background: rgba(0,0,0,0.2);
}
.intro h1 {
  font-size: 80px;
  margin-bottom: 40px;
}
.intro h2 {
  font-size: 30px;
  margin-bottom: 40px;
}
.event-date {
  font-size: 36px;
  margin-bottom: 20px;
}
.register-button {
  display: inline-block;
  background: white;
  color: black;
  padding: 15px 30px;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.2s;
}
.register-button:hover {
  transform: scale(1.05);
}

/* About */
.about {
  padding: 80px 20px;
  background: #ccffcc;
  color: #000;
  text-align: center;
}
.about h3 {
  font-size: 56px;
  margin-bottom: 30px;
}

/* Recap Videos */
.attend {
  padding: 80px 20px;
}
.green-box {
  background: #64965d;
  padding: 50px;
  border-radius: 10px;
  color: white;
  text-align: center;
}
.video-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  gap: 20px;
}
.video-text {
  font-size: 50px;
  font-weight: bold;
}
iframe {
  border-radius: 10px;
}

/* FAQ */
.faq {
  background: #ccffcc;
  padding: 80px 20px;
  text-align: center;
}
.faq h3 {
  font-size: 56px;
  margin-bottom: 40px;
}
.question h4 {
  margin-top: 20px;
}
.question p {
  margin-bottom: 20px;
}

/* Prizes */
.prizes {
  padding: 80px 20px;
  background: #ccffcc;
  text-align: center;
}
.prize-titles {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  font-size: 24px;
}

/* Sponsors */
.sponsors {
  padding: 80px 20px;
  background: #ccffcc;
  text-align: center;
}
.sponsor-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
.sponsor-link img {
  object-fit: contain;
}
.sponsor-name {
  font-weight: bold;
  color: #333;
}

/* Staff */
.staff-team {
  padding: 80px 20px;
  background: #f0fff0;
  text-align: center;
}
.staff-team h3 {
  font-size: 36px;
  margin-bottom: 40px;
}
.staff-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  justify-items: center;
  max-width: 900px; margin: 0 auto;
}
.staff-member {
  font-weight: 700;
  font-size: 24px;
  color: #3e6d3d; }
</style>
