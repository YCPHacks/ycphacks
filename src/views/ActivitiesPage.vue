<template>
  <div v-if="!isLoading" class="container-top" id="schedule">
    <div v-if="event && Object.keys(event).length > 0" class="container-top" style="color: #ffffff">
      <div class="container-top">
        <header class="main-header">
          <div class="text-center py-4">
            <h1 class="mb-2">Activities</h1>
            <hr class="header-line" />
          </div>
        </header>
      </div>


      <div class="schedule-content">
        <div v-for="(activities, date) in groupedActivities" :key="date" style="margin-bottom: 50px;">
          <span id="day-tag" style="color: #008350; margin-left: 75px;">
            <b>{{ new Date(date).toLocaleDateString("en-US", { weekday: "long" }) }}
            {{ new Date(date).toLocaleDateString("en-US", { month: "long" }) }}
            {{ getOrdinalDay(date) }},
            {{ new Date(date).getFullYear() }}</b>
          </span>
          <table v-if="activities.length > 0" class="table table-bordered" style="margin-bottom:35px; background: #231F20">
            <tbody style="background: #231F20; width: 50%; ">
              <template v-for="activity in activities" :key="activity.id">
                <!-- Main row -->
                <tr
                    @click="toggleRow(activity.id)"
                    @mouseenter="hoveredRow = activity.id"
                    @mouseleave="hoveredRow = null"
                    :class="{
                      'important-row': isImportantActivity(activity.activityName),
                      'activity-row-group': isLoggedIn,
                      'hovered-row': hoveredRow === activity.id
                    }"
                >
                  <th scope="row" style="color: #008350; font-weight: bold; font-size: 35px;">
                    {{ new Date(activity.activityDate).toLocaleTimeString("en-US", {
                    timeZone: "America/New_York",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                  }) }}
                  </th>
                  <th style="color: #008350; font-weight: bold; font-size: 35px;">{{ activity.activityName }}</th>
                </tr>

                <!-- Description row -->
                <tr
                    v-if="isLoggedIn"
                    @mouseenter="hoveredRow = activity.id"
                    @mouseleave="hoveredRow = null"
                    :class="{
                      'important-row': isImportantActivity(activity.activityName),
                      'hovered-row': hoveredRow === activity.id
                    }"
                >
                  <td colspan="2" class="p-0">
                    <b-collapse :visible="expandedRows.includes(activity.id)">
                      <b-card body-class="p-3 mt-2" class="activity-description">
                        {{ activity.activityDescription }}
                      </b-card>
                    </b-collapse>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <div v-else style="padding:15px 0; color: #008350; margin-left: 100px; font-size: 25px; font-weight:bold;">There are no activities currently set for this date. Please check back later!</div>
        </div>
        <div class ="text-center py-4" style="padding:15px 0; color:#008350; font-size: 30px">* Schedule is subject to change.</div>
      </div>
    </div>
    <div v-else class="no-event-container">
      <div class="no-event-content">
        <div class="header" style="padding-bottom: 20px;">
          <div class="circle" style="font-size:27px; height:75px;">
            <p>Schedule</p>
          </div>
        </div>
        <p class="no-event-message">
          The schedule is not being displayed at this time.<br />
          Please check back later!
        </p>
      </div>
    </div>
  </div>
  <div v-else class="loading-overlay">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store/store.js";

export default {
  name: "ActivityPage",
  components: {},
  computed: {
    ...mapGetters(['isLoggedIn', 'getEvent']),
    event() {
      return this.getEvent;
    },
    groupedActivities() {
      return this.groupActivitiesByDay(store.state.activities);
    }
  },
  data() {
    return {
      isLoading: false,
      hoveredRow: 0,
      expandedRows: []
    }
  },
  methods: {
    async fetchActivities() {
      this.isLoading = true

      await store.dispatch('getActiveEvent');
      await store.dispatch('getAllActivities', this.event.id);

      this.isLoading = false;
    },
    // Takes in an array of activities and separates them out into an object, where each entry is a date which points
    // to a list of all the activities happening on that date
    groupActivitiesByDay(activities) {
      const dateRange = this.getDateRangeOfEvent();

      for (const activity of activities) {
        const dateKey = new Date(activity.activityDate);
        // Need to match the same string form you’ll use in `dateRange`
        const key = dateKey.toLocaleDateString("en-US", { timeZone: "America/New_York" });
        if (dateRange[key]) dateRange[key].push(activity);
      }

      // Sort each day by time (i.e., earliest to latest)
      for (const key in dateRange) {
        dateRange[key].sort((a, b) => {
          const timeA = new Date(a.activityDate).getTime();
          const timeB = new Date(b.activityDate).getTime();
          return timeA - timeB;
        });
      }

      return dateRange
    },
    // Returns a list of all dates between the event start and end dates, inclusive
    getDateRangeOfEvent() {
      const start = new Date(this.event.startDate);
      const end = new Date(this.event.endDate);
      const dateRange = {};
      const current = new Date(start);

      while (current <= end) {
        const key = current.toLocaleDateString("en-US", {
          timeZone: "America/New_York"
        });

        dateRange[key] = [];
        current.setDate(current.getDate() + 1);
      }

      return dateRange;
    },
    // Takes in a date and returns the day with its ordinal suffix (like “st”, “nd”, “rd”, “th”)
    getOrdinalDay(date) {
      const d = new Date(date).getDate();
      const suffix =
          d % 10 === 1 && d !== 11
              ? "st"
              : d % 10 === 2 && d !== 12
                  ? "nd"
                  : d % 10 === 3 && d !== 13
                      ? "rd"
                      : "th";
      return `${d}${suffix}`;
    },
    isImportantActivity(activityName) {
      const normalized = activityName.toLowerCase();
      const importantKeywords = [
        "hacking start",
        "hacking begin",
        "hacking end",
        "hacking stop"
      ];

      // match any keyword appearing in the string
      return importantKeywords.some(keyword => normalized.includes(keyword));
    },
    toggleRow(id) {
      console.log(id , this.expandedRows);
      if (this.expandedRows.includes(id)) {
        this.expandedRows.splice(this.expandedRows.indexOf(id), 1);
      } else {
        this.expandedRows.push(id)
      }
    }
  },
  async mounted() {
    await this.fetchActivities();
  }
};
</script>

<style scoped>

.bounce {
    -webkit-animation-name: bounce;
    animation-name: bounce;
    -webkit-transform-origin: center bottom;
    -ms-transform-origin: center bottom;
    transform-origin: center bottom;
}
.animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}
a {
    background-color: transparent;
}
.landing-page {
  text-align: center;
  background-color: #ccffcc;
  position: relative; /* Ensure this is the context for absolute positioning */
  overflow: hidden;
}

.intro {
  position: relative;
  z-index: 1;
  color:white;
  background-color: rgba(0, 0, 0, 0.01);
  /* margin-top: 10px; */
  padding:20px;
  bottom: 850px;
  display: block;
  align-items: center;
  justify-content: center;
  text-align: center; /* Center content */
}

.intro h2 {
  font-size: 30px;
}


.container {
    position: relative;
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 38px 20px;
    box-sizing: border-box;
}

@media (min-width: 550px) {
    .container {
        width: 80%;
    }
}
@media (min-width: 400px) {
    .container {
        width: 85%;
        padding: 0;
    }
}
.header {
    text-align: center;
}

pre, blockquote, dl, figure, table, p, ul, ol, form {
    margin-bottom: 2.5rem;
}
.intro #fountain {
    display: block;
    position: relative;
    margin: auto;
    max-height: 100px;
    margin-bottom: -100px;
}
img{
  border:0;
}

 .attend {
  position: relative;
  text-align: center;
  padding-bottom: 100px;
  padding-top: 100px;
  background-color: transparent; /* Make the background transparent */
}

.green-box {
  background-color: #64965d; /* Green color */
  padding: 50px; /* Padding to add space inside the green box */
  border-radius: 10px; /* Rounded corners for the green box */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional shadow for visual effect */
}

.container1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px; /* Add margin between the videos */
  position: relative;
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 38px 20px;
    box-sizing: border-box;
}

#fountain2 {
  margin-bottom: 0;
}

iframe {
  border-radius: 10px; /* Rounded corners for videos */
}

h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 2rem;
    font-weight: 300;
}

#day-tag {
    font-size: 70px;
}


.table {
  width: 75%;
  margin-left: 100px;

}

/* Default (i.e., non-important) rows */
.table th,
.table td {
  background-color: #231F20; /* dark background */
  border-width: 3px;
  border-color: #008350;
}

.table tr:hover th,
.table tr:hover td {
  background-color: #231F20;
}

/* Important rows (both main and description) */
.table .important-row th,
.table .important-row td {
  background-color: #fff !important;
  color: #000 !important;
}

/* Make card match the row color */
.table .important-row .activity-description {
  background-color: #fff !important;
  color: #000 !important;
  border: none;
}

/* When hovered (both rows share same activity id) */
.table .hovered-row th,
.table .hovered-row td {
  background-color: #008350 !important; /* your hover color */
  color: #231F20 !important;
  transition: background-color 0.25s ease;
}

/* Important-row hover (white version) */
.table .important-row.hovered-row th,
.table .important-row.hovered-row td {
  background-color: #e6e6e6 !important;
  color: #000 !important;
}

/* When hovered, make the card transparent so the hover color shows through */
.table .hovered-row .activity-description {
  background-color: #008350 !important;
  color: #231F20 !important;
  font-weight: bold;
}

/* Non-important dropdown card */
.activity-description {
  background-color: #231F20 !important;
  color: #008350 !important;
  border: none;
  font-weight: bold;
  font-size: 30px;
}

.activity-row-group:hover {
  cursor: pointer;
  background-color: #231F20;
}

.activity-row-group {
  background: #231F20;
  color: #008350;
  font-weight: bold;
}

.no-event-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh; /* centers vertically */
  text-align: center;
  color: #ffffff;
}

.no-event-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.no-event-message {
  font-size: 1.1rem;
  color: #fff;
  max-width: 400px;
  line-height: 1.5;
}

</style>