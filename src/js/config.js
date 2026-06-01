export const NOW = new Date();
export const DEFAULT_TIME = `${String(NOW.getHours()).padStart(2, "0")}:${String(NOW.getMinutes()).padStart(2, "0")}`;

// Handle daily goal
export const DAILY_GOAL = 5;

export const GOAL_STATES = {
  achieved: {
    min: 5,
    className: "state-high",
    motivation: "Awesome! Daily goal achieved!",
    fire: true,
  },
  medium: {
    min: 3,
    className: "state-medium",
    motivation: "Almost there! Keep the momentum going.",
    fire: false,
  },
  low: {
    min: 1,
    className: "state-low",
    motivation: "Good start! Keep going.",
    fire: false,
  },
  empty: {
    min: 0,
    className: "",
    motivation: "Let's get started today!",
    fire: false,
  },
};
