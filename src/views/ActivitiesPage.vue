<template>
  <div v-if="!isLoading" class="container-top" id="schedule">
    <div v-if="event && Object.keys(event).length > 0" class="container-top">
      <div class="container-top">
        <header class="main-header">
          <div class="text-center py-4">
            <h1 class="mb-2">Activities</h1>
            <hr class="header-line" />
          </div>
        </header>
      </div>


      <div class="container-fluid">
        <div v-for="(activities, date) in groupedActivities" :key="date">
          <span id="day-tag" style="margin-left: 75px;">
            <b>{{ new Date(date).toLocaleDateString("en-US", { weekday: "long" }) }}
            {{ new Date(date).toLocaleDateString("en-US", { month: "long" }) }}
            {{ getOrdinalDay(date) }},
            {{ new Date(date).getFullYear() }}</b>
          </span>
          <table v-if="activities.length > 0" class="table table-bordered">
            <tbody style="background: #8d8d8d; width: 50%; ">
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
                  <th>
                    {{ new Date(activity.activityDate).toLocaleTimeString("en-US", {
                    timeZone: "America/New_York",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                  }) }}
                  </th>
                  <th>{{ activity.activityName }}</th>
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
          <div v-else class ="text">There are no activities currently set for this date. Please check back later!</div>
        </div>
        <div class ="text">* Schedule is subject to change.</div>
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
.table {
  width: 75%;
  margin-left: 100px;
}

.table th,
.table td {
  background-color: #8d8d8d;
  border-width: 3px;
  border-color: #231F20;
}

th, td {
  color: #008350 !important;
  font-weight: bold;
  font-size: 35px;
}

.table tr:hover th,
.table tr:hover td {
  background-color: #8d8d8d;
}

/* When hovered (both rows share same activity id) */
.table .hovered-row th,
.table .hovered-row td {
  background-color: #008350 !important; /* your hover color */
  color: #231F20 !important;
  transition: background-color 0.25s ease;
}

/* When hovered, make the card transparent so the hover color shows through */
.table .hovered-row .activity-description {
  background-color: #008350 !important;
  color: #231F20 !important;
  font-weight: bold;
}

/* Non-important dropdown card */
.activity-description {
  background-color: #8d8d8d !important;
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
  background: #8d8d8d;
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

.text {
  padding:15px 0;
  color: #008350;
  margin-left: 100px;
  font-size: 25px;
  font-weight:bold;
}

</style>