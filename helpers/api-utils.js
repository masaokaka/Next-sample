export const getAllEvents = async () => {
  const response = await fetch(
    "https://my-vue-project-2b3f1-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (eventId) => {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === eventId);
};

export const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};

export const emailRegistration = (enteredEmail) => {
  return fetch("/api/newsletter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: enteredEmail }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.json().messgae || "something went wrong");
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const postComment = (data, eventId) => {
  return fetch(`/api/comments/${eventId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.json().messgae || "something went wrong");
      }
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
