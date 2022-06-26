import { useQuery, useMutation } from "react-query";
import {
  fetchAllEvents,
  addEvent,
  fetchEventDetails,
  updateEvent,
  deleteEvent,
} from "../services/eventApi";

export const useEventsData = (onSuccess, onError) => {
  return useQuery("events-data", fetchAllEvents, {
    enabled: true,
    onSuccess,
    onError,
  });
};

/** add event */
export const useAddEvent = () =>
  useMutation(async (data) => {
    const res = await addEvent(data);
    return res;
  });

/** get event details */
export const useFetchEventDetails = (eventId) =>
  useQuery(
    ["events-data", eventId],
    async () => {
      const res = await fetchEventDetails(eventId);
      return res?.length > 0 ? res[0] : null;
    },
    {
       enabled: !!eventId,
    }
  );
/** update event */
export const useUpdateEvent = () =>
  useMutation(async ({ id, data }) => {
    const res = await updateEvent(id, data);
    return res;
  });

/** delete event */
export const useDeleteEvent = () =>
  useMutation(async ({ id }) => {
    const res = await deleteEvent(id);
    return res;
  });
