import { Component, triggerEventValues } from "../_util/simply";
import { PromptsProps } from "./props";

Component(PromptsProps, {
  onItemTap: function (e) {
    const { item, index } = e.currentTarget.dataset;
    triggerEventValues(this, "itemtap", [item, index], e);
  },
});
