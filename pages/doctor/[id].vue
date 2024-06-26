<template>
  <UContainer>
    <UPage>
      <UPageHeader>
        <template #headline>Agendar Cita</template>
        <template #title
          >Dr.{{ doctor.firstName }} {{ doctor.lastName }}
        </template>
        <template #description>
          {{ doctor.specialty }}
        </template>
      </UPageHeader>

      <div class="space-y-10 mt-10">
        <UPageCard
          :ui="{ wrapper: 'bg-emerald-50' }"
          :key="date"
          :variant="selectedDate.selectedDateStr === date ? 'outline' : 'solid'"
          v-for="date in upcomingAvailableDates"
        >
          <template #header>
            <div class="text-xl font-bold capitalize">
              {{
                format(date, "PPPP", {
                  locale: es,
                })
              }}
            </div>
          </template>
          <template #description>
            <div class="w-fit flex items-center space-x-1 text-lg">
              <div>
                {{
                  convertTo12Hours(
                    getTimeSlotsForDate(date, doctor.schedule).startTime,
                  )
                }}
              </div>
              <span> - </span>
              <div>
                {{
                  convertTo12Hours(
                    getTimeSlotsForDate(date, doctor.schedule).endTime,
                  )
                }}
              </div>
            </div>
          </template>
          <div class="grid-cols-2 lg:grid-cols-4 grid gap-4 mt-3">
            <UButton
              @click="
                () => {
                  selectedDate = {
                    selectedDateStr: date,
                  };
                  selectedTime = slot;
                }
              "
              :variant="
                selectedTime === slot && selectedDate.selectedDateStr == date
                  ? 'soft'
                  : 'solid'
              "
              class="text-center flex justify-center items-center w-[5.8rem]"
              v-for="slot in generateDateTimeSlots(
                date,
                getTimeSlotsForDate(date, doctor.schedule).startTime,
                getTimeSlotsForDate(date, doctor.schedule).endTime,
                bookedApts,
              )"
            >
              <div>{{ convertTo12Hours(slot) }}</div>
            </UButton>
          </div>
          <template #footer>
            <UButton
              :disabled="selectedDate.selectedDateStr !== date"
              @click="handleClick"
              class="text-sm"
              :variant="
                selectedDate.selectedDateStr == date ? 'solid' : 'outline'
              "
              >Seleccionar esta Fecha
            </UButton>
          </template>
        </UPageCard>
      </div>
      <UModal v-model="showConfirmation">
        <UCard
          :ui="{
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          <template #header> Cita Confirmada</template>
          <div class="text-center">
            {{ formatDateTime(confirmation.dateTime) }}
          </div>
          <div class="text-center">
            Dr.{{ doctor.firstName }} {{ doctor.lastName }}
          </div>
          <div class="text-center text-gray-400">{{ doctor.specialty }}</div>

          <template #footer>
            <NuxtLink to="/myapts">
              <UButton block>Regresar a mis citas</UButton>
            </NuxtLink>
          </template>
        </UCard>
      </UModal>
    </UPage>
  </UContainer>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";
import { formatInTimeZone, fromZonedTime, toZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const route = useRoute();
const authStore = useAuthStore();
const user = JSON.parse(JSON.stringify(authStore.getUser));
const selectedDate = ref("");
const selectedTime = ref("");
const isLoading = ref(false);
const showConfirmation = ref(false);
const confirmation = ref("");

async function getDoctor() {
  const url = `https://postgresapp-e83cc2ceb04b.herokuapp.com/api/getDoctor?id=${route.params.id}`;
  try {
    const res = await $fetch(url, {
      method: "GET",
      headers: {
        "x-access-token": user.token,
      },
    });
    if (res) {
      // console.log(res);
      return JSON.parse(JSON.stringify(res));
    }
  } catch (e) {
    console.error(e);
  }
}

const doctor = await getDoctor();

function generateNext14DaysInSpanish(schedule) {
  let dates = [];
  let today = new Date();

  for (let i = 0; i < 14; i++) {
    let futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + i);

    let dayOfWeek = futureDate.toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: "America/Caracas",
    });
    // console.log(dayOfWeek);

    // Check if the day is active in the doctor's schedule
    if (schedule[dayOfWeek] && schedule[dayOfWeek].active) {
      dates.push(futureDate);
    }
  }
  // console.log(dates);
  return dates;
}

// Using the function
let upcomingAvailableDates = generateNext14DaysInSpanish(doctor.schedule);
// upcomingAvailableDates.forEach((date) => {
//   console.log(date);
// });

function getTimeSlotsForDate(dateString, schedule) {
  // Extract the day of the week from the string
  // let dayOfWeek = dateString.split(" ")[0].toLowerCase();
  // console.log(dateString);

  let dayOfWeek = dateString.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "America/Caracas",
  });

  // Check if the day is in the schedule
  if (schedule[dayOfWeek] && schedule[dayOfWeek].active) {
    // console.log(schedule[dayOfWeek].times);
    return schedule[dayOfWeek].times;
  } else {
    return null;
  }
}

function generateDateTimeSlots(dateString, startTime, endTime, appointments) {
  let slots = [];

  // Extract the date part
  // let datePart = dateString.split(" ").slice(1).join(" ");
  let datePart = dateString.toLocaleDateString("en-US", {});

  // Parse the start and end times with the date
  let startDateTime = new Date(`${datePart} ${startTime}`);
  let endDateTime = new Date(`${datePart} ${endTime}`);

  if (isNaN(startDateTime) || isNaN(endDateTime)) {
    return "Invalid date";
  }

  while (startDateTime < endDateTime) {
    let timeString =
      startDateTime.getHours().toString().padStart(2, "0") +
      ":" +
      startDateTime.getMinutes().toString().padStart(2, "0");

    let slotDateTime = new Date(`${datePart} ${timeString}`);

    // Check if the time slot is not in any of the appointments
    let isSlotAvailable = !appointments.some((appointment) => {
      let appointmentDate = new Date(appointment.dateTime);
      appointmentDate.toLocaleString("en-US", {
        timeZone: "America/Caracas",
        hour12: true,
      });
      return slotDateTime.getTime() === appointmentDate.getTime();
    });

    if (isSlotAvailable) {
      slots.push(timeString);
    }

    startDateTime.setMinutes(startDateTime.getMinutes() + 30); // Assuming 30-minute intervals
  }
  return slots;
}

async function handleClick() {
  isLoading.value = true;
  await new Promise((r) => setTimeout(r, 1000));
  console.log("DATE");
  // console.log(selectedDate.value);
  // let datePart = selectedDate.value.selectedDateStr.split(" ")[1];
  let datePart = selectedDate.value.selectedDateStr.toLocaleDateString("en-US");

  // Split the datePart into day, month, and year
  let [day, month, year] = datePart.split("/");

  // Format the date in "YYYY-MM-DD" format
  let formattedDate = `${year}-${day.padStart(2, "0")}-${month.padStart(2, "0")}`;

  // Combine date and time
  let dateTime = `${formattedDate}T${selectedTime.value}:00`; // Adding ":00" for seconds
  // console.log(dateTime);

  try {
    let localizedDate = dateTime + "-04:00";
    // let utcDateString = localizedDate.toUTCString();
    // let utcDate = new Date(dateTime);
    // let caracasTime = utcDate.toLocaleString("en-US", {
    //   timeZone: "America/Caracas",
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   hour12: false,
    // });
    // console.log(localizedDate);
    // console.log(caracasTime);
    // console.log(utcDate);
    console.log(user);
    const res = await $fetch(
      "https://postgresapp-e83cc2ceb04b.herokuapp.com/api/apts/create",
      {
        method: "POST",
        headers: {
          "x-access-token": user.token,
        },
        body: {
          userId: user.id,
          doctorId: doctor.id,
          dateTime: localizedDate,
        },
      },
    );
    if (res) {
      // console.log(res);
      confirmation.value = res;
      isLoading.value = false;
      showConfirmation.value = true;
    }
  } catch (e) {
    console.error(e.message);
  }
}

async function getApts() {
  try {
    // console.log(doctor.id);
    const res = await $fetch(
      "https://postgresapp-e83cc2ceb04b.herokuapp.com/api/apts/getDoctorApts",
      {
        method: "get",
        headers: {
          "x-access-token": user.token,
        },
        params: {
          doctorId: doctor.id,
        },
      },
    );

    if (res) {
      // Convert the dateTime of each appointment to Chicago time
      const chicagoTimeZone = "America/Chicago";
      res?.forEach((appointment) => {
        let chicagoTime = new Date(appointment.dateTime).toLocaleString(
          "en-US",
          { timeZone: chicagoTimeZone },
        );
        appointment.dateTime = chicagoTime;
      });

      // console.log(res);
      return res;
    }
  } catch (e) {
    console.error(e.message);
  }
}

const bookedApts = await getApts();

//for Confirmation modal only
function formatDateTime(dateTimeString) {
  // Create a Date object from the dateTimeString
  let date = new Date(dateTimeString);

  // Options for toLocaleString to get day of the week, date, and time in 12-hour format
  let options = {
    weekday: "long", // day of the week
    day: "2-digit", // day in two digits
    month: "2-digit", // month in two digits
    year: "2-digit", // two-digit year
    hour: "numeric", // hour
    minute: "numeric", // minutes
    hour12: true, // 12-hour format
  };

  // Convert to Spanish locale
  // console.log("Function FormatDateTime");
  // console.log(date.toLocaleString("es-ES", options));
  return date.toLocaleString("es-ES", options);
}

function convertTo12Hours(timeString) {
  // Split the time string into hours and minutes
  let [hours, minutes] = timeString.split(":").map(Number);

  // Determine AM or PM
  let ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12;

  // Return the formatted time string
  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}
</script>

<style scoped></style>
