import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      blocksCount: 10,
      blocksSeed: 3,
      startTime: 0,
      endTime: 0,
      activeCamera: null,
    };
  })
);
