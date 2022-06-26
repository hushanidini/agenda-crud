import axios from "axios";
import { toast } from "react-toastify";

/**
 * fetch  all events
 * @returns
 */
export const fetchAllEvents = async () => {
  try {
    const response = await axios.get("http://localhost:50000/events");
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    if (
      e.message === "Request failed with status code 401" ||
      e.message.includes("401")
    ) {
      toast.error(e.message);
    }
    throw e;
  }
};

/** add event */
export const addEvent = async (data) => {
  try {
    let response = await axios.post("http://localhost:50000/event", data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    if (
      e.message === "Request failed with status code 401" ||
      e.message.includes("401")
    ) {
      toast.error(e.message);
    }
    throw e;
  }
};

/**
 * fetch event detials
 * @param {*} id
 * @returns
 */
export const fetchEventDetails = async (id) => {
  try {
    const response = await axios.get(`http://localhost:50000/event/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    if (
      e.message === "Request failed with status code 401" ||
      e.message.includes("401")
    ) {
      toast.error(e.message);
    }
    throw e;
  }
};

/** update event */
export const updateEvent = async (id, data) => {
  try {
    let response = await axios.put(`http://localhost:50000/event/${id}`, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    if (
      e.message === "Request failed with status code 401" ||
      e.message.includes("401")
    ) {
      toast.error(e.message);
    }
    throw e;
  }
};

/**
 * delete event
 * @param {*} id
 * @returns
 */
export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:50000/event/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    if (
      e.message === "Request failed with status code 401" ||
      e.message.includes("401")
    ) {
      toast.error(e.message);
    }
    throw e;
  }
};
